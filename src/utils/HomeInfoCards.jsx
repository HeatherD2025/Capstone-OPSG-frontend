import React from "react";
import { Card, CardBody } from "react-bootstrap";
import stethoscope from "../assets/img/stethoscope.png";
import certificate from "../assets/img/certificate.png";
import medicalBag from "../assets/img/medicalBag.png";

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
    <div>
      {cardData.map((card, index) => (
        <Card
          key={index}
          className="info-card"
          style={{ backgroundColor: "#79cbbb", margin: "3vw", zIndex: "1", }}
        >
          <CardBody
            style={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "270px",
            }}
          >
            <Card.Img
              src={card.src}
              alt={card.alt}
              style={{
                width: "25%",
                display: "block",
                alignSelf: "anchor-center",
                paddingBottom: "4vh",
                paddingTop: "2.5vh",
              }}
            />
            <Card.Title
              style={{
                display: "block",
                paddingBottom: "1em",
              }}
            >
              {card.title}
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              {card.subtitle}
            </Card.Subtitle>
            <Card.Text style={{ paddingBottom: "2vh" }}>{card.text}</Card.Text>
            {card.link && (
              <Card.Link href={card.link}>{card.linkHint}</Card.Link>
            )}
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default HomeInfoCards;
