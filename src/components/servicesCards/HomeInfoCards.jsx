import React from "react";
import { Card, CardBody, Row, Col, Container } from "react-bootstrap";
import stethoscope from "../../assets/img/stethoscope.png";
import certificate from "../../assets/img/certificate.png";
import medicalBag from "../../assets/img/medicalBag.png";
import "../../styles/app.css";
import "../../styles/home.css";

const HomeInfoCards = () => {
  const cardData = [
    {
      src: certificate,
      alt: "Certificate",
      title: "Credentials",
      subtitle: "Get verified quickly",
      text: "We'll collect, verify, and store your nursing credentials securely.",
    },
    {
      src: stethoscope,
      alt: "Stethoscope image",
      className: "homeCards",
      title: "Enrollments",
      subtitle: "Streamlined onboarding",
      text: "Our platform automates enrollments so you can focus on patient care.",
    },
    {
      src: medicalBag,
      alt: "Medical Bag",
      className: "homeCards",
      title: "Consulting",
      subtitle: "Expert guidance",
      text: "Work one-on-one with our team of healthcare IT specialists.",
    },
  ];

  return (
    // <div className="cardsContainer">
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
          // key={index}
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
        </Card>
        </Col>
      ))}
    </Row>
    </Container>
  );
};

export default HomeInfoCards;
