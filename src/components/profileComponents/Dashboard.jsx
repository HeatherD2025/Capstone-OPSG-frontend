import DashboardNav from "./DashboardNav";
import ProfileHeader from "./ProfileHeader";
import DashboardCard from "../servicesCards/DashboardCard";
import { useSelector } from "react-redux";
import BalanceCard from "../profileComponents/userProfileComponents/BalanceCard";
import { BalanceProvider } from "./BalanceProvider";
import "../../styles/dashboard.css";

export default function Dashboard() {
  const { isAdmin, user } = useSelector((state) => state.auth);

  return (
    <div className="dashboard dark-theme">
      <DashboardNav />

      <div className="dashboard-content-area">
        <ProfileHeader />
        
        <div className="dashboard-cards-container">
            <DashboardCard
              variant="dark"
              titleClass="text-success"
              bodyClass="bg-dark"
              text={
                <button
                  className="qb-connect-button"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    window.location.href =
                      "https://opsg-backend.onrender.com/qbauth/connect";
                  }}
                >
                  Connect to Quickbooks
                </button>
              }
            />

            {!isAdmin && user && (
              <BalanceProvider id={user?.id}>
                <DashboardCard>
                  <BalanceCard />
                </DashboardCard>
              </BalanceProvider>
            )}
        </div>
      </div>
    </div>
  );
}
