import opsgLogo from "../assets/img/opsg-logo.png";
import { Row, Col, Container } from "react-bootstrap";
import phone from "../assets/img/phone.png";
import fax from "../assets/img/fax.png";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#558e89",
        padding: "10px 0 25px 0",
        width: "100%",
        zIndex: 100, // just to make sure
      }}
    >
      <Container>
        <Row className="align-items-center">
          <Col
            xs={12}
            md={5}
            className="text-center text-md-start mb-3 mb-md-0"
          >
            <p style={{ margin: 0, padding: "15px 0", fontSize: "0.9rem" }}>
              M. Michelle Zachary, CPCS, CPMSM
              <br />
              <a
                href="mailto:szachary@onpointsolutionsgroup.org"
                style={{
                  color: "black",
                  textDecoration: "none",
                  fontSize: "0.8rem",
                }}
              >
                szachary@onpointsolutionsgroup.org
              </a>
            </p>
          </Col>

          <Col
            xs={12}
            md={2}
            className="d-flex justify-content-center mb-3 mb-md-0"
          >
            <img
              src={opsgLogo}
              alt="Logo"
              style={{
                width: "60px",
                height: "auto",
              }}
            />
          </Col>

          <Col xs={12} md={5} className="text-center text-md-end">
            <p style={{ margin: 0, padding: "15px 0", fontSize: "0.9rem" }}>
              M. Catherine Cutrone, CPCS
              <br />
              <a
                href="mailto:ccutrone@onpointsolutionsgroup.org"
                style={{
                  color: "black",
                  textDecoration: "none",
                  fontSize: "0.8rem",
                }}
              >
                ccutrone@onpointsolutionsgroup.org
              </a>
            </p>
          </Col>
        </Row>

        <div className="btmFooterTextBox">
          <Row className="justify-content-center">
            <Col xs={12} sm={6} className="text-center mb-2 mb-sm-0">
              <div className="d-flex justify-content-center align-items-center">
                <img
                  src={phone}
                  alt="Phone"
                  style={{ width: "20px", height: "20px", marginRight: "8px" }}
                />
                <span style={{ fontSize: "0.9rem" }}>(970) 394-5560</span>
              </div>
            </Col>
            <Col xs={12} sm={6} className="text-center">
              <div className="d-flex justify-content-center align-items-center">
                <img
                  src={fax}
                  alt="Fax"
                  style={{ width: "20px", height: "20px", marginRight: "8px" }}
                />
                <span style={{ fontSize: "0.9rem" }}>(970) 317-2233</span>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
