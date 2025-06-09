import React from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getToken, deleteToken } from "../utils/tokenService";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import opsgLogo from "../assets/img/opsg-logo.png";
import "../Layout/navbar.css";
import ReactiveButton from "reactive-button";
import ListGroup from "react-bootstrap/ListGroup";

export default function NavBar() {
  const navigate = useNavigate();
  const token = getToken();

  const [isLoggedIn, setIsLoggedIn] = useState("Login");
  const [isLoading, setLoading] = useState(false);

  let userId;
  if (token) {
    const { id } = jwtDecode(token);
    userId = id;
  }

  useEffect(() => {
    if (token) {
      setIsLoggedIn("LOGOUT");
    } else {
      setIsLoggedIn("LOGIN");
    }
  }, [token]);

  const handleLogout = () => {
    deleteToken(token);
    navigate("/login");
  };

  const [isNotActive, setNotActive] = useState("true");

  return (
    <header>
      <nav
        className="navbar bg-light2"
        style={{
          overflow: "hidden",
          position: "fixed" /* Set the navbar to fixed position */,
          top: "0" /* Position the navbar at the top of the page */,
          width: "100%",
          zIndex: "5",
        }}
      >
        <div className="container-fluid" style={{ diplay: "contents" }}>
          <div className="navbar-header">
            <div
              className="navLogoWrapper"
              style={{
                display: "flex",
                marginLeft: ".5vw",
                fontWeight: "200",
                fontSize: "clamp(12px, 3vw, 20px)",
                flexDirection: "column",
                flexWrap: "wrap",
                alignItems: "center",
              }}
            >
              <img
                src={opsgLogo}
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
              fontSize: "clamp(1.25vw, 10vw, 10px)",
            }}
          >
            <ListGroup.Item
              className="nav-item"
              action
              onClick={() => navigate("/")}
              style={{
                fontColor: "black",
                border: "none",
                backgroundColor: "white"
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
                backgroundColor: "white"
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
                backgroundColor: "white"
              }}
            >
              CONTACT
            </ListGroup.Item>
            {token ? (
              <ListGroup.Item
                className="nav-item"
                action
                onClick={() => navigate(`/user/${userId}`)}
              style={{
                fontColor: "black",
                border: "none",
                backgroundColor: "white"
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
                    marginRight: "15px",
                    border: "solid var(--bs-body-bg)",
                  }}
                >
                  {token ? (
                    <ReactiveButton
                      rounded
                      idleText={"LOGOUT"}
                      type="button"
                      variant="secondary"
                      style={{
                        width: "80px",
                        backgroundColor: "#558e89",
                        fontSize: "12px",
                      }}
                      // className=""
                      onClick={handleLogout}
                      navigate="/"
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
                        backgroundColor: "#558e89",
                        fontSize: "12px",
                      }}
                      className="navbar-right"
                      onClick={handleLogout} // TODO make sure this is fine, I dont think its fine
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
                    className="btn"
                      rounded
                      idleText={"REGISTER"}
                      type="button"
                      style={{
                        backgroundColor: "#558e89",
                        fontSize: "12px",
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
