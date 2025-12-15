import "../../styles/profileHeader.css";
import opsgLogo from "../../assets/img/opsg-logo.png";
import { Col, Image, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import BusinessName from "../qbComponents/BusinessName";
  
export default function ProfileHeader() {
const { isAdmin } = useSelector((state) => state.auth);

const isAdminHeader = "Admin Dashboard";
const isUserHeader = "User Dashboard";

  return (
    <div className="profileHeader">
      <Container data-bs-theme="dark" className="headerContainer">
                <Col>
                  <div className="header-section">
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
                    <div className="welcomeHeaderContainer">
                        <span className="welcome">Welcome</span>
                        <span> <BusinessName /> </span>
                    </div>
                  </div>
                </Col>
      </Container>
    </div>
  );
}
