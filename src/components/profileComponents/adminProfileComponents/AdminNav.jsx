import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import "../../styles/dashboardNav.css";
import { removeToken } from "../../../utils/tokenService";

const AdminNav = (props) => {
  const [isNotActive, setNotActive] = useState(false);
  var arrowRight = <i className="bi bi-arrow-right-circle-fill"></i>;
  var crossIcon = <i className="bi bi-x-circle"></i>;

  return (
    <div>
      <div className="nav-wrapper">
        <nav id="sidebar" className={isNotActive ? "active" : ""}>
          <Button
            type="button"
            id="sidebar-collapse"
            onClick={() => setNotActive(!isNotActive)}
            className="btn btn-custom"
          >
            <span className={isNotActive ? "" : "hidden"}>{arrowRight}</span>
            <span className={isNotActive ? "hidden" : ""}>{crossIcon}</span>
          </Button>

          <ul className="list-unstyled components">
            <li className="dashboard-list-item">
              <i className="bi bi-house"></i>
              <Link to="/">OPSG Home</Link>
            </li>

            <li className="dashboard-list-item">
              <i className="bi bi-house"></i>
              <Link to="/dashboard">Dashboard</Link>
            </li>

            <li className="dashboard-list-item">
              <i className="bi bi-people-fill"></i>
              <Link to="/admin/search">All Users</Link>
            </li>

            <li className="dashboard-list-item">
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
