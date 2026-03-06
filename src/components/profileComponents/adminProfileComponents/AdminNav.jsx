import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../../../styles/dashboardNav.css";
import { removeToken } from "../../../utils/tokenService";

const AdminNav = (props) => {
  const [isNotActive, setNotActive] = useState(false);
  var arrowRight = <i className="bi bi-arrow-right-circle-fill"></i>;
  var crossIcon = <i className="bi bi-x-circle"></i>;
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    // strip hash symbol from location to match id
    const id = location.hash.replace("#", "");
    const el = document.getElementById(id);

    // scroll logic
    if (id && el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      scrollToTop();
    }

    // clean url
    const currentUrl = window.location.pathname; // the current path
    const cleanedUrl = currentUrl
      .replace("/", "")
      .replace("/dashboard", "")
      .replace("/admin", "")

    // normalize trailing slash
    const baseUrl = cleanedUrl.endsWith("/") ? cleanedUrl : cleanedUrl + "/";

    // update url without relooading the page only if url is different
    if (window.location.href !== baseUrl)
      window.history.replaceState(null, "", baseUrl);
  }, [location]); //re-run this on navigation change

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
