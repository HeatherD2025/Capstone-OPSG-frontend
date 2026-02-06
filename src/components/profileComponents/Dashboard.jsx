import UserNav from "../navigations/UserNav";
import AdminNav from "../navigations/AdminNav";
import ProfileHeader from "./ProfileHeader";
import InfoCard from "../servicesCards/InfoCard";
import { Container, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Balance from "../qbComponentsAndHooks/Balance";
// import "../styles/userElements/userDashboard.css";

export default function Dashboard() {
  const { isAdmin, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const { data: currentUser, isLoading, isError } = useGetCurrentUserQuery();

  return (
    <div className="admin-dashboard dark-theme">
      {/* <UserHeader /> */}
      <ProfileHeader />

      {isAdmin ? <AdminNav /> : <UserNav />}

      <Container fluid className="action-cards-container">
        {isAdmin ? (
          ""
        ) : (
          <InfoCard
            className="action-cards"
            text={
              <Button
                rel="noopener noreferrer"
                style={{
                  opacity: "0%",
                  height: "100%",
                  width: "100%",
                }}
                onClick={() => navigate(`/profile/invoices/${currentUser.id}`)}
              ></Button>
            }
          >
            <Balance></Balance>
          </InfoCard>
        )}
        <InfoCard
          variant="dark"
          titleClass="text-success"
          bodyClass="bg-dark"
          text={
            <Button
              variant="success"
              className="w-100"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                window.location.href =
                  "https://opsg-backend.onrender.com/qbauth/connect";
              }}
            >
              Connect to Quickbooks
            </Button>
          }
        />
      </Container>
    </div>
  );
}
