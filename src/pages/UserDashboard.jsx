import UserNav from "../components/navigations/UserNav";
import ProfileHeader from "../components/profileComponents/ProfileHeader";
import InfoCard from "../components/servicesCards/InfoCard";
import { Row, Col, Container, Button } from "react-bootstrap";
import Balance from "../components/qbComponentsAndHooks/Balance";
import "../styles/userElements/userDashboard.css";

export default function UserDashboard() {
  return (
    <div className="admin-dashboard dark-theme">
      {/* <UserHeader /> */}
      <ProfileHeader />
      <UserNav />

      <Container fluid className="action-cards-container">
        <Row className="g-0">
          {/* Content Column */}
          <Col xs={10} className="content-column">
            <Container>
              {/* Action Cards */}
              <Row className="g-4 mb-5 action-cards">
                <Col md={12}>
                  {/* CHECK IF THIS CARD STYLING BELOW WORKS
                  className="home-page-cards" */}
                <div className="action-cards">
                  <InfoCard className="action-cards">
                    <Balance />
                  </InfoCard>
                </div>

                <div className="action-cards">
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
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
