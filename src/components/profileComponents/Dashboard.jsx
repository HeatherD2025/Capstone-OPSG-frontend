import React from "react";
import UserNav from "./userProfileComponents/UserNav";
import AdminNav from "./adminProfileComponents/AdminNav";
import ProfileHeader from "./ProfileHeader";
import InfoCard from "../servicesCards/InfoCard";
import { useGetCurrentUserQuery } from "../../features/api/userApi";
import { Container, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Balance from "../qbComponentsAndHooks/Balance";
import { BalanceProvider } from "./BalanceProvider";
import "../../styles/dashboard.css";

export default function Dashboard() {
  const { isAdmin, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const { data: currentUser, isLoading, isError } = useGetCurrentUserQuery();

  if (isLoading) return <p>Loading dashboard...</p>;
  if (isError) return <p>Error loading dashboard.</p>;

  return (
    <div className="dashboard dark-theme">
      <ProfileHeader />

      {isAdmin ? <AdminNav /> : <UserNav />}

    <BalanceProvider id={currentUser?.id}>
      <Container fluid className="action-cards-container">
        {!isAdmin && currentUser && (
          <InfoCard>
            <Balance
              text={
                <button
                  rel="noopener noreferrer"
                  style={{
                    opacity: "0%",
                    height: "100%",
                    width: "100%",
                  }}
                  onClick={() =>
                    navigate(`/profile/invoices/${currentUser.id}`)
                  }
                />
              }
            />
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
     </BalanceProvider>
    </div>
  );
}
