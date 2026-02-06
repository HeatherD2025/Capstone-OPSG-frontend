import React from "react";
import UserNav from "./userProfileComponents/UserNav";
import AdminNav from "./adminProfileComponents/AdminNav";
import ProfileHeader from "./ProfileHeader";
import InfoCard from "../components/servicesCards/InfoCard";
import { Container, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Balance from "../qbComponentsAndHooks/Balance";
import { BalanceProvider } from "./BalanceProvider";
import "../../styles/dashboard.css";

export default function Dashboard() {
  const { isAdmin, user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  return (
    <div className="dashboard dark-theme">
      <ProfileHeader />
      {isAdmin ? <AdminNav /> : <UserNav />}

      <Container fluid className="action-cards-container">
        {!isAdmin && user && (
          <BalanceProvider id={user?.id}>
            <InfoCard>
              <Balance
                text={
                  <button
                    rel="noopener noreferrer"
                    style={{
                      opacity: 0,
                      height: "100%",
                      width: "100%",
                    }}
                    onClick={() => navigate(`/profile/invoices/${user.id}`)}
                  />
                }
              />
            </InfoCard>
          </BalanceProvider>
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
