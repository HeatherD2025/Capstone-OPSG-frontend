import Card from "react-bootstrap/Card";
import "../../styles/dashboard.css"

/**
 * @param {string} bg - bootstrap color variable
 * @param {string} text - body text
 */

function DashboardCard({
  text,
  children,
}) {
  return (
    <Card className="dashboard-card">
      <Card.Body className="dashboard-card-body">
        { text && <Card.Text>{text}</Card.Text>}
        {children}
      </Card.Body>
    </Card>
  );
}

export default DashboardCard;
