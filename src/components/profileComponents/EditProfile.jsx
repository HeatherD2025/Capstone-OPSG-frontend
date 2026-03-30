import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { useUpdateUserProfileMutation } from "../../features/api/userApi";
import { useGetCurrentUserQuery } from "../../features/api/userApi";
import { useDeleteUserByIdMutation } from "../../features/api/adminApi";
import { useGetUserByIdQuery } from "../../features/api/adminApi";

import { Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import InfoModal from "../Modal";
import ProfileHeader from "./ProfileHeader";
import DashboardNav from "./DashboardNav";
import ConfirmationModal from "../ConfirmationModal";
import "../../styles/app.css";
import ProfileFormFields from "./ProfileFormFields";
import PasswordChangeForm from "./PasswordChangeForm";

export default function EditProfile() {
  const { isAdmin } = useSelector((state) => state.auth);
  const { userId } = useParams(); // extract id from url
  const navigate = useNavigate();

  const { data: adminUser, isLoading: adminLoading } = useGetUserByIdQuery(
    userId,
    { skip: !userId },
  );
  const {
    data: selfUser,
    error,
    isLoading: selfLoading,
  } = useGetCurrentUserQuery(undefined, { skip: !!userId });

  const user = userId ? adminUser : selfUser;
  const isLoading = userId ? adminLoading : selfLoading;

  // set up state and mutations
  const [confModalShow, setConfModalShow] = useState(false);
  const [infoModalShow, setInfoModalShow] = useState(false);
  const [modalHeading, setModalHeading] = useState("");
  const [modalBody, setModalBody] = useState("");

  const [deleteUser] = useDeleteUserByIdMutation();
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const [showPwdForm, setShowPwdForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: {
      name: "",
      streetAddress: "",
      phoneNumber: "",
      city: "",
      state: "",
      zip: "",
    },
  });

  // sync data
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        company: {
          name: user.company?.name || "",
          streetAddress: user.company?.streetAddress || "",
          phoneNumber: user.company?.phoneNumber || "",
          city: user.company?.city || "",
          state: user.company?.state || "",
          zip: user.company?.zip || "",
        },
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile({ id: userId, ...formData }).unwrap();
      setModalHeading("Profile Updated");
      setModalBody("User profile was updated succesfully");
      setInfoModalShow(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        company: {
          name: user.company?.name || "",
          streetAddress: user.company?.streetAddress || "",
          phoneNumber: user.company?.phoneNumber || "",
          city: user.company?.city || "",
          state: user.company?.state || "",
          zip: user.company?.zip || "",
        },
      });
      setShowPwdForm(false);
    }
  };

  const handleOnSuccess = () => {
    setModalHeading("Password Changed");
    setModalBody("Your password was changed successfully.");
    setInfoModalShow(true);
  };

  const handleDeleteUser = async (e) => {
    try {
      await deleteUser(userId).unwrap();
      setModalHeading("Account Deleted");
      setModalBody("This account was successfully deleted.");
      setInfoModalShow(true);
      setConfModalShow(false);

      setTimeout(() => {
        navigate("/admin/search");
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <Spinner animation="border" role="status" />;
  if (error) return <p>Error loading user. Please try again later.</p>;

  return (
    <>
     <DashboardNav /> 
      <ProfileHeader />

      <div className="dark-theme">
        <div className="d-flex">
          {showPwdForm ? (
            <PasswordChangeForm
              userId={userId}
              setShowPwdForm={setShowPwdForm}
              handleOnSuccess={handleOnSuccess}
            />
          ) : (
            <ProfileFormFields
              formData={formData}
              setFormData={setFormData}
              isAdmin={isAdmin && !!userId}
              onSubmit={handleSubmit}
              onCancel={handleCancel}
              onDelete={() => setConfModalShow(true)}
              setShowPwdForm={() => setShowPwdForm(true)}
            />
          )}
        </div>
      </div>

      <ConfirmationModal
        show={confModalShow}
        heading="Confirm Deletion"
        body="Are you sure you want to delete this user permanently? This action cannot be undone."
        onConfirm={handleDeleteUser}
        onCancel={() => setConfModalShow(false)}
      />

      <InfoModal
        show={infoModalShow}
        hide={() => setInfoModalShow(false)}
        heading={modalHeading}
        body={modalBody}
      />
    </>
  );
}
