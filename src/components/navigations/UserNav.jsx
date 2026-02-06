import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import "../../styles/dashboardNav.css";
import { logout } from "../../slices/authSlice";
import { removeToken } from "../../utils/tokenService";
import { useGetCurrentUserQuery } from "../../features/api/userApi";

const UserNav = (props) => {
  const [isNotActive, setNotActive] = useState(false);
  const dispatch = useDispatch();
  // const [isDropdownActive, setDropdownActive] = useState("false");
  const { data: user, isLoading, isError } = useGetCurrentUserQuery();

  if (isLoading) return <p>Loading user data...</p>;
  if (isError) return <p>Error loading user data</p>;
  if (!user) return <p>No user found</p>;

  var arrowRight = <i className="bi bi-arrow-right-circle-fill"></i>;
  var crossIcon = <i className="bi bi-x-circle"></i>;

  return (
    <div>
      <div className="nav-wrapper">
         <nav id="sidebar" className={isNotActive ? "active" : ""}>
          <Button
            type="button"
            id="dashboard-collapse"
            onClick={() => setNotActive(!isNotActive)}
            className="btn btn-custom collapse-button"
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
              <i className="bi bi-people"></i>
              <Link to={`/profile/invoices/${user.id}`}>View Invoices</Link>
            </li>

            <li className="dashboard-list-item">
              <i className="bi bi-gear"></i>
              <Link to={`/user/me/updateUserProfile`}>Edit Profile</Link>
            </li>

            <li className="dashboard-list-item">
              <i className="bi bi-box-arrow-left"></i>
              <Link
                to="/"
                onClick={() => {
                  removeToken();
                  dispatch(logout());
                }}
              >
                Log Out
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default UserNav;
