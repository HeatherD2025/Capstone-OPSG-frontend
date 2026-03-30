import Card from "react-bootstrap/Card";
import "../../styles/dashboard.css"

/**
 * @param {string} bg - bootstrap color variable
 * @param {string} title - card title
 * @param {string} subtitle - optional subtitle
 * @param {string} text - body text
 * @param {string} image - imgage for card
 */

function DashboardCard({
  text,
  children,
}) {
  return (
    <Card className="dashboard-card">
      <Card.Body className="d-flex flex-column">
        { text && <Card.Text>{text}</Card.Text>}
        {children}
      </Card.Body>
    </Card>
  );
}

export default DashboardCard;
