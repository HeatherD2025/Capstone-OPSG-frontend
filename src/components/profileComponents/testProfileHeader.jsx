import "../../styles/profileHeader.css";
import opsgLogo from "../../assets/img/opsg-logo.png";
import { Col, Image, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import useBusinessName from "../qbComponentsAndHooks/useBusinessName";
import useBalance from "../qbComponentsAndHooks/Balance";

export default function ProfileHeader() {
  const { balance } = useBalance();
  const { company, isLoading, error } = useBusinessName();
  const { isAdmin } = useSelector((state) => state.auth);

  if (isLoading) return <p>Loading company info...</p>;
  if (error) return <p>Failed to load company info</p>;

  const headerText = isAdmin ? "Admin Dashboard" : "User Dashboard";

  return (
    <div className="profileHeader">
      <Container data-bs-theme="dark" className="headerContainer">
        <Col>
          <div className="header-section">
            <Image src={opsgLogo} alt="OPSG Logo" className="opsgLogo" />
            <span className="opsgHeaderText">OnPoint</span>
            <p className="welcomeHeader">{headerText}</p>

            <div className="welcomeHeaderContainer">
              <span className="welcome">Welcome</span>
              <span>
                <p>{company.name}</p>
                <p>{balance}</p>
              </span>
            </div>
          </div>
        </Col>
      </Container>
    </div>
  );
}
