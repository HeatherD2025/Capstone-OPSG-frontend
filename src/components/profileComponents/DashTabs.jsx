import ReactiveButton from "reactive-button";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import Balance from "../qbComponentsAndHooks/Balance";
import { BalanceProvider } from "./BalanceProvider";
import { useState } from "react";
import { useSelector } from "react-redux";
import "../../styles/app.css";
import "../../styles/dashboard.css";

function DashTabs() {
  const [firstTab, setFirstTab] = useState(true);
  const { isAdmin, user } = useSelector((state) => state.auth);

  return (
    <Card className="dashboard-tabs">
      <Card.Header className="dashboard-header">
        <Nav variant="tabs" defaultActiveKey="#first">
          <Nav.Item className="tab-nav-item">
            <Nav.Link onClick={() => setFirstTab(true)}>
              Balance
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className="tab-nav-item">
            <Nav.Link onClick={() => setFirstTab(false)}>
              Quickbooks
            </Nav.Link>
          </Nav.Item>
        </Nav>
      </Card.Header>

      <Card.Body>
        <Card.Title className="dashboard-title">
          {!isAdmin && user && firstTab ? (
            <BalanceProvider id={user?.id}>
              <Balance />
            </BalanceProvider>
          ) : (
            ""
          )}
        </Card.Title>
        <Card.Text>
          {!isAdmin && user && !firstTab ? "Connect to Quickbooks" : ""}
        </Card.Text>
        {!isAdmin && user && !firstTab ? (
          <ReactiveButton className="btn-primary-soft ">Connect</ReactiveButton>
        ) : (
          <ReactiveButton className="btn-primary-soft">View Invoice</ReactiveButton>
        )}
      </Card.Body>
    </Card>
  );
}

export default DashTabs;
