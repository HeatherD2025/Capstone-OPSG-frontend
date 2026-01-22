import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import certificate from "../../assets/images/certificate.webp";
import InfoCard from "./InfoCard";
import "../../styles/ourServices.css";

const CredentialsCards = () => {
  const cardData = [
    {
      src: certificate,
      alt: "certificate",
      className: "homeCards",
      subtitle: "Healthcare Facilites",
    },
    {
      src: certificate,
      alt: "certificate",
      className: "homeCards",
      subtitle: "ASC",
    },
    {
      src: certificate,
      alt: "certificate",
      className: "homeCards",
      subtitle: "Staffing Agencies",
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
            className="mb-4 d-flex justify-content-center"
            style={{ 
              minHeight: "30%",
              maxWidth: "700%",
            }}
          >
           
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
  }

export default CredentialsCards;
