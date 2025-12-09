import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import "../../styles/testUserNav.css";
import { logout } from "../../slices/authSlice";
import { useGetCurrentUserQuery } from "../../features/api/userApi";
import { Button } from "react-bootstrap";
import { removeToken } from "../../utils/tokenService";
import opsgLogo from "../../assets/img/opsg-logo.png";

const TestUserNav = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isNotActive, setNotActive] = useState(false);
  // const [isDropdownActive, setDropdownActive] = useState("false");
  const { userId } = useParams();
  const { data: user, isLoading, isError } = useGetCurrentUserQuery();

  if (isLoading) return <p>Loading user data...</p>;
  if (isError) return <p>Error loading user data</p>;
  if (!user) return null;

  var arrowRight = <i className="bi bi-arrow-right-circle-fill"></i>;
  var crossIcon = <i className="bi bi-x-circle"></i>;

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    dispatch(logout()); // resets redux auth state
    navigate("/");
  };


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
              <Button
                onClick={() => navigate(`/profile/invoices/${user.id}`)}
                variant="link"
                className="icon-btn"
              >
                <i className="bi bi-people" style={{color: "white"}}></i>
              </Button>
              <Link
                to={`/profile/invoices/${user.id}`}
                style={{
                  color: "white",
                }}
              >
                Invoices
              </Link>
            </li>


            <li className="list-item">
              <Button
                onClick={() => navigate(`/profile/${userId}`)}
                variant="link"
                className="icon-btn"
              >
                <i className="bi bi-gear" style={{color: "white"}}></i>
              </Button>
              <Link
                to={`/user/me/updateUserProfile`}
                style={{
                  color: "white",
                }}
              >
                Edit profile
              </Link>
            </li>


            <li className="list-item">
              <Button
                onClick={handleLogout}
                variant="link"
                className="icon-btn"
              >
                <i className="bi bi-box-arrow-left" style={{color: "white"}}></i>
              </Button>
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
export default TestUserNav;
