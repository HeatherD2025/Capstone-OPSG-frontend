import { Row, Col } from "react-bootstrap";

function CardsGrid({ cards, CardComponent }) {
  return (
    <Row className="g-4 justify-content-center">
      {cards.map((card, index) => (
        <Col
          key={index}
          xs={12} // Full width on extra small screens
          sm={6} // 2 cards per row on small screens
          md={4} // 3 cards per row on medium and larger screens
          className="d-flex justify-content-center"
        >
          <CardComponent {...card} />
        </Col>
      ))}
    </Row>
  );
}

export default CardsGrid;
