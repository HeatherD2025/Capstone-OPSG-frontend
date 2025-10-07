import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../features/api/authApi";
import NavBar from "../Navbar";
import "../../styles/app.css";
import ReactiveButton from "reactive-button";

import InfoModal from "../../utils/Modal";
import Footer from "../../utils/footer";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Card from "react-bootstrap/Card";

import { axiosPrivate } from "../../features/axios";
import { setToken, setRefreshToken, setAuthHeader } from "../../utils/tokenService";

export default function Login() {
  const navigate = useNavigate();
  const [login, {isLoading: rtqLoading}] = useLoginMutation();

  // Modal logic
  const [response, setResponse] = useState();
  const [show, setShow] = useState(false);
  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);

  // local loading for button
  const [loading, setLoading] = useState(false);

  // stores data from login form
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // store form data as it is typed
  const update = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // submit login request
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = await login(formData).unwrap();

      const accessToken =
        payload?.accessToken ||
        payload?.token ||
        payload?.data?.accessToken ||
        payload?.tokens?.accessToken ||
        payload?.access_token;
      const refreshToken =
        payload?.refreshToken ||
        payload?.refresh_token ||
        payload?.data?.refreshToken ||
        payload?.tokens?.refreshToken;

      if (accessToken) {
        setToken(accessToken);
        setAuthHeader(axiosPrivate, accessToken);
      }
      if (refreshToken) setRefreshToken(refreshToken);

      const userId = payload?.user?.id ?? payload?.userId ?? payload?.id;
      const isAdmin = payload?.user?.isAdmin ?? payload?.isAdmin ?? false;

      if (isAdmin) {
        navigate(`/admin/dashboard`);
      } else if (userId) {
        navigate(`/user/${userId}`);
      } else {
        navigate("/")
      }
    } catch (error) {
      console.error("Login error", error);
      const message = 
      error?.data?.message || error?.data || error?.mesage || JSON.stringify(error);
      setResponse(message);
      openModal();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="background">
        <div className="backgroundAccent">
          <NavBar />
          <div
            style={{ paddingTop: "120px" }}
            className="d-flex justify-content-center vh-80"
          >
            {show ? (
              <InfoModal
                show={show}
                hide={closeModal}
                heading="Error"
                body={response}
              />
            ) : (
              <></>
            )}
            <Card className="w-50 mt-5" style={{ display: "flex" }}>
              <Card.Header>
                <Nav variant="tabs" defaultActiveKey="/login">
                  <Nav.Item>
                    <Nav.Link
                      href="/#/login"
                      style={{
                        variant: "secondary",
                        fontSize: "12px",
                        paddingBottom: "10px",
                        paddingTop: "15px",
                      }}
                    >
                      LOGIN
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link
                      href="/#/register"
                      style={{
                        variant: "secondary",
                        fontSize: "12px",
                        paddingBottom: "10px",
                        paddingTop: "15px",
                      }}
                    >
                      REGISTER
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={submit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label
                      className="formLabel"
                      style={{ paddingLeft: "3px" }}
                    >
                      EMAIL
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter email"
                      onChange={update}
                      style={{
                        fontSize: "12px",
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label
                      className="formLabel"
                      style={{ paddingLeft: "3px" }}
                    >
                      PASSWORD
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      onChange={update}
                      style={{
                        fontSize: "12px",
                      }}
                    />
                  </Form.Group>

                  <ReactiveButton
                    rounded
                    buttonState={rtqLoading ? "loading" : "idle"}
                    idleText={"SUBMIT"}
                    loadingText={"Loading"}
                    variant="secondary"
                    className="button3"
                    type="submit"
                    style={{
                      width: "80px",
                      fontSize: "12px",
                      backgroundColor: "#558e89",
                    }}
                     disabled={rtqLoading || loading}
                  />
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
