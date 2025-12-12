import "../../../styles/adminElements/adminHeader.css";
import opsgLogo from "../../../assets/img/opsg-logo.png";
import { Row, Col, Image, Container } from "react-bootstrap";

export default function AdminHeader() {
  return (
    <div className="page">
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
                      <span className="text-gradient">OnPoint</span> Admin
                      Dashboard
                    </h1>
                  </div>
                </Col>
              </Row>
      </Container>
    </div>
  );
}
