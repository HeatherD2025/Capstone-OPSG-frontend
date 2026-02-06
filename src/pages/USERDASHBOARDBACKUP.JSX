import UserNav from "../components/navigations/UserNav";
import ProfileHeader from "../components/profileComponents/ProfileHeader";
import InfoCard from "../components/servicesCards/InfoCard";
import { Container, Button } from "react-bootstrap";
import Balance from "../components/qbComponentsAndHooks/Balance";
import "../styles/userElements/userDashboard.css";

export default function UserDashboard() {
  return (
    <div className="admin-dashboard dark-theme">
      {/* <UserHeader /> */}
      <ProfileHeader />
      <UserNav />

      <Container fluid className="action-cards-container">
            <InfoCard 
              className="action-cards"
              text={
                <Button
                  rel="noopener noreferrer" 
                  onClick={() => {
                    href=`/profile/invoices/${user.id}`
                  }}>
                </Button>}>
              <Balance> 
              </Balance>
            </InfoCard>

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
