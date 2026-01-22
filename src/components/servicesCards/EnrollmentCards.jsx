import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import pen from "../../assets/images/pen.webp";
import InfoCard from "./InfoCard";
import "../../styles/ourServices.css";

const EnrollmentCards = () => {
  const cardData = [
    {
      src: pen,
      alt: "pen on paper",
      className: "homeCards",
      subtitle: "CAQH",
    },
    {
      src: pen,
      alt: "pen on paper",
      className: "homeCards",
      subtitle: "NPPES",
    },
    {
      src: pen,
      alt: "pen on paper",
      className: "homeCards",
      subtitle: "PECOS",
    },
    {
      src: pen,
      alt: "pen on paper",
      className: "homeCards",
      subtitle: "SAM",
    },
    {
      src: pen,
      alt: "pen on paper",
      className: "homeCards",
      subtitle: "Sanitation Checks",
    },
    {
      src: pen,
      alt: "pen on paper",
      className: "homeCards",
      subtitle: "OIG",
    },
  ];

  return (
 <Container fluid> {/* Changed to fluid to avoid container padding */}
      <Row className="justify-content-center g-1">
        {cardData.map((card, index) => (
          <Col 
            key={index} 
            xs={12}    // Full width on extra small screens
            sm={6}     // 2 cards per row on small screens
            md={4}     // 3 cards per row on medium and larger screens
            lg={4}     // Ensures 3 cards per row on large screens
            xl={4}     // Ensures 3 cards per row on extra large screens
            className="mb-4 d-flex justify-content-center">


              <InfoCard
                title={card.title}
                subtitle={card.subtitle}
                text={card.text}
                image={{ src: card.src, alt: card.alt }}
              />

          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default EnrollmentCards;
