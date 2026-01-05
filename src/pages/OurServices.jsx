import { Row, Col, Container } from "react-bootstrap";
import { motion } from "motion/react";
import React from "react";
import NavBar from "../components/navigations/Navbar";
import CredentialsCards from "../components/servicesCards/CredentialsCards";
import EnrollmentCards from "../components/servicesCards/EnrollmentCards";
import ConsultingCards from "../components/servicesCards/ConsultingCards";
import "../styles/ourServices.css";
import Footer from "../components/Footer";
import medicalDocument from "../assets/img/medical-document.jpg";

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

  return (
    <div
      className="backgroundAccent"
    >
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
            <Col
              className="display-1"
              md="auto"
              style={{
                margin: "auto",
                paddingTop: "8rem",
                fontSize: "60px",
                paddingBottom: "2vw",
                color: "#558e89",
              }}
            >
              Why Choose OnPoint Solutions?
            </Col>
          </Row>
        </motion.div>
      </Container>
      <div
        className="whyContainer"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "3rem 0rem 5rem 0rem",
        }}
      >
        <div
          className="whyParasBox"
          style={{
            margin: "2rem 6rem 0rem 0rem",
            maxWidth: "900px",
            fontWeight: "200",
            fontSize: "20px",
          }}
        >
          <p>
            <strong>Support:</strong> Every client is assigned a Certified
            Provider Credentialing Specialist (CPCS) to ensure personalized
            service and attention to detail.
          </p>
          <p>
            <strong>Streamlined Processes:</strong> We manage the entire
            credentialing and enrollment lifecycle, so you can focus on what
            matters most—patient care.
          </p>
          <p>
            <strong>Faster Revenue Cycles:</strong> Our efficient systems help
            you get credentialed quicker, increasing patient access and
            accelerating your income.
          </p>
          <p>
            <strong>Individualized Service:</strong> No one-size-fits-all
            solutions here. We tailor our approach to meet your unique
            operational and financial goals.
          </p>
        </div>

        <img
          src={medicalDocument}
          alt="medical document"
          classname="servicesImage"
          style={{
            width: "30%",
            borderRadius: "2%",
            filter: "drop-shadow(8px 8px 10px gray)",
          }}
        ></img>
      </div>

      {/* Credentials Section */}
      <Container className="py-5 justify-content-center">
        <p className="text-center cardheader"
          style={{fontSize: "40px"}}
        >Credentials</p>
          <p
            className="text-center mb-4 mx-auto cardPara"
            style={{
              paddingBottom: "5vw",
              fontWeight: "200",
              fontSize: "20px",
              maxWidth: "60%",
            }}
          >
            Recredentialing, Applications and License Renewals
          </p>
        <CredentialsCards />
      </Container>

      {/* Enrollment Section */}
      <Container className="py-5">
        <p className="text-center cardheader"
           style={{fontSize: "40px"}}
        >Enrollment</p>
          <p
            className="text-center mb-4 mx-auto cardPara"
            style={{
              paddingBottom: "5vw",
              fontWeight: "200",
              fontSize: "20px",
              maxWidth: "60%",
            }}
          >
            Medicare Opt-Out, Group Providers and Individual Providers Serving
            Commercial and Government Payers
          </p>
        <EnrollmentCards />
      </Container>

      {/* Consulting Section */}
      <Container className="py-5">
        <p className="text-center cardheader"
           style={{fontSize: "40px"}}
        >Consulting</p>
          <p
            className="text-center mb-4 mx-auto cardPara"
            style={{
              paddingBottom: "5vw",
              fontWeight: "200",
              fontSize: "20px",
              maxWidth: "60%",
            }}
          >
            Development Planning Assessing Compliance, Risk, and Opportunities
          </p>
        <ConsultingCards />
      </Container>
      <Footer />
    </div>
  );
};
export default ourServices;
