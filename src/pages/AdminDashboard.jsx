import AdminNav from "../components/navigations/AdminNav";
import "../styles/dashboardNav.css";
import ProfileHeader from "../components/profileComponents/ProfileHeader";
import InfoCard from "../components/servicesCards/InfoCard";
import { Row, Col, Container, Button, Image } from "react-bootstrap";

export default function AdminDashboard() {
  return (
    <div className="admin-dashboard dark-theme">
      <ProfileHeader />
       <AdminNav />

      <Container fluid>
                <Col md={6}>
                  <InfoCard
                  // CHECK IF THIS CARD STYLING BELOW WORKS
                    // className="home-page-cards"
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
