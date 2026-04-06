import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "react-bootstrap";
import { logout } from "../../slices/authSlice";
import { removeToken } from "../../utils/tokenService";
import { useGetCurrentUserQuery } from "../../features/api/userApi";
import "../../styles/dashboardNav.css";

const DashboardNav = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: user, isLoading, isError } = useGetCurrentUserQuery();
  const { isAdmin } = useSelector((state) => state.auth);

  useEffect(() => {
    const id = location.hash.replace("#", "");
    const el = document.getElementById(id);

    if (id && el) {
      setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.pathname, location.hash]);

  if (isLoading || isError || !user) return null;

  const menuItems = [
    { label: "OPSG Home", href: "/", icon: "bi-house" },
    { label: "Dashboard", href: "/dashboard", icon: "bi-speedometer2" },
  ];

  if (isAdmin) {
    menuItems.push({ label: "All Users", href: "/admin/search", icon: "bi-people-fill" });
  } else {
    menuItems.push(
      { label: "View Invoices", href: `/profile/invoices/${user.id}`, icon: "bi-receipt" },
      { label: "Edit Profile", href: "/user/me/updateUserProfile", icon: "bi-person-gear" }
    );
  }

  const handleLogout = () => {
    removeToken();
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className={`dash-nav-container ${isExpanded ? "expanded" : "collapsed"}`}>
      <nav className="dash-sidebar">
        {/* Toggle Button */}
        <Button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="dash-nav-toggle"
        >
          <i className={`bi ${isExpanded ? "bi-x-circle" : "bi-arrow-right-circle-fill"}`}></i>
        </Button>

        {/* Mapped Nav Items */}
        <div className="dash-nav-items">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className="dash-nav-link"
              onClick={() => {
                navigate(item.href);
                setIsExpanded(false); // Auto-close on mobile selection
              }}
            >
              <i className={`bi ${item.icon}`}></i>
              <span className="dash-link-text">{item.label}</span>
            </button>
          ))}

          {/* Logout Button */}
          <button className="dash-nav-link logout-btn" onClick={handleLogout}>
            <i className="bi bi-box-arrow-left"></i>
            <span className="dash-link-text">Log Out</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default DashboardNav;