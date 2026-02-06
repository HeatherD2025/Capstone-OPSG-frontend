import opsgLogo from "../assets/images/opsg-logo.webp";
import { Row, Col, Container } from "react-bootstrap";
import phone from "../assets/images/phone.webp";
import fax from "../assets/images/fax.webp";
import "../styles/app.css";

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="align-items-center">
          <Col
            xs={12}
            md={5}
            className="text-center text-md-start mb-3 mb-md-0"
          >
            <p>
              M. Michelle Zachary, CPCS, CPMSM
              <br />
              <a
                href="mailto:szachary@onpointsolutionsgroup.org"
                className="footer-email-link"
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
              alt="OPSG logo"
              className="opsg-logo"
            />
          </Col>

          <Col xs={12} md={5} className="text-center text-md-end">
            <p>
              M. Catherine Cutrone, CPCS
              <br />
              <a
                href="mailto:ccutrone@onpointsolutionsgroup.org"
                className="footer-email-link"
              >
                ccutrone@onpointsolutionsgroup.org
              </a>
            </p>
          </Col>
        </Row>

        <div className="btm-footer-text-box">
          <Row className="justify-content-center">
            <Col xs={12} sm={6} className="text-center mb-2 mb-sm-0">
              <div className="d-flex justify-content-center align-items-center">
                <img
                  src={phone}
                  alt="Phone"
                  className="footer-contact-icons"
                />
                <span>(970) 394-5560</span>
              </div>
            </Col>
            <Col xs={12} sm={6} className="text-center">
              <div className="d-flex justify-content-center align-items-center">
                <img
                  src={fax}
                  alt="Fax"
                  className="footer-contact-icons"
                />
                <span>(970) 317-2233</span>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
