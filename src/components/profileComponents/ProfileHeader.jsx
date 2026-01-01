import "../../styles/profileHeader.css";
import opsgLogo from "../../assets/img/opsg-logo.png";
import { Col, Image, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useGetCurrentUserQuery } from "../../features/api/userApi";
import useCompanyName from "../qbComponentsAndHooks/useCompanyName";

export default function ProfileHeader() {
  // fetching logged in user
  const {
    data: user,
    isLoading: userLoading,
    isError: userError,
  } = useGetCurrentUserQuery();

  const { isAdmin } = useSelector((state) => state.auth);
  const headerText = isAdmin ? "Admin Dashboard" : "User Dashboard";

  if (userLoading) return <p>Loading user data</p>;
  if (userError) return <p>Failed to load user data</p>;
  if (!user) return <p>No user found</p>;

  const {
    company,
    isLoading: companyLoading,
    error: companyError,
  } = useCompanyName(user);

  if (companyLoading) return (
      <div className="profileHeader">
        <Container className="headerContainer text-center">
          <Spinner animation="border" />
          <p>Loading company info...</p>
        </Container>
      </div>
  );

  if (companyError) return(
    <div className="profileHeader">
        <Container className="headerContainer text-center">
          <p>Failed to load company info</p>
        </Container>
      </div>
  );

  return (
    <div className="profileHeader">
      <Container data-bs-theme="dark" className="headerContainer">
        <Col>
          <div className="header-section">
            <Image src={opsgLogo} alt="OPSG Logo" className="opsgLogo" />
            <span className="opsgHeaderText">OnPoint</span>
            <p className="welcomeHeader">{headerText}</p>

            <div className="welcomeHeaderContainer">
              <span>
                <p>
                  Welcome {user.firstName} {user.lastName}!
                </p>
                {company ? (
                  <p>{company.name}</p> 
                ) : (
                  <p>No company found</p>
                )}
              </span>
            </div>
          </div>
        </Col>
      </Container>
    </div>
  );
}
