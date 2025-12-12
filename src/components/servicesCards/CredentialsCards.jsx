import React from "react";
import { Card, CardBody, Row, Col, Container } from "react-bootstrap";
import certificate from "../../assets/img/certificate.png";

const CredentialsCards = () => {
  const cardData = [
    {
      src: certificate,
      alt: "certificate",
      className: "homeCards",
      title: "Healthcare Facilites",
    },
    {
      src: certificate,
      alt: "certificate",
      className: "homeCards",
      title: "ASC",
    },
    {
      src: certificate,
      alt: "certificate",
      className: "homeCards",
      title: "Staffing Agencies",
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
  }

export default CredentialsCards;
