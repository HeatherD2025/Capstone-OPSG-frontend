import React from "react";
import { Card, CardBody, Row, Col, Container } from "react-bootstrap";
import flipChart from "../../assets/img/flipChart.png";
import "../../styles/app.css";
import "../../styles/home.css";

const ConsultingCards = () => {
  const cardData = [
    {
      src: flipChart,
      alt: "FlipChart",
      className: "homeCards",
      subtitle: "Staff bylaws, policies and procedures",
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
            <Card
                className="infoCard flex-grow-1"
              >
                <CardBody>
                  <Card.Img
                    src={card.src}
                    alt={card.alt}
                  />
                  <Card.Title>
                    {card.title}
                  </Card.Title>
                                              
                  <Card.Subtitle className="text-muted">
                    {card.subtitle}
                  </Card.Subtitle>
                                              
                  <Card.Text style={{ paddingBottom: "2vh" }}>{card.text}</Card.Text>
                                              
                   {card.link && (
                  <Card.Link href={card.link}>{card.linkHint}</Card.Link>
                  )}
                                              
                 </CardBody>
                {/* <CardBody className="d-flex flex-column align-items-center text-center">
                  <Card.Img 
                    src={card.src} 
                    alt={card.alt} 

                    style={{
                      width: "25%",
                      paddingBottom: "5vh",
                      paddingTop: "4.7vh",
                      fontSize: "20px",
                    }}
                  />
                  <Card.Title className="homeCards">{card.title}</Card.Title>
                </CardBody> */}
              </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};


export default ConsultingCards;
