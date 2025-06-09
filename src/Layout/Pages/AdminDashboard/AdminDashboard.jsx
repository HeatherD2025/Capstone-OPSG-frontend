import "./adminDashboard.css";
import AdminNav from "../../../Features/Navigations/Navbars/AdminNav";
import InfoCard from "../../../utils/InfoCard";
import opsgLogo from "../../../assets/img/opsg-logo.png";
import { Row, Col, Container, Button, Image } from "react-bootstrap";

export default function AdminPage() {
  return (
    <div className="admin-dashboard dark-theme">
      <Container fluid>
        <Row className="g-0">
          {/* Navigation Column */}
          <Col xs={2} className="nav-column">
            <AdminNav />
          </Col>

          {/* Content Column */}
          <Col xs={10} className="content-column">
            <Container>
              {/* Header */}
              <Row className="mb-5">
                <Col>
                  <div className="d-flex align-items-center">
                    <Image
                      src={opsgLogo}
                      alt="OPSG Logo"
                      width={60}
                      className="me-3 logo-hover"
                    />
                    <h1 className="admin-title">
                      <span className="text-gradient">OnPoint</span> Admin
                      Dashboard
                    </h1>
                  </div>
                </Col>
              </Row>

              {/* Action Cards */}
              <Row className="g-4 mb-5">
                <Col md={6}>
                  <InfoCard
                    variant="dark"
                    title="Connect to QuickBooks"
                    titleClass="text-success"
                    bodyClass="bg-dark"
                    text={
                      <Button
                        variant="success"
                        className="w-100"
                        onClick={() => {
                          window.location.href =
                            "https://opsg-backend.onrender.com/qbauth/connect";
                        }}
                      >
                        Connect
                      </Button>
                    }
                  />
                </Col>
                <Col md={6}>
                  <InfoCard
                    variant="dark"
                    title="Disconnect from QuickBooks"
                    titleClass="text-danger"
                    bodyClass="bg-dark"
                    text={
                      <Button
                        variant="outline-danger"
                        className="w-100"
                        onClick={() => {
                          window.location.href =
                            "https://opsg-backend.onrender.com/qbauth/connect";
                        }}
                      >
                        Disconnect
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
