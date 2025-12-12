import "../../../styles/userElements/userHeader.css";

import opsgLogo from "../../../assets/img/opsg-logo.png";
import { Row, Col, Image, Container } from "react-bootstrap";
import { useGetCurrentUserQuery } from "../../../features/api/userApi";

export default function UserHeader() {
  const { data: user, isLoading, isError } = useGetCurrentUserQuery();
  // const id = user?.id;

  if (isLoading) return <p>Loading user header...</p>;
  if (isError) return <p>Error loading user data.</p>;
  if (!user) return null;
  // const objId = useParams();
  // const id = objId.userId;
  console.log("UserHeader loaded with userId:", user.id);

  return (
    // <div className="dashboard-wrapper">
    //   <UserNav />
    //   <Container fluid className="dashboard-content">
    //     <Row className="justify-content-center">
    //       {/* Main Content Column */}
    //       <Col xl={10} lg={11} className="main-content">
    //         {/* Dashboard Header */}
    //         <Row className="header-section mb-5 align-items-end">
    //           <Col>
    //             <div className="d-flex align-items-center">
    //               <Image
    //                 src={opsgLogo}
    //                 alt="OPSG Logo"
    //                 width={60}
    //                 className="me-3 logo-hover"
    //               />
    //               <h1 className="dashboard-title">
    //                 <span className="fw-bold">OnPoint</span>
    //                 <span className="fw-light"> User Dashboard</span>
    //               </h1>
    //             </div>
    //           </Col>
    //         </Row>
    //       </Col>
    //     </Row>
    //   </Container>
    // </div>
        <div className="page">
      {/* <UserNav /> */}
      <Container data-bs-theme="dark">
         <Row className="mb-5">
                <Col>
                  <div className="d-flex align-items-center header-section">
                    <Image
                      src={opsgLogo}
                      alt="OPSG Logo"
                      className="opsgLogo"
                    />
                    <h1 className="user-title">
                      <span className="text-gradient">OnPoint</span> User
                      Dashboard
                    </h1>
                  </div>
                </Col>
              </Row>
      </Container>
    </div>
  );
}
