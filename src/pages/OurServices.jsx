import { Row, Col, Container } from "react-bootstrap";
import { motion } from "motion/react";
import React from "react";
import NavBar from "../components/navigation/Navbar";
import "../styles/ourServices.css";
import Footer from "../components/Footer";
import medicalDocument from "../assets/images/medical-document.webp";
import ServiceSection from "../components/servicesCards/ServiceSection";
import pen from "../assets/images/pen.webp";
import flipChart from "../assets/images/flipChart.webp";
import certificate from "../assets/images/certificate.webp";

const ourServices = () => {
  const fadeInAnimationVariants = {
    initial: (direction) => ({
      opacity: 0,
      y: 100 * direction,
    }),
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.2,
      },
    },
  };

  const credentialsData = [
    {
      image: {
        src: certificate,
        alt: "certificate",
      },
      subtitle: "Healthcare Facilites",
    },
    {
      image: {
        src: certificate,
        alt: "certificate",
      },
      subtitle: "ASC",
    },
    {
      image: {
        src: certificate,
        alt: "certificate",
      },
      subtitle: "Staffing Agencies",
    },
  ];

  const enrollmentData = [
    {
      image: {
        src: pen,
        alt: "pen on paper",
      },
      subtitle: "CAQH",
    },
    {
      image: {
        src: pen,
        alt: "pen on paper",
      },
      subtitle: "NPPES",
    },
    {
      image: {
        src: pen,
        alt: "pen on paper",
      },
      subtitle: "PECOS",
    },
    {
      image: {
        src: pen,
        alt: "pen on paper",
      },
      subtitle: "SAM",
    },
    {
      image: {
        src: pen,
        alt: "pen on paper",
      },
      subtitle: "Sanitation Checks",
    },
    {
      image: {
        src: pen,
        alt: "pen on paper",
      },
      subtitle: "OIG",
    },
  ];

  const consultingData = [
    {
      image: {
        src: flipChart,
        alt: "flip chart",
      },
      subtitle: "Staff bylaws, policies, and procedures",
    },
    {
      image: {
        src: flipChart,
        alt: "flip chart",
      },
      subtitle: "Criteria-based privledging",
    },
    {
      image: {
        src: flipChart,
        alt: "flip chart",
      },
      subtitle: "Regulatory and accrediation compliance",
    },
    {
      image: {
        src: flipChart,
        alt: "flip chart",
      },
      subtitle: "Peer review of FPPE/OPPE",
    },
    {
      image: {
        src: flipChart,
        alt: "flip chart",
      },
      subtitle: "Credential file audit",
    },
    {
      image: {
        src: flipChart,
        alt: "flip chart",
      },
      subtitle: "Staff department core functions",
    },
  ];

  return (
    <div className="background">
      <NavBar />
      <Container className="main mt-5" fluid>
        {/* animate fade in going down */}
        <motion.div
          variants={fadeInAnimationVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          custom={-1} // make y negative, so fade in from top moving down
        >
          <Row className="justify-content-md-center">
            <Col className="services-header" md="auto">
              Why Choose OnPoint Solutions?
            </Col>
          </Row>
        </motion.div>
      </Container>
      <div className="why-container">
        <div className="why-paras-wrapper">
          <p className="why-para-section">
            <strong>Support:</strong> Every client is assigned a Certified
            Provider Credentialing Specialist (CPCS) to ensure personalized
            service and attention to detail.
          </p>
          <p className="why-para-section">
            <strong>Streamlined Processes:</strong> We manage the entire
            credentialing and enrollment lifecycle, so you can focus on what
            matters most—patient care.
          </p>
          <p className="why-para-section">
            <strong>Faster Revenue Cycles:</strong> Our efficient systems help
            you get credentialed quicker, increasing patient access and
            accelerating your income.
          </p>
          <p className="why-para-section">
            <strong>Individualized Service:</strong> No one-size-fits-all
            solutions here. We tailor our approach to meet your unique
            operational and financial goals.
          </p>
        </div>

        <img
          src={medicalDocument}
          alt="medical document"
          className="services-main-image"
        ></img>
      </div>

      {/* Credentials Section */}
      <Container>
        <ServiceSection
          title="Credentials"
          description="Recredentialing, Applications and License Renewals"
          cards={credentialsData}
        />
      </Container>

      {/* Enrollment Section */}
      <Container>
        <ServiceSection
          title="Enrollment"
          description="Medicare Opt-Out, Group Providers and Individual Providers Serving
          Commercial and Government Payers"
          cards={enrollmentData}
        />
      </Container>

      {/* Consulting Section */}
      <Container>
        <ServiceSection
          title="Consulting"
          description="Development Planning Assessing Compliance, Risk, and Opportunities"
          cards={consultingData}
        />
      </Container>
      <Footer />
    </div>
  );
};
export default ourServices;
