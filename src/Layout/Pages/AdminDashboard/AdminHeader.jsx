import "./adminHeader.css";
import opsgLogo from "../../../assets/img/opsg-logo.png";

import { Row, Col, Image, Container } from "react-bootstrap";
import AdminNav from "../../../Features/Navigations/Navbars/AdminNav";

export default function AdminHeader() {
  return (
    <div className="page">
      <AdminNav />
      <Container data-bs-theme="dark">
        <Row className="justify-content-md-center">
          <Col xs={1} md={4}>
            <Image src={opsgLogo} roundedCircle className="small-image" />
          </Col>
          <Col className="display-5 mt-4" md="auto">
            OnPoint Admin View
          </Col>
        </Row>
        <Row className="justify-content-md-center mt-4"></Row>
      </Container>
    </div>
  );
}
