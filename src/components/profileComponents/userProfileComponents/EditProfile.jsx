import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  useGetCurrentUserQuery,
  useUpdateUserProfileMutation,
  useChangePasswordMutation
} from "../../../features/api/userApi";
import "bootstrap/dist/css/bootstrap.min.css";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InfoModal from "../../Modal";
import "../../../styles/profileHeader.css";
import "../../../styles/dashboardNav.css";
import "../../../styles/app.css";
import ReactiveButton from "reactive-button";
import ProfileHeader from "../ProfileHeader";
import UserNav from "../../navigations/UserNav";

export default function EditProfile() {
  const { userId } = useParams();
  const {
    data: user,
    isLoading,
    error,
  } = useGetCurrentUserQuery(userId);
  console.log("USER FROM API:", user)

  const [updateUserProfile] = useUpdateUserProfileMutation();
  const [changePassword] = useChangePasswordMutation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
  });

  const [modalShow, setModalShow] = useState(false);
  const [modalHeading, setModalHeading] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [editMode, setEditMode] = useState(true);
  const [showPwdForm, setShowPwdForm] = useState(false);
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [pwdError, setPwdError] = useState("");

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        company: user.company?.name || "",
        email: user.email || "",
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(formData).unwrap();
      setModalHeading("Profile Updated");
      setModalBody("Your profile was updated successfully");
      setModalShow(true);
      setEditMode(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePasswordChange = async () => {
    if (!currentPwd || !newPwd || newPwd !== confirmPwd) {
      setPwdError(
        !currentPwd
          ? "Enter your current password"
          : newPwd !== confirmPwd
          ? "New passwords must match"
          : "Enter a new password"
      );
      return;
    }
    try {
      await changePassword({
        currentPassword: currentPwd,
        newPassword: newPwd,
        confirmPassword: confirmPwd,
      }).unwrap();
      setShowPwdForm(false);
      setCurrentPwd("");
      setNewPwd("");
      setConfirmPwd("");
      setPwdError("");
      setEditMode(false);
      setModalHeading("Password Changed");
      setModalBody("Your password was changed successfully.");
      setModalShow(true);
    } catch {
      setPwdError("Password change failed");
    }
  };

  const handleCancel = () => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      company: user.company,
      email: user.email,
    });
    setEditMode(false);
    setShowPwdForm(false);
    setPwdError("");
  };
  const handlePasswordCancel = () => {
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      company: user.company,
      email: user.email,
    });
    setEditMode(true);
    setShowPwdForm(false);
    setPwdError("");
  };

  if (isLoading) return <p>Loading user data...</p>;
  if (error) return <p>Error loading user. Please try again later.</p>;

  return (
    <>
      <UserNav />
      <ProfileHeader />
      <div className="dark-theme">
        <div
          className="d-flex"
        >
          <div
            className="bg-gray rounded shadow edit-profile"
          >
            <div className="d-flex justify-content-between mb-4">
              <h2 style={{ fontSize: "14px", marginTop: "7vh" }}>
                EDIT PROFILE
              </h2>

            </div>

            <Form onSubmit={handleSubmit}>
              {/* Profile block */}
              {!showPwdForm && (
                <>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="firstName">
                      <Form.Label
                        style={{ fontSize: "12px", paddingLeft: "3px" }}
                      >
                        FIRST NAME
                      </Form.Label>
                      <Form.Control
                        value={formData.firstName}
                        onChange={(e) =>
                          setFormData((f) => ({
                            ...f,
                            firstName: e.target.value,
                          }))
                        }
                      />
                    </Form.Group>
                    <Form.Group as={Col} controlId="lastName">
                      <Form.Label
                        style={{ fontSize: "12px", paddingLeft: "3px" }}
                      >
                        LAST NAME
                      </Form.Label>
                      <Form.Control
                        value={formData.lastName}
                        onChange={(e) =>
                          setFormData((f) => ({
                            ...f,
                            lastName: e.target.value,
                          }))
                        }
                      />
                    </Form.Group>
                  </Row>

                  <Row>
                    <Form.Group as={Col} controlId="company">
                      <Form.Label
                        style={{ fontSize: "12px", paddingLeft: "3px" }}
                      >
                        COMPANY
                      </Form.Label>

                      <Form.Control
                        value={formData.company}
                        onChange={(e) =>
                          setFormData((f) => ({
                            ...f,
                            company: e.target.value,
                          }))
                        }
                      />
                    </Form.Group>
                  </Row>

                  <Row>
                    <Form.Group className="mb-3" controlId="email">
                      <Form.Label
                        style={{ fontSize: "12px", paddingLeft: "3px" }}
                      >
                        EMAIL
                      </Form.Label>
                      <Form.Control
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData((f) => ({ ...f, email: e.target.value }))
                        }
                      />
                    </Form.Group>
                  </Row>
        
                    <Row className="align-items-end mb-3">
                      <Col>
                        <Form.Group controlId="password">
                          <Form.Label
                            style={{ fontSize: "12px", paddingLeft: "3px" }}
                          >
                            PASSWORD
                          </Form.Label>
                          <Form.Control
                            type="password"
                            placeholder="********"
                          />
                        </Form.Group>
                      </Col>
                      {!showPwdForm && (
                        <Col xs="auto">
                          <ReactiveButton
                            onClick={() => setShowPwdForm(true)}
                            rounded
                            idleText="CHANGE PASSWORD"
                            loadingText="Loading"
                            variant="secondary"
                            className="button3"
                            style={{
                              marginRight: "5px",
                              width: "150px",
                              fontSize: "12px",
                              backgroundColor: "#558e89",
                            }}
                          />
                        </Col>
                      )}
                    </Row>

                    <div className="d-flex justify-content-end">
                      <ReactiveButton
                        type="submit"
                        rounded
                        idleText="SAVE CHANGES"
                        loadingText="Loading"
                        variant="secondary"
                        className="button3"
                        style={{
                          marginRight: "18px",
                          width: "150px",
                          fontSize: "12px",
                          backgroundColor: "#558e89",
                        }}
                      />
                      <ReactiveButton
                        onClick={handleCancel}
                        rounded
                        idleText="CANCEL CHANGES"
                        loadingText="Loading"
                        variant="secondary"
                        className="button3"
                        style={{
                          width: "150px",
                          fontSize: "12px",
                          marginRight: "234px",
                          backgroundColor: "gray",
                        }}
                      />
                    </div>
                </>
              )}

              {/* Password block */}
              {showPwdForm && (
                <div className="border rounded p-3 mb-3">
                  <Form.Group className="mb-2" controlId="currentPwd">
                    <Form.Label
                      style={{ fontSize: "12px", paddingLeft: "3px" }}
                    >
                      CURRENT PASSWORD
                    </Form.Label>
                    <Form.Control
                      type="password"
                      value={currentPwd}
                      onChange={(e) => setCurrentPwd(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2" controlId="newPwd">
                    <Form.Label
                      style={{ fontSize: "12px", paddingLeft: "3px" }}
                    >
                      NEW PASSWORD
                    </Form.Label>
                    <Form.Control
                      type="password"
                      value={newPwd}
                      onChange={(e) => setNewPwd(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="mb-2" controlId="confirmPwd">
                    <Form.Label
                      style={{ fontSize: "12px", paddingLeft: "3px" }}
                    >
                      CONFIRM NEW PASSWORD
                    </Form.Label>
                    <Form.Control
                      type="password"
                      value={confirmPwd}
                      onChange={(e) => setConfirmPwd(e.target.value)}
                    />
                  </Form.Group>

                  {pwdError && <p className="text-danger small">{pwdError}</p>}

                  <div className="d-flex gap-2 mt-2">
                    <ReactiveButton
                      onClick={handlePasswordChange}
                      rounded
                      idleText="SAVE"
                      loadingText="Loading"
                      variant="secondary"
                      className="button3"
                      style={{
                        marginRight: "5px",
                        width: "90px",
                        fontSize: "12px",
                        marginTop: "8px",
                        backgroundColor: "#558e89",
                      }}
                    />
                    <ReactiveButton
                      onClick={handlePasswordCancel}
                      rounded
                      idleText="CANCEL"
                      loadingText="Loading"
                      variant="secondary"
                      className="button3"
                      style={{
                        width: "90px",
                        fontSize: "12px",
                        marginTop: "8px",
                        backgroundColor: "gray",
                      }}
                    />
                  </div>
                </div>
              )}
            </Form>
          </div>
        </div>

        <InfoModal
          show={modalShow}
          hide={() => setModalShow(false)}
          heading={modalHeading}
          body={modalBody}
        />
      </div>
    </>
  );
}
