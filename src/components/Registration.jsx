import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../features/api/authApi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setTokens } from "../slices/authSlice";
import { setAuthHeader } from "../utils/tokenService";
import { useContext } from "react";
import { userContext } from "./navigations/ContextProvider";
import ReactiveButton from "reactive-button";
import "../styles/app.css";
import Footer from "../components/Footer";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Card from "react-bootstrap/Card";
import InfoModal from "./Modal";
import NavBar from "../components/navigations/Navbar";

export default function Registration() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setAuthenticated, setIsAdmin } = useContext(userContext);

  const [register, status] = useRegisterMutation();

  // Modal logic
  const [response, setResponse] = useState();
  const [show, setShow] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const openModal = () => setShow(true);
  const closeModal = () => setShow(false);

  const [loading, setLoading] = useState(false);

  // stores data from login form
  const [formData, setFormData] = useState({
    company: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // store form data as it is typed
  const update = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate password in real-time
    if (name === "password") {
      validatePassword(value);
    }
  };

  // Password validation function
  const validatePassword = (password) => {
    const minLength = password.length >= 8;
    const hasCapital = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    let error = "";
    if (!minLength) error = "Password must be at least 8 characters";
    else if (!hasCapital)
      error = "Password must contain at least one capital letter";
    else if (!hasNumber) error = "Password must contain at least one number";

    setPasswordError(error);
    return !error;
  };

  // submit registration request
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate password before submission
    if (!validatePassword(formData.password)) {
      setResponse(passwordError);
      openModal();
      return;
    }

    try {
      const payload = await register(formData).unwrap();

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

        if (user.isAdmin) navigate(`/admin/dashboard`);
        else navigate(`/user/dashboard`);
      } else {
        console.warn("Missing token or user data from registration response");
        setResponse("Registration succeeded but auth info missing");
        openModal();
      }
    } catch (error) {

      const message =
        error?.data?.message ||
        error?.data ||
        error?.message ||
        JSON.stringify(error);

      setResponse(message);
      openModal();
      console.error("Registration error", message);
    }
    finally {
      setLoading(false)
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
            <Card className="w-50 mt-5">
              <Card.Header>
                <Nav variant="tabs" defaultActiveKey="/register">
                  <Nav.Item>
                    <Nav.Link
                      href="/#/login"
                      style={{
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
                  <Form.Group className="mb-3" controlId="formBasicCompany">
                    <Form.Label
                      style={{
                        fontSize: "12px",
                        paddingLeft: "3px",
                      }}
                    >
                      COMPANY
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="company"
                      placeholder="  Company"
                      onChange={update}
                      style={{
                        fontSize: "12px",
                        paddingLeft: "3px",
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label
                      style={{
                        fontSize: "12px",
                        paddingLeft: "3px",
                      }}
                    >
                      FIRST NAME
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="firstName"
                      placeholder="  First name"
                      onChange={update}
                      style={{
                        fontSize: "12px",
                        paddingLeft: "3px",
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicLastName">
                    <Form.Label
                      style={{
                        fontSize: "12px",
                        paddingLeft: "3px",
                      }}
                    >
                      LAST NAME
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="lastName"
                      placeholder="  Last name"
                      onChange={update}
                      style={{
                        fontSize: "12px",
                        paddingLeft: "3px",
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label
                      style={{
                        fontSize: "12px",
                        paddingLeft: "3px",
                      }}
                    >
                      E-MAIL
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="  johndoe@email.com"
                      onChange={update}
                      style={{
                        fontSize: "12px",
                        paddingLeft: "3px",
                      }}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label
                      style={{
                        fontSize: "12px",
                        paddingLeft: "3px",
                      }}
                    >
                      PASSWORD
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="  Enter password (min 8 chars, 1 capital, 1 number)"
                      onChange={update}
                      style={{
                        fontSize: "12px",
                        paddingLeft: "3px",
                      }}
                      isInvalid={!!passwordError}
                    />
                    <Form.Control.Feedback type="invalid">
                      {passwordError}
                    </Form.Control.Feedback>
                  </Form.Group>

                  <ReactiveButton
                    rounded
                    buttonState={loading ? "loading" : "idle"}
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
                    disabled={!!passwordError || !formData.password}
                  ></ReactiveButton>
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
