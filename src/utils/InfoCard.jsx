import Card from "react-bootstrap/Card";

/**
 * @param {string} bg - bootstrap color variable
 * @param {string} title - card title
 * @param {string} subtitle - optional subtitle
 * @param {string} text - body text
 * @param {string} link - optional link
 * @param {string} linkHint - text describing link. required if there is a link
 * @param {string} image - imgage for card
 */

export default function InfoCard({
  bg,
  title,
  subtitle,
  text,
  link,
  linkHint,
  image,
}) {
  return (
    <Card
      className="info-card w-60 h-100"
      style={{ width: "18rem", backgroundColor: "#79cbbb" }}
    >
      <Card.Body>
        <Card.Img {...image}></Card.Img>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{subtitle}</Card.Subtitle>
        <Card.Text>{text}</Card.Text>
        <Card.Link href={link}>{linkHint}</Card.Link>
      </Card.Body>
    </Card>
  );
}
