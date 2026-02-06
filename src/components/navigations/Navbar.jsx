import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getToken, removeToken } from "../../utils/tokenService";
import { jwtDecode } from "jwt-decode";
import opsgLogo from "../../assets/images/opsg-logo.webp";
import "../../styles/navbar.css";
import ReactiveButton from "reactive-button";
import ListGroup from "react-bootstrap/ListGroup";

export default function NavBar() {
  const navigate = useNavigate();
  const token = getToken();

  const [isLoggedIn, setIsLoggedIn] = useState("Login");

  const { isAdmin } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);

  let userId = user?.id;

  if (token && typeof token === "string") {
    try {
      const decoded = jwtDecode(token);
      userId = decoded?.id;
    } catch (error) {
      console.warn("Invalid token, clearing storage", error);
      removeToken();
      userId = undefined; // no value available vs. null - intentionally no value
    }
  }

  const profileNavigation = () => {
    //read the hash and remove # for a clean string
    const currentUrl = window.location.hash.replace("#", "");

    // known routes to clean from url (replace() ok if unique routes)
    const cleanedUrl = currentUrl
      .replace("/ourservices", "")
      .replace("/contactform", "")
      .replace("/login", "")
      .replace("/register", "");

    // normalize the trailing slash
    const baseOfUrl = cleanedUrl.endsWith("/") ? cleanedUrl : cleanedUrl + "/";

    // build dash based on role
    const adminProfile = baseOfUrl + "admin/dashboard";
    const userProfile = baseOfUrl + "user/dashboard";

    // navigate without reload
    if (!isAdmin) {
      navigate(userProfile);
    } else {
      navigate(adminProfile);
    }
  };

  const handleLogout = () => {
    removeToken();
    navigate("/login");
  };

  return (
    <header>
      <nav className="navbar bg-light2">
        <div className="container-fluid" style={{ display: "contents" }}>
          <div className="navbar-header">
            <div className="nav-logo-wrapper">
              <img
                src={opsgLogo}
                alt="OPSG logo"
                className="opsg-navbar-logo"
              ></img>
              <div>OnPoint</div>
            </div>
          </div>

          <ListGroup
            className="nav navbar-nav main-links"
          >
            <ListGroup.Item
              className="navbar-item"
              action
              onClick={() => navigate("/")}
            >
              ABOUT
            </ListGroup.Item>

            <ListGroup.Item
              className="navbar-item"
              action
              onClick={() => navigate("/ourservices")}
            >
              SERVICES
            </ListGroup.Item>

            <ListGroup.Item
              className="navbar-item"
              action
              onClick={() => navigate("/contactform")}
            >
              CONTACT
            </ListGroup.Item>

            {token ? (
              <ListGroup.Item
                className="navbar-item"
                action
                onClick={() => profileNavigation()}
              >
                PROFILE
              </ListGroup.Item>
            ) : (
              <></>
            )}
          </ListGroup>


            <ListGroup
              className="nav login-register-buttons"
            >
              <ListGroup.Item
                style={{
                  border: "solid var(--bs-body-bg)",
                }}
              >
                <span
                  style={{
                    border: "solid var(--bs-body-bg)",
                  }}
                >
                  {token ? (
                    <ReactiveButton
                      onClick={handleLogout}
                      rounded
                      idleText={"LOGOUT"}
                      type="button"
                      variant="secondary"
                      navigate="/"
                      className="login-register-btn-custom"
                    >
                      {isLoggedIn}
                    </ReactiveButton>
                  ) : (
                    <ReactiveButton
                      rounded
                      idleText={"LOGIN"}
                      type="button"
                      className="login-register-btn-custom"
                      onClick={() => navigate("/login")}
                    >
                      {isLoggedIn}
                    </ReactiveButton>
                  )}
                </span>
              </ListGroup.Item>

              <ListGroup.Item
                style={{
                  border: "solid var(--bs-body-bg)",
                }}
              >
                <span>
                  {token ? (
                    <button
                      className="nav-link"
                      href="/"
                      variant="secondary"
                    ></button>
                  ) : (
                    <ReactiveButton
                      rounded
                      idleText={"REGISTER"}
                      type="button"
                      className="login-register-btn-custom"
                      onClick={() => navigate("/register")}
                    ></ReactiveButton>
                  )}
                </span>
              </ListGroup.Item>
            </ListGroup>
        </div>
      </nav>
    </header>
  );
}
