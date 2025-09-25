import React, { useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./UserNav.css";
import opsgLogo from "../../../assets/img/opsg-logo.png";
import { Button } from "react-bootstrap";

export const UserNav = (props) => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [isNotActive, setNotActive] = useState(false);
  const [isDropdownActive, setDropdownActive] = useState("false");

  var arrowRight = <i className="bi bi-arrow-right-circle-fill"></i>;
  var crossIcon = <i className="bi bi-x-circle"></i>;

  const handleClick = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // Button logic
  const handleEditProfileClick = () => {
    navigate(`/profile/${userId}`);
  };
  const handleHomeClick = () => {
    navigate(`/`);
  };
  const handleInvoiceClick = () => {
    navigate(`/profile/invoices/${userId}`);
  };
  //importing handle logout for logout button
  //nvm its in another function copy and pasting it
  //nvm using handleClick
  return (
    <div>
      <div
        className="wrapper"
        style={{
          backgroundColor: "white",
        }}
      >
        <nav id="sidebar" className={isNotActive ? "active" : ""}>
          <button
            type="button"
            id="sidebarCollapse"
            onClick={() => setNotActive(!isNotActive)}
            className="btn btn-custom2"
          >
            <span className={isNotActive ? "" : "hidden"}>{arrowRight}</span>
            <span className={isNotActive ? "hidden" : ""}>{crossIcon}</span>
          </button>

          <div className="sidebar-header2">
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
                height={isNotActive ? "0" : "80"}
                width={isNotActive ? "0" : "80"}
                // style={{width: "clamp(35px, 1vw, 10px)", height: "clamp(35px, 1vw, 10px)"}}
              ></img>
              <h4
                className="onPointLogoText"
                style={{ color: "black", fontWeight: "200" }}
              >
                OnPoint
              </h4>
            </div>
          </div>

          {/* <div className="sidebar-header2">
            <img
              src={opsgLogo}
              className="rounded-circle usr-image"
              height={isNotActive ? "20" : "70"}
              width={isNotActive ? "20" : "70"}
            ></img>
            <h3 className="onPointLogoText">OnPoint</h3>
          </div> */}

          <ul className="list-unstyled components">
            <li className="list-item">
              <Button
                onClick={handleHomeClick}
                variant="link"
                className="icon-btn"
              >
                <i className="bi bi-house"></i>
              </Button>
              <Link
                to="/"
                style={{
                  color: "black",
                  fontWeight: "200",
                  fontSize: "clamp(1px, 5vw, 16px)",
                }}
              >
                HOME
              </Link>
            </li>
            <li className="list-item">
              <Button
                onClick={handleInvoiceClick}
                variant="link"
                className="icon-btn"
              >
                <i className="bi bi-people-fill"></i>
              </Button>
              <Link
                to={`/profile/invoices/${userId}`}
                style={{
                  color: "black",
                  fontWeight: "200",
                  fontSize: "clamp(12px, 4.5vw, 16px)",
                }}
              >
                INVOICES
              </Link>
            </li>
            <li className="list-item-unstyled">
              <Button
                onClick={handleEditProfileClick}
                variant="link"
                className="icon-btn"
              >
                <i className="bi bi-gear"></i>
              </Button>
              <Link
                to={`/profile/${userId}`}
                style={{
                  color: "black",
                  fontWeight: "200",
                  fontSize: "clamp(12px, 8vw, 16px)",
                }}
              >
                EDIT PROFILE
              </Link>
            </li>
            <li className="list-item">
              <Button onClick={handleClick} variant="link" className="icon-btn">
                <i className="bi bi-box-arrow-left"></i>
              </Button>
              <Link
                to="/"
                onClick={handleClick}
                style={{
                  color: "black",
                  fontWeight: "200",
                  fontSize: "clamp(12px, 8vw, 16px)",
                }}
              >
                LOG OUT
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
