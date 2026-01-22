import Card from "react-bootstrap/Card";
import "../../styles/home.css";

/**
 * @param {string} bg - bootstrap color variable
 * @param {string} title - card title
 * @param {string} subtitle - optional subtitle
 * @param {string} text - body text
 * @param {string} image - imgage for card
 */

function HomePageInfoCard({
  title,
  subtitle,
  text,
  image,
  children,
}) {
  return (
    <Card
      className="homePageCards"
    >
      <Card.Body>
        { image && <Card.Img className="homePageCardImage" {...image} /> }
        { title && <Card.Title >{title}</Card.Title>}
        { subtitle && <Card.Subtitle className="mb-2 text-muted homePageCardsSubtitle">{subtitle}</Card.Subtitle> }
        { text && <Card.Text>{text}</Card.Text>}
        {children}
      </Card.Body>
    </Card>
  );
}

export default HomePageInfoCard;
