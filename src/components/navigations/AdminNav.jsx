import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/adminElements/adminNav.css";

import { removeToken } from "../../utils/tokenService";

import opsgLogo from "../../assets/img/opsg-logo.png";

const AdminNav = (props) => {
  const [isNotActive, setNotActive] = useState(false);
  var arrowRight = <i className="bi bi-arrow-right-circle-fill"></i>;
  var crossIcon = <i className="bi bi-x-circle"></i>;

  return (
    <div>
      <div className="wrapper">
        <nav id="sidebar" className={isNotActive ? "active" : ""}>
          <button
            type="button"
            id="sidebarCollapse"
            onClick={() => setNotActive(!isNotActive)}
            className="btn btn-custom"
          >
            <span className={isNotActive ? "" : "hidden"}>{arrowRight}</span>
            <span className={isNotActive ? "hidden" : ""}>{crossIcon}</span>
          </button>
          <div className="sidebar-header">
            <img
              src={opsgLogo}
              alt="OPSG logo"
              height={isNotActive ? "20" : "70"}
              width={isNotActive ? "20" : "70"}
            ></img>
            <h3>OnPoint</h3>
          </div>

          <ul className="list-unstyled components">
            <li className="list-item">
              <i className="bi bi-house"></i>
              <Link to="/">Home</Link>
            </li>
            <li className="list-item">
              <i className="bi bi-people-fill"></i>
              <Link to="/admin/search">Users</Link>
            </li>

            <li className="list-item">
              <i className="bi bi-box-arrow-left"></i>
              <Link to="/" onClick={() => removeToken()}>
                Log out
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default AdminNav;
