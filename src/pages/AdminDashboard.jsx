import AdminNav from "../components/navigations/AdminNav";
import "../styles/profileHeader.css";
import ProfileHeader from "../components/profileComponents/ProfileHeader";
// import AdminHeader from "../components/profileComponents/adminProfileComponents/AdminHeader";
import InfoCard from "../components/servicesCards/InfoCard";
import { Row, Col, Container, Button, Image } from "react-bootstrap";

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard dark-theme">
      {/* <AdminHeader /> */}
      <ProfileHeader />
      <AdminNav />

      <Container fluid>
        <Row className="g-0">
          {/* Content Column */}
          <Col xs={10} className="content-column">
            <Container>
              {/* Action Cards */}
              <Row className="g-4 mb-5 action-cards">
                <Col md={6}>
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
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
