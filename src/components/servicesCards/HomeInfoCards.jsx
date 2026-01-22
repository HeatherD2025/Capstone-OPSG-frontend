import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import stethoscope from "../../assets/images/stethoscope.webp";
import certificate from "../../assets/images/certificate.webp";
import medicalBag from "../../assets/images/medicalBag.webp";
import HomePageInfoCard from "./HomePageInfoCard";
import "../../styles/home.css";

const HomeInfoCards = () => {
  const cardData = [
    {
      src: certificate,
      alt: "Certificate",
      className: "homePageCards",
      title: "Credentials",
      subtitle: "Get verified quickly",
      text: "We'll collect, verify, and store your nursing credentials securely.",
    },
    {
      src: stethoscope,
      alt: "Stethoscope image",
      className: "homePageCards",
      title: "Enrollments",
      subtitle: "Streamlined onboarding",
      text: "Our platform automates enrollments so you can focus on patient care.",
    },
    {
      src: medicalBag,
      alt: "Medical Bag",
      className: "homePageCards",
      title: "Consulting",
      subtitle: "Expert guidance",
      text: "Work one-on-one with our team of healthcare IT specialists.",
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


          <HomePageInfoCard
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

export default HomeInfoCards;
