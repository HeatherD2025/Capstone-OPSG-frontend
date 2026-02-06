import Card from "react-bootstrap/Card";
import "../../styles/ourServices.css"

/**
 * @param {string} bg - bootstrap color variable
 * @param {string} title - card title
 * @param {string} subtitle - optional subtitle
 * @param {string} text - body text
 * @param {string} image - imgage for card
 */

function InfoCard({
  title,
  subtitle,
  text,
  image,
  children,
}) {
  return (
    <Card className="info-card h-100">
      <Card.Body className="d-flex flex-column">

      {/* <div className="info-card-image-wrapper"> */}
        { image && (
          <Card.Img 
            className="info-card-image" 
            src={image.src}
            alt={image.alt} 
          /> 
        )}
      {/* </div> */}

        { title && <Card.Title >{title}</Card.Title>}

        { subtitle && (
          <Card.Subtitle className="mb-2 text-muted">
            {subtitle}
          </Card.Subtitle> 
        )}

        { text && <Card.Text>{text}</Card.Text>}

        {children}
        
      </Card.Body>
    </Card>
  );
}

export default InfoCard;
