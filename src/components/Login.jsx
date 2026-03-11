import { useState, useEffect, useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../features/api/authApi";
import NavBar from "./navigation/Navbar";
import "../styles/app.css";
import ReactiveButton from "reactive-button";

import InfoModal from "./Modal";
import Footer from "./Footer";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import { axiosPrivate } from "../features/axios";
import { setAuthHeader } from "../utils/tokenService";
import { userContext } from "./navigation/ContextProvider";
import { setTokens, logout } from "../slices/authSlice";

// login should trigger state change, update context flags and navigate
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setAuthenticated, setIsAdmin } = useContext(userContext);

  const [login, { isLoading: rtqLoading }] = useLoginMutation();

  // welcome modal
  const [welcomeModalShow, setWelcomeModalShow] = useState(false);
  const [welcomeModalHeading, setWelcomeModalHeading] = useState("");
  const [welcomeModalBody, setWelcomeModalBody] = useState("");
  const [welcomeModalBody2, setWelcomeModalBody2] = useState("");
  const SESSION_STORAGE_KEY = "isModalShownOnce";

  // verify if welcome modal has been shown in current session
  useEffect(() => {
    const hasBeenShown = sessionStorage.getItem(SESSION_STORAGE_KEY);

    if (!hasBeenShown) {
      setWelcomeModalHeading(
        "Welcome to the OPSG demo app! Explore as user or admin:",
      );
      setWelcomeModalBody("User - email: 'demo@demo.com' password: '123'");
      setWelcomeModalBody2(
        "Admin - email: 'adminDemo@demo.com' password: '1234'",
      );
      setWelcomeModalShow(true);
      sessionStorage.setItem(SESSION_STORAGE_KEY, "true");
    }
  }, []);

  // Login/Register Modal logic
  const [response, setResponse] = useState();
  const [show, setShow] = useState(false);
  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const update = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = await login(formData).unwrap();

      // declare consistent name as backend may return either token or accessToken
      const accessToken = payload?.accessToken || payload?.token;
      const refreshToken = payload?.refreshToken;
      const user = payload?.user;

      if (accessToken && refreshToken && user) {
        // Store tokens in Redux (and localStorage automatically)
        dispatch(setTokens({ accessToken, refreshToken }));

        // Configure axios for authenticated requests
        setAuthHeader(axiosPrivate, accessToken);
        axiosPrivate.defaults.headers.common["Content-Type"] =
          "application/json";

        // Update context (for non-Redux parts of app)
        setAuthenticated(true);
        if (user.isAdmin) setIsAdmin(true);
        navigate(`/dashboard`);
        // const userId = user.id || user._id;
      } else {
        console.warn("Missing token or user data from login response");
        dispatch(logout()); // clear state & tokens
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);

      const message =
        error?.data?.message ||
        error?.data ||
        error?.message ||
        JSON.stringify(error);

      setResponse(message);
      openModal();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="background">
        <div className="background-accent">
          <NavBar />

          <div className="mb-3 welcome-modal-wrapper">
            {/* Welcome Modal */}
            <InfoModal
              show={welcomeModalShow}
              hide={() => setWelcomeModalShow(false)}
              heading={welcomeModalHeading}
              body={welcomeModalBody}
              body2={welcomeModalBody2}
              className="btn-primary-soft"
            />
          </div>

          <div className="d-flex justify-content-center vh-80 login-register-modal">
            {show && (
              <InfoModal
                show={show}
                hide={closeModal}
                heading="Error"
                body={response}
              />
            )}

            <div className="login-register-form-container">
              <Nav
                variant="tabs"
                defaultActiveKey="/login"
                className="login-register-header"
              >
                <Nav.Item>
                  <Nav.Link href="/#/login" className="login-register-tab-link">
                    Login
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
                    href="/#/register"
                    className="login-register-tab-link"
                  >
                    Register
                  </Nav.Link>
                </Nav.Item>
              </Nav>

              <Form onSubmit={submit} className="login-register-form">
                <Form.Group className="mb-3" controlId="form-basic-email">
                  <Form.Label className="form-label">Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="demo@demo.com   |   adminDemo@demo.com"
                    onChange={update}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="form-basic-password">
                  <Form.Label className="form-label">Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="123   |   1234"
                    onChange={update}
                  />
                </Form.Group>

                <ReactiveButton
                  rounded
                  buttonState={rtqLoading ? "loading" : "idle"}
                  idleText={"Submit"}
                  loadingText={"Loading"}
                  variant="secondary"
                  className="submit-btn-custom"
                  type="submit"
                  disabled={rtqLoading || loading}
                />
              </Form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
