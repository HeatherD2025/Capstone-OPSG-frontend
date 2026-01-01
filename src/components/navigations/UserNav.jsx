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
      <div className="navWrapper">
        <nav id="sidebar" className={isNotActive ? "active" : ""}>
          <Button
            type="button"
            id="sidebarCollapse"
            onClick={() => setNotActive(!isNotActive)}
            className="btn btn-custom collapse-button"
          >
            <span className={isNotActive ? "" : "hidden"}>{arrowRight}</span>
            <span className={isNotActive ? "hidden" : ""}>{crossIcon}</span>
          </Button>

          <ul className="list-unstyled components">

            <li className="list-item">
              <i className="bi bi-house"></i>
              <Link to="/">Home</Link>
            </li>

            <li className="list-item">
              <i className="bi bi-people"></i>
              <Link
                to={`/profile/invoices/${user.id}`}
              >
                Invoices
              </Link>
            </li>

            <li className="list-item">
              <i className="bi bi-gear"></i>
              <Link
                to={`/user/me/updateUserProfile`}
              >
                Edit profile
              </Link>
            </li>

            <li className="list-item">
              <i className="bi bi-box-arrow-left"></i>
              <Link 
                to="/" 
                onClick={() =>{
                  removeToken();
                  dispatch(logout());
                }}>
                Log out
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default UserNav;
