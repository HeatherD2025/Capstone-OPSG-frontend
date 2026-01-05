import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getToken, removeToken } from "../../utils/tokenService";
import { jwtDecode } from "jwt-decode";
import opsgLogo from "../../assets/img/opsg-logo.png";
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
    const currentUrl = window.location.hash.replace("#", "");

    const cleanedUrl = currentUrl
      .replace("/ourservices", "")
      .replace("/contactform", "")
      .replace("/login", "")
      .replace("/register", "");

    const baseOfUrl = cleanedUrl.endsWith("/") ? cleanedUrl : cleanedUrl + "/";

    const adminProfile = baseOfUrl + "admin/dashboard";
    const userProfile = baseOfUrl + "user/dashboard";

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
      <nav
        className="navbar bg-light2 navbarTestClass"
        style={{
          overflow: "hidden",
          position: "fixed" /* Set the navbar to fixed position */,
          top: "0" /* Position the navbar at the top of the page */,
          width: "100%",
          zIndex: "5",
        }}
      >
        <div className="container-fluid" style={{ display: "contents" }}>

          <div className="navbar-header">
            <div
              className="navLogoWrapper"
              style={{
                display: "flex",
                marginLeft: "5rem",
                fontWeight: "200",
                fontSize: "clamp(12px, 3vw, 20px)",
                flexDirection: "column",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <img
                src={opsgLogo}
                alt="OPSG logo"
                className="rounded-circle usr-image2 nav navbar-nav"
                style={{
                  width: "clamp(35px, 1vw, 10px)",
                  height: "clamp(35px, 1vw, 10px)",
                }}
              ></img>
              <div>OnPoint</div>
            </div>
          </div>

          <ListGroup
            className="nav navbar-nav  sidebar-header2"
            style={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "noWrap",
              gap: "clamp(1vw, 8vw, 8vw)",
              fontSize: "clamp(12px, 10vw, 14px)",
            }}
          >
            <ListGroup.Item
              className="nav-item"
              action
              onClick={() => navigate("/")}
              style={{
                fontColor: "black",
                border: "none",
                backgroundColor: "white",
              }}
            >
              ABOUT
            </ListGroup.Item>
            <ListGroup.Item
              className="nav-item"
              action
              onClick={() => navigate("/ourservices")}
              style={{
                fontColor: "black",
                border: "none",
                backgroundColor: "white",
              }}
            >
              SERVICES
            </ListGroup.Item>
            <ListGroup.Item
              className="nav-item"
              action
              onClick={() => navigate("/contactform")}
              style={{
                fontColor: "black",
                border: "none",
                backgroundColor: "white",
              }}
            >
              CONTACT
            </ListGroup.Item>
            {token ? (
              <ListGroup.Item
                className="nav-item"
                action
                onClick={() => profileNavigation()}
                style={{
                  fontColor: "black",
                  border: "none",
                  backgroundColor: "white",
                }}
              >
                PROFILE
              </ListGroup.Item>
            ) : (
              <></>
            )}
          </ListGroup>



            <div className="mobileButtonWrapper">
                <ListGroup
                  className="nav mobileButtonWrapper"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    position: "anchor-right",
                  }}
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
                          style={{
                            width: "8rem",
                            backgroundColor: "#558e89",
                            fontSize: "12px",
                          }}
                        >
                          {isLoggedIn}
                        </ReactiveButton>
                      ) : (
                        <ReactiveButton
                          rounded
                          idleText={"LOGIN"}
                          type="button"
                          variant="secondary"
                          style={{
                            marginRight: "5px",
                            width: "8rem",
                            backgroundColor: "#558e89",
                            fontSize: "12px",
                          }}
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
                          style={{
                            backgroundColor: "#558e89",
                            width: "8rem",
                            fontSize: "12px",
                            marginRight: "5rem",
                          }}
                          // className="button"
                          onClick={() => navigate("/register")}
                        ></ReactiveButton>
                      )}
                    </span>
                  </ListGroup.Item>
                </ListGroup>
            </div>
            

        </div>
      </nav>
    </header>
  );
}
