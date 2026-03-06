import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Nav from 'react-bootstrap/Nav';
import Balance from "../qbComponentsAndHooks/Balance";
import { BalanceProvider } from "./BalanceProvider";
import { useState } from 'react';
import { useSelector } from "react-redux";

const [firstTab, setFirstTab] = useState(true);
const { isAdmin, user } = useSelector((state) => state.auth)

function DashTabs() {
  return (
    <Card>
      <Card.Header>
        <Nav variant="tabs" defaultActiveKey="#first">
          <Nav.Item>
            <Nav.Link href="#first" onClick={() => setFirstTab(true)}>Balance</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="#second"onClick={() => setFirstTab(false)}>Quickbooks</Nav.Link>
          </Nav.Item>
        </Nav>

      </Card.Header>
      <Card.Body>
        <Card.Title>
         {!isAdmin && user && firstTab ? 
            <BalanceProvider id={user?.id}> 
                 <Balance /> 
            </BalanceProvider>
            :  ""}
        </Card.Title>
        <Card.Text>
          {!isAdmin && user && !firstTab ? "Connect to Quickbooks" : ""}
        </Card.Text>
          {!isAdmin && user && !firstTab ? 
            <Button>Connect</Button> : 
            <Button>View Invoice</Button>}

      </Card.Body>
    </Card>
  );
}

export default DashTabs;