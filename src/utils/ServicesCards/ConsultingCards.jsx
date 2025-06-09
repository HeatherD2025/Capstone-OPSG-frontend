import React from "react";
import { Card, CardBody, Row, Col, Container } from "react-bootstrap";
import flipChart from "../../assets/img/flipChart.png";

const ConsultingCards = () => {
  const cardData = [
    {
      src: flipChart,
      alt: "FlipChart",
      className: "homeCards",
      title: "Staff bylaws, policies and procedures",
    },
    {
      src: flipChart,
      alt: "FlipChart",
      className: "homeCards",
      title: "Criteria-based privledging",
    },
    {
      src: flipChart,
      alt: "FlipChart",
      className: "homeCards",
      title: "Regulatory and accrediation compliance",
    },
    {
      src: flipChart,
      alt: "FlipChart",
      className: "homeCards",
      title: "Peer review of FPPE/OPPE",
    },
    {
      src: flipChart,
      alt: "FlipChart",
      className: "homeCards",
      title: "Credential file audit",
    },
    {
      src: flipChart,
      alt: "FlipChart",
      className: "homeCards",
      title: "Staff department core functions",
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
          >
            <Card
                className="info-card flex-grow-1"
                style={{ backgroundColor: "#79cbbb",
                minHeight: "30%",
                maxWidth: "clamp(200px, 40vw, 300px)",
                maxHeight: "50vh",
                zIndex: "1",
                 }}
              >
                <CardBody className="d-flex flex-column align-items-center text-center">
                  <Card.Img 
                    src={card.src} 
                    alt={card.alt} 

                    style={{
                      width: "25%",
                      paddingBottom: "5vh",
                      paddingTop: "4.7vh",
                    }}
                  />
                  <Card.Title>{card.title}</Card.Title>
                </CardBody>
              </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};


export default ConsultingCards;
