import UserNav from "../../../components/navigations/UserNav";
import UserHeader from "./UserHeader";
import InfoCard from "../../../utils/InfoCard";
import { Row, Col, Container, Button, Image } from "react-bootstrap";
import opsgLogo from "../../../assets/img/opsg-logo.png";
import BusinessName from "../../../utils/qbCustomer/BusinessName";
import Balance from "../../../utils/qbCustomer/Balance";

export default function UserDashboard() {
  return (
    <div className="admin-dashboard dark-theme">
      <UserHeader />
      <UserNav />

      <Container fluid>
        <Row className="g-0">
          {/* Content Column */}
          <Col xs={10} className="content-column">
          
            <Container>
              {/* Action Cards */}
              <Row className="g-4 mb-5 action-cards">
                <Col md={12}>
                  <BusinessName />

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
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
