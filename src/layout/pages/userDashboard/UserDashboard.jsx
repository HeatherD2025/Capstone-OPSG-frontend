import "../../../styles/userElements/userDashboard.css";
import UserNav from "../../../components/navigations/UserNav";
import opsgLogo from "../../../assets/img/opsg-logo.png";
import { Row, Col, Image, Container, Button } from "react-bootstrap";
import InfoCard from "../../../utils/InfoCard";
// import { useParams } from "react-router-dom";
import BusinessName from "../../../utils/qbCustomer/BusinessName";
import Balance from "../../../utils/qbCustomer/Balance";
import { useContext } from "react";
import { userContext } from "../../../components/navigations/ContextProvider";
import { useGetCurrentUserQuery } from "../../../features/api/userApi";

export default function UserDashboard() {
  // const objId = useParams();
  // const id = objId.userId;
  const { authenticated } = useContext(userContext);

  const { data: user, isLoading, isError } = useGetCurrentUserQuery(undefined, {
    skip: !authenticated, // only fetch if logged in
  });

  if (!authenticated) return <p>Please log in...</p>;
  if (isLoading) return <p>Loading user data...</p>;
  if (isError) return <p>Error loading user data</p>;
  if (!user) return null;

  console.log(user)

  return (
    <div className="dashboard-wrapper">
      <UserNav />
      <Container fluid className="dashboard-content">
        <Row>
          {/* Main Content Column */}
          <Col xl={12} lg={11} className="main-content">
            {/* Dashboard Header */}
            <Row className="header-section mb-5 align-items-end">
              <Col>
                <div className="d-flex align-items-center">
                  <Image
                    src={opsgLogo}
                    alt="OPSG Logo"
                    width={60}
                    className="me-3 logo-hover"
                  />
                  <h1 className="dashboard-title">
                    <span className="fw-bold">OnPoint</span>
                    <span className="fw-light"> User Dashboard</span>
                  </h1>
                </div>
              </Col>
            </Row>
            <Row className="mb-4">
              <Col>
                <div className="profile-card p-4">
                  <BusinessName/>

                  <Balance />

                  <InfoCard
                    variant="dark"
                    titleClass="text-success"
                    bodyClass="bg-dark"
                    text={
                      <Button
                        variant="success"
                        className="w-100"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          window.location.href =
                            "https://opsg-backend.onrender.com/qbauth/connect";
                        }}
                      >
                        Connect to Quickbooks
                      </Button>
                    }
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
