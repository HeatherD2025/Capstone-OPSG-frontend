import UserNav from "./userProfileComponents/UserNav";
import AdminNav from "./adminProfileComponents/AdminNav";
import ProfileHeader from "./ProfileHeader";
// import InfoCard from "../servicesCards/InfoCard";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import Balance from "../qbComponentsAndHooks/Balance";
// import { BalanceProvider } from "./BalanceProvider";
import DashTabs from "./DashTabs";
import "../../styles/dashboard.css";

export default function Dashboard() {
  const { isAdmin, user } = useSelector((state) => state.auth);
  // const navigate = useNavigate();

  return (
    <div className="dashboard dark-theme">
      <ProfileHeader />
      {isAdmin ? <AdminNav /> : <UserNav />}
        <DashTabs />
    </div>
  );
}
