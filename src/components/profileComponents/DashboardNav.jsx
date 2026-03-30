import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom"; // Added useLocation
import { Button } from "react-bootstrap";
import "../../styles/dashboardNav.css";
import { logout } from "../../slices/authSlice";
import { removeToken } from "../../utils/tokenService";
import { useGetCurrentUserQuery } from "../../features/api/userApi";

const DashboardNav = () => {
  const [isNotActive, setNotActive] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation(); // Hook for location tracking

  const { data: user, isLoading, isError } = useGetCurrentUserQuery();
  const { isAdmin } = useSelector((state) => state.auth);

  useEffect(() => {
    const id = location.hash.replace("#", "");
    const el = document.getElementById(id);

    if (id && el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname, location.hash]);

  if (isLoading) return <p>Loading user data...</p>;
  if (isError) return <p>Error loading user data</p>;
  if (!user) return <p>No user found</p>;

  const arrowRight = <i className="bi bi-arrow-right-circle-fill"></i>;
  const crossIcon = <i className="bi bi-x-circle"></i>;

  return (
    <div>
      <div className="nav-wrapper">
        <nav id="sidebar" className={isNotActive ? "active" : ""}>
          <Button
            type="button"
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
              <i className="bi bi-speedometer2"></i>{" "}
              {/* Suggestion: Different icon for clarity */}
              <Link to="/dashboard">Dashboard</Link>
            </li>

            {isAdmin ? (
              <li className="dashboard-list-item">
                <i className="bi bi-people-fill"></i>
                <Link to="/admin/search">All Users</Link>
              </li>
            ) : (
              <>
                <li className="dashboard-list-item">
                  <i className="bi bi-receipt"></i>{" "}
                  {/* Suggestion: Invoice icon */}
                  <Link to={`/profile/invoices/${user.id}`}>View Invoices</Link>
                </li>

                <li className="dashboard-list-item">
                  <i className="bi bi-person-gear"></i>
                  <Link to="/user/me/updateUserProfile">Edit Profile</Link>
                </li>
              </>
            )}

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

export default DashboardNav;
