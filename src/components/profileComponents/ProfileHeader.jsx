import "../../styles/profileHeader.css";
import opsgLogo from "../../assets/images/opsg-logo.webp";
import { Image, Container } from "react-bootstrap";
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

  const {
    company,
    isLoading: companyLoading,
    error: companyError,
  } = useCompanyName();

  const headerText = isAdmin ? "Admin Dashboard" : "User Dashboard";
  const companyNameCalled = isAdmin? " " : (company?.name || "");
  const displayName = user?.isAdmin ? "Demo Admin" : `${user?.firstName} ${user?.lastName}`;

  if (userLoading) return <p>Loading user data</p>;
  if (userError) return <p>Failed to load user data</p>;
  if (!user) return <p>No user found</p>;

  if (companyLoading) return (
      <div className="profile-header">
        <Container className="header-container text-center">
          <p>Loading company info...</p>
        </Container>
      </div>
  );

  if (companyError) return(
    <div className="profile-header">
        <Container className="header-container text-center">
          <p>Failed to load company info</p>
        </Container>
      </div>
  );

  return (
    <div className="profile-header">
      <Container data-bs-theme="dark" className="header-container">
              <Image src={opsgLogo} alt="OPSG Logo" className="opsg-header-logo" />
              <span className="opsg-header-text-container">
                <p className="opsg-header-text">OnPoint {headerText}</p>
              </span>

              <div className="welcome-header-container">
                <span className="welcome-header">
                  <p>
                    Welcome, {displayName}!
                  </p>
                  {company ? (
                    <p>{companyNameCalled}</p> 
                  ) : (
                    <p>No company found</p>
                  )}
                </span>
              </div>
      </Container>
    </div>
  );
}
