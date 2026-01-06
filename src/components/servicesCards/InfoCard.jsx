import Card from "react-bootstrap/Card";
import "../../styles/app.css"

/**
 * @param {string} bg - bootstrap color variable
 * @param {string} title - card title
 * @param {string} subtitle - optional subtitle
 * @param {string} text - body text
 * @param {string} link - optional link
 * @param {string} linkHint - text describing link. required if there is a link
 * @param {string} image - imgage for card
 */

function InfoCard({
  title,
  subtitle,
  text,
  link,
  linkHint,
  image,
  children,
}) {
  return (
    <Card
      className="infoCard w-60 h-100"
    >
      <Card.Body>
        { image && <Card.Img {...image} /> }
        { title && <Card.Title className="homeCards">{title}</Card.Title>}
        { subtitle && <Card.Subtitle className="mb-2 text-muted homeCardsSubtitle">{subtitle}</Card.Subtitle> }
        { text && <Card.Text>{text}</Card.Text>}
        {children}
        { link && <Card.Link href={link}>{linkHint}</Card.Link>}
      </Card.Body>
    </Card>
  );
}

export default InfoCard;
