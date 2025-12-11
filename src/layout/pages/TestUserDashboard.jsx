// import TestUserNav from "../../components/navigations/TestUserNav";
// import InfoCard from "../../utils/InfoCard";
// import opsgLogo from "../../assets/img/opsg-logo.png";
// import { Row, Col, Container, Button, Image } from "react-bootstrap";
// import BusinessName from "../../utils/qbCustomer/BusinessName";
// import Balance from "../../utils/qbCustomer/Balance";
// import "../../styles/testUserDashboard.css";

// export default function TestUserDashboard() {
//   return (
//     <div className="admin-dashboard dark-theme">
//       <Container fluid>
//         <Row className="g-0">
//           {/* Navigation Column */}
//           <Col xs={2} className="nav-column">
//             <TestUserNav />
//           </Col>

//           {/* Content Column */}
//           <Col xs={10} className="content-column">
//             <Container>
//               {/* Header */}
//               <Row className="mb-5">
//                 <Col>
//                   <div className="d-flex align-items-center">
//                     <Image
//                       src={opsgLogo}
//                       alt="OPSG Logo"
//                       width={60}
//                       className="me-3 logo-hover"
//                     />
//                     <h1 className="user-title">
//                       <span className="text-gradient">OnPoint</span> User
//                       Dashboard
//                     </h1>
//                   </div>
//                 </Col>
//               </Row>

//               {/* Action Cards */}
//               <Row className="g-4 mb-5">
//                 <Col md={12}>

//                   <BusinessName/>

//                   <Balance />

//                   <InfoCard
//                     variant="dark"
//                     titleClass="text-success"
//                     bodyClass="bg-dark"
//                     text={
//                       <Button
//                         variant="success"
//                         className="w-100"
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         onClick={() => {
//                           window.location.href =
//                             "https://opsg-backend.onrender.com/qbauth/connect";
//                         }}
//                       >
//                         Connect to Quickbooks
//                       </Button>
//                     }
//                   />
//                 </Col>

//               </Row>
//             </Container>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// }
