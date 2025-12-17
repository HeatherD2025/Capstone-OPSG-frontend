// import "../../../styles/userElements/userDashboard.css";
// import UserNav from "../../../components/navigations/UserNav";
// import opsgLogo from "../../../assets/img/opsg-logo.png";
// import InfoCard from "../../../utils/InfoCard";
// import { Row, Col, Image, Container } from "react-bootstrap";
// import Balance from "../../../utils/qbCustomer/Balance";
// import FullName from "../../../utils/qbCustomer/FullName";

// export default function UserInvoice() {
//   const objId = useParams();
//   const id = objId.userId;

//   return (
//     <div className="dashboard-wrapper">
//       <UserNav />
//       <Container fluid className="dashboard-content">
//         <Row className="justify-content-center">
//           {/* Main Content Column */}
//           <Col xl={10} lg={11} className="main-content">
//             {/* Dashboard Header */}
//             <Row className="header-section mb-5 align-items-end">
//               <Col>
//                 <div className="d-flex align-items-center">
//                   <Image
//                     src={opsgLogo}
//                     alt="OPSG Logo"
//                     width={60}
//                     className="me-3 logo-hover"
//                   />
//                   <h1 className="dashboard-title">
//                     <span className="fw-bold">OnPoint</span>
//                     <span className="fw-light"> User Dashboard</span>
//                   </h1>
//                 </div>
//               </Col>
//             </Row>
//             <Row className="mb-4">
//               <Col>
//                 <div className="profile-card p-4">
//                   <FullName bg="primary" id={id} />
//                 </div>
//               </Col>
//               <Col>
//                 <div className="profile-card p-4">
//                   <Balance bg="primary" id={id} />
//                 </div>
//               </Col>
//             </Row>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// }

// TEST CODE

import ProfileHeader from "../ProfileHeader.jsx";
import UserNav from "../../navigations/UserNav.jsx";
import "../../../styles/userElements/userDashboard.css";
import { Row, Col, Container } from "react-bootstrap";
import Balance from "../../qbComponentsAndHooks/Balance.jsx";
import { useGetCurrentUserQuery } from "../../../features/api/userApi";
import useBusinessName from "../../qbComponentsAndHooks/useBusinessName.js";
import { useContext } from "react";
import { userContext } from "../../navigations/ContextProvider";
// import { faker } from "@faker-js/faker";

export default function UserInvoice() {
  const { authenticated } = useContext(userContext);
  const { company, isLoading, error } = useBusinessName();

  // const demoInvoice = faker.finance.amount({
  //   min: 150,
  //   max: 5450,
  //   dec: 5,
  //   symbol: "$",
  // });

  // only fires if authenticated
  // const { data, isLoading, error } = useGetCurrentUserQuery(undefined, {
  //   skip: !authenticated,
  // });

  // if (!authenticated) return <p>Please log in...</p>;
  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>Error loading user data</p>;
  // if (!authenticated && !user) return <p>{`${demoInvoice}`}</p>;

  return (
    <>
      <div className="dashboard-wrapper">
        <ProfileHeader />
        <UserNav />
      </div>
      <div className="card">
        <div className="card-header bg-black"></div>
        <div className="card-body">
          <div className="container">
            <div className="row">
              <div className="col-xl-12">
                <i className="far fa-building text-danger fa-6x float-start"></i>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-12">
                <ul className="list-unstyled float-end">
                  <li
                    style={{
                      fontSize: "30px",
                      color: "red",
                    }}
                  >
                    {company.name}
                  </li>
                  <li>{company.streetAddress}</li>
                  <li>{company.phoneNumber}</li>
                  <li>{company.email}</li>
                </ul>
              </div>
            </div>

            <div className="row text-center">
              <h3
                className="text-uppercase text-center mt-3"
                style={{ fontSize: "40px" }}
              >
                Invoice
              </h3>
              <p>123456789</p>
            </div>

            <div className="row mx-3">
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Description</th>
                    <th scope="col">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>ASC </td>
                    <td>
                      <i className="fas fa-dollar-sign"></i> 500,00
                    </td>
                  </tr>
                  <tr>
                    <td>JBL Speaker</td>
                    <td>
                      <i className="fas fa-dollar-sign"></i> 300,00
                    </td>
                  </tr>
                  <tr>
                    <td>Macbook Air</td>
                    <td>
                      <i className="fas fa-dollar-sign"></i> 1000,00
                    </td>
                  </tr>
                  <tr>
                    <td>Iphone 11 PRO</td>
                    <td>
                      <i className="fas fa-dollar-sign"></i> 5000,00
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="row">
              <div className="col-xl-8">
                <ul className="list-unstyled float-end me-0">
                  <li>
                    <span className="me-3 float-start">Total Amount:</span>
                    <i className="fas fa-dollar-sign"></i> 6850,00
                  </li>
                  <li>
                    {" "}
                    <span className="me-5">Discount:</span>
                    <i className="fas fa-dollar-sign"></i> 500,00
                  </li>
                  <li>
                    <span
                      className="float-start"
                      style={{ marginRight: "35px" }}
                    >
                      Shippment:{" "}
                    </span>
                    <i className="fas fa-dollar-sign"></i> 500,00
                  </li>
                </ul>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-8" style={{ marginLeft: "60px" }}>
                <p
                  className="float-end"
                  style={{
                    fontSize: "30px",
                    color: "red",
                    fontWeight: "400",
                    fontFamily: "Arial, Helvetica, sans-serif",
                  }}
                >
                  Total:
                  <span>
                    <i className="fas fa-dollar-sign"></i> 6350,00
                  </span>
                </p>
              </div>
            </div>

            <div className="row mt-2 mb-5">
              <p className="fw-bold">
                Date: <span className="text-muted">23 June 20221</span>
              </p>
              <p className="fw-bold mt-3">Signature:</p>
            </div>
          </div>
        </div>
        <div className="card-footer bg-black"></div>
      </div>
    </>
  );
}
