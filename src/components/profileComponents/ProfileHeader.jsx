import "../../styles/profileHeader.css";
import opsgLogo from "../../assets/img/opsg-logo.png";
import { Row, Col, Image, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
  
export default function ProfileHeader() {
const { isAuthenticated, isAdmin } = useSelector((state) => state.auth);
const { user } = useSelector((state) => state.auth);

const isAdminHeader = "Admin Dashboard";
const isUserHeader = "User Dashboard";

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
                    <span className="opsgHeaderText">OnPoint</span>
                    
                    {isAdmin ? (
                    <p className="welcomeHeader">{isAdminHeader}</p>
                    ) : ( 
                    <p className="welcomeHeader">{isUserHeader}</p>
                    )}
                  </div>
                </Col>
              </Row>
      </Container>
    </div>
  );
}
