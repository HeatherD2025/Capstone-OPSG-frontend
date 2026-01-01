import { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../features/api/authApi";
import NavBar from "../components/navigations/Navbar";
import "../styles/app.css";
import ReactiveButton from "reactive-button";

import InfoModal from "./Modal";
import Footer from "./Footer";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { axiosPrivate } from "../features/axios";
import { setAuthHeader } from "../utils/tokenService";
import { userContext } from "./navigations/ContextProvider";
import { setTokens, logout } from "../slices/authSlice";

// login should trigger state change, update context flags and navigate
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setAuthenticated, setIsAdmin } = useContext(userContext);

  const [login, { isLoading: rtqLoading }] = useLoginMutation();

  // Modal logic
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

      console.log("User:", user);

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

        // const userId = user.id || user._id;

        // Navigate based on role
        if (user.isAdmin) {
          navigate(`/admin/dashboard`);
        } else {
          navigate(`/user/dashboard`);
        }
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
        <div className="backgroundAccent">
          <NavBar />
          <div
            style={{ paddingTop: "120px" }}
            className="d-flex justify-content-center vh-80"
          >
            {show && (
              <InfoModal
                show={show}
                hide={closeModal}
                heading="Error"
                body={response}
              />
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
                      style={{ fontSize: "12px" }}
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
                      style={{ fontSize: "12px" }}
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
};

export default Login;
