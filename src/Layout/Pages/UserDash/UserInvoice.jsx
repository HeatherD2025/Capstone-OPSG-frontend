import "./userDashboard.css";
import { UserNav } from "../../../Features/Navigations/Navbars/UserNav";
import opsgLogo from "../../../assets/img/opsg-logo.png";
import InfoCard from "../../../utils/InfoCard";
import { Row, Col, Image, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Balance from "../../../utils/qbCustomer/Balance";
import FullName from "../../../utils/qbCustomer/FullName";

export default function UserInvoice() {
  const objId = useParams();
  const id = objId.userId;

  return (
    <div className="dashboard-wrapper">
      <UserNav />
      <Container fluid className="dashboard-content">
        <Row className="justify-content-center">
          {/* Main Content Column */}
          <Col xl={10} lg={11} className="main-content">
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
                  <FullName bg="primary" id={id} />
                </div>
              </Col>
              <Col>
                <div className="profile-card p-4">
                  <Balance bg="primary" id={id} />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
