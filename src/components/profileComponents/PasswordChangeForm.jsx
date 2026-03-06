import { useState } from "react";
import { useChangePasswordMutation } from "../../features/api/userApi";
import ReactiveButton from "reactive-button";
import { Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles/app.css";

export default function PasswordChangeForm({
  userId,
  setShowPwdForm,
  handleOnSuccess,
}) {
  const [changePassword] = useChangePasswordMutation();
  const [currentPwd, setCurrentPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [pwdError, setPwdError] = useState("");

  const handlePasswordChange = async (e) => {
    if (e) e.preventDefault();
    // check if user or admin - only user needs current password
    const isSelf = !userId;

    if ((isSelf && !currentPwd) || !newPwd || newPwd !== confirmPwd) {
      setPwdError(
        isSelf && !currentPwd
          ? "Enter your current password"
          : newPwd !== confirmPwd
            ? "New passwords must match"
            : "Enter a new password",
      );
      return;
    }

    try {
      await changePassword({
        id: userId, // pass in userId prop
        currentPassword: currentPwd,
        newPassword: newPwd,
        confirmPassword: confirmPwd,
      }).unwrap();

      handleOnSuccess();

      setShowPwdForm(false);
      setCurrentPwd("");
      setNewPwd("");
      setConfirmPwd("");
      setPwdError("");
    } catch {
      setPwdError("Password change failed");
    }
  };

  const handlePasswordCancel = () => {
    setShowPwdForm(false);
    setPwdError("");
  };

  return (
    <>
      <div className="border rounded p-3 mb-3">
        <Form onSubmit={handlePasswordChange}>
          {!userId && (
            <Form.Group className="mb-2" controlId="currentPwd">
              <Form.Label style={{ fontSize: "12px", paddingLeft: "3px" }}>
                CURRENT PASSWORD
              </Form.Label>
              <Form.Control
                type="password"
                value={currentPwd}
                onChange={(e) => setCurrentPwd(e.target.value)}
              />
            </Form.Group>
          )}

          <Form.Group className="mb-2" controlId="newPwd">
            <Form.Label style={{ fontSize: "12px", paddingLeft: "3px" }}>
              NEW PASSWORD
            </Form.Label>
            <Form.Control
              type="password"
              value={newPwd}
              onChange={(e) => setNewPwd(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-2" controlId="confirmPwd">
            <Form.Label style={{ fontSize: "12px", paddingLeft: "3px" }}>
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
              type="submit"
              buttonState="idle"
              onClick={handlePasswordChange}
              rounded
              idleText="Save"
              loadingText="Loading"
              variant="secondary"
              className="btn-primary-soft"
              style={{
                marginRight: "5px",
                width: "90px",
                fontSize: "12px",
                marginTop: "8px",
                backgroundColor: "#558e89",
              }}
            />
            <ReactiveButton
              type="submit"
              buttonState="idle"
              onClick={handlePasswordCancel}
              rounded
              idleText="Cancel"
              loadingText="Loading"
              variant="secondary"
              className="btn-primary-soft"
              style={{
                width: "90px",
                fontSize: "12px",
                marginTop: "8px",
                backgroundColor: "gray",
              }}
            />
          </div>
        </Form>
      </div>
    </>
  );
}
