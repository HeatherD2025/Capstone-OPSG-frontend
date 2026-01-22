import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import flipChart from "../../assets/images/flipChart.webp";
import InfoCard from "./InfoCard";
import "../../styles/ourServices.css";

const ConsultingCards = () => {
  const cardData = [
    {
      src: flipChart,
      alt: "FlipChart",
      className: "homeCards",
      subtitle: "Staff bylaws, policies, and procedures",
    },
    {
      src: flipChart,
      alt: "FlipChart",
      className: "homeCards",
      subtitle: "Criteria-based privledging",
    },
    {
      src: flipChart,
      alt: "FlipChart",
      className: "homeCards",
      subtitle: "Regulatory and accrediation compliance",
    },
    {
      src: flipChart,
      alt: "FlipChart",
      className: "homeCards",
      subtitle: "Peer review of FPPE/OPPE",
    },
    {
      src: flipChart,
      alt: "FlipChart",
      className: "homeCards",
      subtitle: "Credential file audit",
    },
    {
      src: flipChart,
      alt: "FlipChart",
      className: "homeCards",
      subtitle: "Staff department core functions",
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
};

export default ConsultingCards;
