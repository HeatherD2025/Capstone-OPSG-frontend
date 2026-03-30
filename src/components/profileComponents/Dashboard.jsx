import UserNav from "./userProfileComponents/UserNav";
import AdminNav from "./adminProfileComponents/AdminNav";
import ProfileHeader from "./ProfileHeader";
import InfoCard from "../servicesCards/InfoCard";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import BalanceCard from "../profileComponents/userProfileComponents/BalanceCard";
import { BalanceProvider } from "./BalanceProvider";
import "../../styles/dashboard.css";

export default function Dashboard() {
  const { isAdmin, user } = useSelector((state) => state.auth);

  return (
    <div className="dashboard dark-theme">
      <ProfileHeader />
      {isAdmin ? <AdminNav /> : <UserNav />}

      <Container fluid className="action-cards-container">
        {!isAdmin && user && (
          <BalanceProvider id={user?.id}>
            <InfoCard style={{ height: "10vw !important" }}>
              <BalanceCard />
            </InfoCard>
          </BalanceProvider>
        )}

        <InfoCard
          variant="dark"
          titleClass="text-success"
          bodyClass="bg-dark"
          text={
            <button
              className="w-100"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "black",
                backgroundColor: "transparent",
                height: "6rem",
                border: "none",
                fontSize: "1.25vw",
              }}
              onClick={() => {
                window.location.href =
                  "https://opsg-backend.onrender.com/qbauth/connect";
              }}
            >
              Connect to Quickbooks
            </button>
          }
        />
      </Container>
    </div>
  );
}
