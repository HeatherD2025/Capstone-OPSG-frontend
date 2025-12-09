import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

import { useGetUserByIdQuery } from "../../../features/api/adminApi";

import { Button } from "bootstrap";
import { Col, Row, Form, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import InfoModal from "../../../utils/Modal";
import AdminHeader from "./AdminHeader";

export default function EditUserProfile() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { data: user, error, isLoading, refetch } = useGetUserByIdQuery(userId);
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const [changePassword] = useChangePasswordMutation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [modalShow, setModalShow] = useState(false);
  const [modalHeading, setModalHeading] = useState("");
  const [modalBody, setModalBody] = useState("");
  const [editMode, setEditMode] = useState(false);
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
        email: user.email || "",
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile({ id: userId, ...formData }).unwrap();
      setModalHeading("Profile Updated");
      setModalBody("User profile was updated succesfully");
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
        id: userId,
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
      email: user.email,
    });
    setEditMode(false);
    setShowPwdForm(false);
    setPwdError("");
  };

  if (isLoading) return <Spinner animation="border" role="status" />;
  if (error) return <p>Error loading user. Please try again later.</p>;

  return (
    <>
      <AdminHeader />
      <div
        style={{ paddingTop: "60px" }}
        className="d-flex justify-content-center align-items-center"
      >
        <div
          className="bg-white rounded shadow p-4"
          style={{ width: "100%", maxWidth: "600px" }}
        >
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>{editMode ? "Edit Profile" : "Profile"}</h2>
            {!editMode && (
              <Button
                variant="outline-primary"
                onClick={() => setEditMode(true)}
              >
                Edit Profile
              </Button>
            )}
          </div>

          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  readOnly={!editMode}
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData((f) => ({ ...f, firstName: e.target.value }))
                  }
                />
              </Form.Group>
              <Form.Group as={Col} controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  readOnly={!editMode}
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData((f) => ({ ...f, lastName: e.target.value }))
                  }
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                readOnly={!editMode}
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, email: e.target.value }))
                }
              />
            </Form.Group>
            {editMode && (
              <>
                <Row className="align-items-end mb-3">
                  <Form.Group as={Col} controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="********"
                      readOnly
                    />
                  </Form.Group>
                  {!showPwdForm && (
                    <Col xs="auto">
                      <Button
                        variant="outline-secondary"
                        onClick={() => setShowPwdForm(true)}
                      >
                        Change Password
                      </Button>
                    </Col>
                  )}
                </Row>

                {showPwdForm && (
                  <div className="border rounded p-3 mb-3">
                    <Form.Group className="mb-2" controlId="currentPwd">
                      <Form.Label>Current Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={currentPwd}
                        onChange={(e) => setCurrentPwd(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="newPwd">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={newPwd}
                        onChange={(e) => setNewPwd(e.target.value)}
                      />
                    </Form.Group>
                    <Form.Group className="mb-2" controlId="confirmPwd">
                      <Form.Label>Confirm New Password</Form.Label>
                      <Form.Control
                        type="password"
                        value={confirmPwd}
                        onChange={(e) => setConfirmPwd(e.target.value)}
                      />
                    </Form.Group>

                    {pwdError && (
                      <p className="text-danger small">{pwdError}</p>
                    )}

                    <div className="d-flex gap-2 mt-2">
                      <Button variant="success" onClick={handlePasswordChange}>
                        Save Password
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => {
                          setShowPwdForm(false);
                          setPwdError("");
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )}
            <div className="d-flex justify-content-end">
              {editMode && (
                <>
                  <Button
                    variant="secondary"
                    onClick={handleCancel}
                    className="me-2"
                  >
                    Cancel
                  </Button>

                  <Button variant="primary" type="submit">
                    Save Profile
                  </Button>
                </>
              )}
            </div>
          </Form>
        </div>
      </div>

      <InfoModal
        show={modalShow}
        hide={() => setModalShow(false)}
        heading={modalHeading}
        body={modalBody}
      />
    </>
  );
}
