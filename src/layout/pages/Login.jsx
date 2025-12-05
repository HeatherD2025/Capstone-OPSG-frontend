// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useLoginMutation } from "../../features/api/authApi";
// import NavBar from "../Navbar";
// import "../../styles/app.css";
// import ReactiveButton from "reactive-button";

// import InfoModal from "../../utils/Modal";
// import Footer from "../../utils/footer";

// import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
// import Nav from "react-bootstrap/Nav";
// import Card from "react-bootstrap/Card";
// import { axiosPrivate } from "../../features/axios";
// import {
//   setToken,
//   setRefreshToken,
//   setAuthHeader,
// } from "../../utils/tokenService";

// const Login = () => {
//   const navigate = useNavigate();
//   const [login, { isLoading: rtqLoading }] = useLoginMutation();

//   // Modal logic
//   const [response, setResponse] = useState();
//   const [show, setShow] = useState(false);
//   const openModal = () => setShow(true);
//   const closeModal = () => setShow(false);

//   // local loading for button
//   const [loading, setLoading] = useState(false);

//   // stores data from login form
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   // store form data as it is typed
//   const update = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   // submit login request
//   const submit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const payload = await login(formData).unwrap();
//       console.log("Login payload", payload);

//       const accessToken = payload?.data?.token;
//       const refreshToken = payload?.data?.refreshToken;
//       const user = payload?.data?.user;

//       if (accessToken) {
//         console.log("Storing tokens:", accessToken, refreshToken);
//         // token also stored via tokenService
//         setToken(accessToken);

//         // set axiosPrivate as default auth header
//         setAuthHeader(axiosPrivate, accessToken);
//       }

//       if (refreshToken) setRefreshToken(refreshToken);

//       // const userId = user?.id ?? null;
//       const userId = loginResponse.data.user.id;
//       const isAdmin = user?.isAdmin ?? false;

//       if (isAdmin) {
//         navigate("/admin/dashboard");
//       } else if (userId) {
//         navigate(`/user/${userId}/dashboard`);
//       } else {
//         navigate("/");
//       }
//     } catch (error) {
//       console.error("Login error", error);
//       const message =
//         error?.data?.message ||
//         error?.data ||
//         error?.message ||
//         JSON.stringify(error);
//       setResponse(message);
//       openModal();
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="background">
//         <div className="backgroundAccent">
//           <NavBar />
//           <div
//             style={{ paddingTop: "120px" }}
//             className="d-flex justify-content-center vh-80"
//           >
//             {show ? (
//               <InfoModal
//                 show={show}
//                 hide={closeModal}
//                 heading="Error"
//                 body={response}
//               />
//             ) : (
//               <></>
//             )}
//             <Card className="w-50 mt-5" style={{ display: "flex" }}>
//               <Card.Header>
//                 <Nav variant="tabs" defaultActiveKey="/login">
//                   <Nav.Item>
//                     <Nav.Link
//                       href="/#/login"
//                       style={{
//                         variant: "secondary",
//                         fontSize: "12px",
//                         paddingBottom: "10px",
//                         paddingTop: "15px",
//                       }}
//                     >
//                       LOGIN
//                     </Nav.Link>
//                   </Nav.Item>
//                   <Nav.Item>
//                     <Nav.Link
//                       href="/#/register"
//                       style={{
//                         variant: "secondary",
//                         fontSize: "12px",
//                         paddingBottom: "10px",
//                         paddingTop: "15px",
//                       }}
//                     >
//                       REGISTER
//                     </Nav.Link>
//                   </Nav.Item>
//                 </Nav>
//               </Card.Header>
//               <Card.Body>
//                 <Form onSubmit={submit}>
//                   <Form.Group className="mb-3" controlId="formBasicEmail">
//                     <Form.Label
//                       className="formLabel"
//                       style={{ paddingLeft: "3px" }}
//                     >
//                       EMAIL
//                     </Form.Label>
//                     <Form.Control
//                       type="email"
//                       name="email"
//                       placeholder="Enter email"
//                       onChange={update}
//                       style={{
//                         fontSize: "12px",
//                       }}
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3" controlId="formBasicPassword">
//                     <Form.Label
//                       className="formLabel"
//                       style={{ paddingLeft: "3px" }}
//                     >
//                       PASSWORD
//                     </Form.Label>
//                     <Form.Control
//                       type="password"
//                       name="password"
//                       placeholder="Enter password"
//                       onChange={update}
//                       style={{
//                         fontSize: "12px",
//                       }}
//                     />
//                   </Form.Group>

//                   <ReactiveButton
//                     rounded
//                     buttonState={rtqLoading ? "loading" : "idle"}
//                     idleText={"SUBMIT"}
//                     loadingText={"Loading"}
//                     variant="secondary"
//                     className="button3"
//                     type="submit"
//                     style={{
//                       width: "80px",
//                       fontSize: "12px",
//                       backgroundColor: "#558e89",
//                     }}
//                     disabled={rtqLoading || loading}
//                   />
//                 </Form>
//               </Card.Body>
//             </Card>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Login;

// TEST CODE
// import React, { useState, useContext } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { useLoginMutation } from "../../features/api/authApi";
// import NavBar from "../Navbar";
// import "../../styles/app.css";
// import ReactiveButton from "reactive-button";

// import InfoModal from "../../utils/Modal";
// import Footer from "../../utils/footer";
// import Nav from "react-bootstrap/Nav";
// import Form from "react-bootstrap/Form";
// import Card from "react-bootstrap/Card";
// import { axiosPrivate } from "../../features/axios";
// import {
//   setToken,
//   setRefreshToken,
//   setAuthHeader,
// } from "../../utils/tokenService";
// import { userContext } from "../../components/navigations/ContextProvider";

// const Login = () => {
//   const navigate = useNavigate();
//   const { setAuthenticated, setIsAdmin } = useContext(userContext);

//   const [login, { isLoading: rtqLoading }] = useLoginMutation();

//   // Modal logic
//   const [response, setResponse] = useState();
//   const [show, setShow] = useState(false);
//   const openModal = () => setShow(true);
//   const closeModal = () => setShow(false);

//   const [loading, setLoading] = useState(false);

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   const update = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const submit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const payload = await login(formData).unwrap();

//       const accessToken = payload?.data?.token;
//       const refreshToken = payload?.data?.refreshToken;
//       const user = payload?.data?.user;

//       console.log("Access token:", accessToken);
//       console.log("Refresh token:", refreshToken);

//       if (accessToken) {
//         setToken(accessToken);
//         setAuthHeader(axiosPrivate, accessToken);
//         axiosPrivate.defaults.headers.common["Content-Type"] =
//           "application/json";
//       }

//       if (refreshToken) {
//         // Store refresh token explicitly
//         setRefreshToken(refreshToken);
//         console.log(
//           "Refresh token stored:",
//           localStorage.getItem("refreshToken")
//         );
//       } else {
//         console.warn("No refresh token received!");
//       }

//       if (user) {
//         // Update context
//         setAuthenticated(true);
//         if (user.isAdmin) setIsAdmin(true);

//         // Navigate dynamically
//         if (user.isAdmin) {
//           navigate(`/admin/dashboard`);
//         } else {
//           navigate(`/user/${user.id}`);
//         }
//       } else {
//         navigate("/");
//       }
//     } catch (error) {
//       console.error("Login error", error);
//       const message =
//         error?.data?.message ||
//         error?.data ||
//         error?.message ||
//         JSON.stringify(error);
//       setResponse(message);
//       openModal();
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="background">
//         <div className="backgroundAccent">
//           <NavBar />
//           <div
//             style={{ paddingTop: "120px" }}
//             className="d-flex justify-content-center vh-80"
//           >
//             {show && (
//               <InfoModal
//                 show={show}
//                 hide={closeModal}
//                 heading="Error"
//                 body={response}
//               />
//             )}
//             <Card className="w-50 mt-5" style={{ display: "flex" }}>
//               <Card.Header>
//                 <Nav variant="tabs" defaultActiveKey="/login">
//                   <Nav.Item>
//                     <Nav.Link
//                       href="/#/login"
//                       style={{
//                         variant: "secondary",
//                         fontSize: "12px",
//                         paddingBottom: "10px",
//                         paddingTop: "15px",
//                       }}
//                     >
//                       LOGIN
//                     </Nav.Link>
//                   </Nav.Item>
//                   <Nav.Item>
//                     <Nav.Link
//                       href="/#/register"
//                       style={{
//                         variant: "secondary",
//                         fontSize: "12px",
//                         paddingBottom: "10px",
//                         paddingTop: "15px",
//                       }}
//                     >
//                       REGISTER
//                     </Nav.Link>
//                   </Nav.Item>
//                 </Nav>
//               </Card.Header>
//               <Card.Body>
//                 <Form onSubmit={submit}>
//                   <Form.Group className="mb-3" controlId="formBasicEmail">
//                     <Form.Label
//                       className="formLabel"
//                       style={{ paddingLeft: "3px" }}
//                     >
//                       EMAIL
//                     </Form.Label>
//                     <Form.Control
//                       type="email"
//                       name="email"
//                       placeholder="Enter email"
//                       onChange={update}
//                       style={{ fontSize: "12px" }}
//                     />
//                   </Form.Group>
//                   <Form.Group className="mb-3" controlId="formBasicPassword">
//                     <Form.Label
//                       className="formLabel"
//                       style={{ paddingLeft: "3px" }}
//                     >
//                       PASSWORD
//                     </Form.Label>
//                     <Form.Control
//                       type="password"
//                       name="password"
//                       placeholder="Enter password"
//                       onChange={update}
//                       style={{ fontSize: "12px" }}
//                     />
//                   </Form.Group>

//                   <ReactiveButton
//                     rounded
//                     buttonState={rtqLoading ? "loading" : "idle"}
//                     idleText={"SUBMIT"}
//                     loadingText={"Loading"}
//                     variant="secondary"
//                     className="button3"
//                     type="submit"
//                     style={{
//                       width: "80px",
//                       fontSize: "12px",
//                       backgroundColor: "#558e89",
//                     }}
//                     disabled={rtqLoading || loading}
//                   />
//                 </Form>
//               </Card.Body>
//             </Card>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Login;

import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../features/api/authApi";
import NavBar from "../Navbar";
import "../../styles/app.css";
import ReactiveButton from "reactive-button";

import InfoModal from "../../utils/Modal";
import Footer from "../../utils/footer";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { axiosPrivate } from "../../features/axios";
import { setAuthHeader } from "../../utils/tokenService";
import { userContext } from "../../components/navigations/ContextProvider";

// Redux slice action to store tokens
import { setTokens, logout } from "../../slices/authSlice";

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

      // backend may return either token or accessToken
      const accessToken = payload?.data?.accessToken || payload?.data?.token;
      const refreshToken = payload?.data?.refreshToken;
      const user = payload?.data?.user;

      console.log("Access token:", accessToken);
      console.log("Refresh token:", refreshToken);
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

        const userId = user.id || user._id;

        // Navigate based on role
        if (user.isAdmin) {
          navigate(`/admin/dashboard`);
        } else {
          navigate(`/user/${userId}`);
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
