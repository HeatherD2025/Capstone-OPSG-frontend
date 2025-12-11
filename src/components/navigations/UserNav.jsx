// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import { logout } from "../../slices/authSlice";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import "../../styles/userElements/userNav.css";
// import opsgLogo from "../../assets/img/opsg-logo.png";
// import { Button } from "react-bootstrap";
// import { useGetCurrentUserQuery } from "../../features/api/userApi";

// const UserNav = (props) => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [isNotActive, setNotActive] = useState(false);
//   // const [isDropdownActive, setDropdownActive] = useState("false");
//   const { userId } = useParams();
//   const { data: user, isLoading, isError } = useGetCurrentUserQuery();

//   if (isLoading) return <p>Loading user data...</p>;
//   if (isError) return <p>Error loading user data</p>;
//   if (!user) return null;

//   var arrowRight = <i className="bi bi-arrow-right-circle-fill"></i>;
//   var crossIcon = <i className="bi bi-x-circle"></i>;

//   const handleLogout = () => {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     dispatch(logout()); // resets redux auth state
//     navigate("/");
//   };

//   return (
//     <div>
//       <div
//         className="wrapper"
//         style={{
//           backgroundColor: "white",
//         }}
//       >
//         <nav id="sidebar" className={isNotActive ? "active" : ""}>
//           <button
//             type="button"
//             id="sidebarCollapse"
//             onClick={() => setNotActive(!isNotActive)}
//             className="btn btn-custom2"
//           >
//             <span className={isNotActive ? "" : "hidden"}>{arrowRight}</span>
//             <span className={isNotActive ? "hidden" : ""}>{crossIcon}</span>
//           </button>

//           <div className="sidebar-header2">
//             <div
//               className="navLogoWrapper"
//               style={{
//                 display: "flex",
//                 marginLeft: ".5vw",
//                 fontWeight: "200",
//                 fontSize: "clamp(12px, 3vw, 20px)",
//                 flexDirection: "column",
//                 flexWrap: "wrap",
//                 alignItems: "center",
//               }}
//             >
//               <img
//                 src={opsgLogo}
//                 alt="OPSG logo"
//                 className="rounded-circle usr-image2 nav navbar-nav"
//                 height={isNotActive ? "0" : "80"}
//                 width={isNotActive ? "0" : "80"}
//                 // style={{width: "clamp(35px, 1vw, 10px)", height: "clamp(35px, 1vw, 10px)"}}
//               ></img>
//               <h4
//                 className="onPointLogoText"
//                 style={{ color: "black", fontWeight: "200" }}
//               >
//                 OnPoint
//               </h4>
//             </div>
//           </div>

//           {/* <div className="sidebar-header2">
//             <img
//               src={opsgLogo}
//               className="rounded-circle usr-image"
//               height={isNotActive ? "20" : "70"}
//               width={isNotActive ? "20" : "70"}
//             ></img>
//             <h3 className="onPointLogoText">OnPoint</h3>
//           </div> */}

//           <ul className="list-unstyled components">
//             <li className="list-item">
//               <Button
//                 onClick={() => navigate("/")}
//                 variant="link"
//                 className="icon-btn"
//               >
//                 <i className="bi bi-house"></i>
//               </Button>
//               <Link
//                 to="/"
//                 style={{
//                   color: "black",
//                   fontWeight: "200",
//                   fontSize: "clamp(1px, 5vw, 16px)",
//                 }}
//               >
//                 HOME
//               </Link>
//             </li>
//             <li className="list-item">
//               <Button
//                 onClick={() => navigate(`/profile/invoices/${user.id}`)}
//                 variant="link"
//                 className="icon-btn"
//               >
//                 <i className="bi bi-people-fill"></i>
//               </Button>
//               <Link
//                 to={`/profile/invoices/${user.id}`}
//                 style={{
//                   color: "black",
//                   fontWeight: "200",
//                   fontSize: "clamp(12px, 4.5vw, 16px)",
//                 }}
//               >
//                 INVOICES
//               </Link>
//             </li>
//             <li className="list-item-unstyled">
//               <Button
//                 onClick={() => navigate(`/profile/${userId}`)}
//                 variant="link"
//                 className="icon-btn"
//               >
//                 <i className="bi bi-gear"></i>
//               </Button>
//               <Link
//                 to={`/user/me/updateUserProfile`}
//                 style={{
//                   color: "black",
//                   fontWeight: "200",
//                   fontSize: "clamp(12px, 8vw, 16px)",
//                 }}
//               >
//                 EDIT PROFILE
//               </Link>
//             </li>
//             <li className="list-item">
//               <Button
//                 onClick={handleLogout}
//                 variant="link"
//                 className="icon-btn"
//               >
//                 <i className="bi bi-box-arrow-left"></i>
//               </Button>
//               <Link
//                 to="/"
//                 onClick={handleLogout}
//                 style={{
//                   color: "black",
//                   fontWeight: "200",
//                   fontSize: "clamp(12px, 8vw, 16px)",
//                 }}
//               >
//                 LOG OUT
//               </Link>
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default UserNav;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import "../../styles/dashboardNav.css";
import { removeToken } from "../../utils/tokenService";
import { useGetCurrentUserQuery } from "../../features/api/userApi";

const UserNav = (props) => {
  const [isNotActive, setNotActive] = useState(false);
  // const [isDropdownActive, setDropdownActive] = useState("false");
  const { data: user, isLoading, isError } = useGetCurrentUserQuery();

  if (isLoading) return <p>Loading user data...</p>;
  if (isError) return <p>Error loading user data</p>;
  if (!user) return null;

  var arrowRight = <i className="bi bi-arrow-right-circle-fill"></i>;
  var crossIcon = <i className="bi bi-x-circle"></i>;

  // const handleLogout = () => {
  //   localStorage.removeItem("accessToken");
  //   localStorage.removeItem("refreshToken");
  //   dispatch(logout()); // resets redux auth state
  //   navigate("/");
  // };

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

          {/* <div className="sidebar-header">
            <img
              src={opsgLogo}
              alt="OPSG logo"
              height={isNotActive ? "20" : "70"}
              width={isNotActive ? "20" : "70"}
            ></img>
            <h3>OnPoint</h3>
          </div> */}

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
export default UserNav;
