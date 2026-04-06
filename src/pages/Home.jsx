import { motion } from "motion/react";
import { Col } from "react-bootstrap";
import opsgLogo from "../assets/images/opsg-logo.webp";
import nurseSmiling from "../assets/images/nurseSmiling.webp";
import NavBar from "../components/navigation/Navbar";
import AnimationCountUp from "../components/AnimationCountUp";
import stethoscope from "../assets/images/stethoscope.webp";
import certificate from "../assets/images/certificate.webp";
import medicalBag from "../assets/images/medicalBag.webp";
import ServiceSection from "../components/servicesCards/ServiceSection";
import "../styles/app.css";
import "../styles/ourServices.css";
import usaMap from "../assets/images/usaMap.webp";
import Footer from "../components/Footer";

const Home = () => {
  const homeCardData = [
    {
      image: {
        src: certificate,
        alt: "certificate",
      },
      subtitle: "Get verified quickly",
      text: "We'll collect, verify, and store your nursing credentials securely.",
    },
    {
      image: {
        src: stethoscope,
        alt: "stethoscope",
      },
      subtitle: "Streamlined onboarding",
      text: "Our platform automates enrollments so you can focus on patient care.",
    },
    {
      image: {
        src: medicalBag,
        alt: "medical bag",
      },
      subtitle: "Expert guidance",
      text: "Work one-on-one with our team of healthcare IT specialists.",
    },
  ];

  // animate fading in
  const fadeInAnimationVariants = {
    initial: (direction) => ({
      opacity: 0,
      y: 100 * direction,
    }),
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 0.4,
      },
    },
  };

  const fadeinAnimationDelay = {
    initial: (direction) => ({
      opacity: 0,
      y: 100 * direction,
    }),
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        delay: 1.25,
      },
    },
  };

  return (
    <div className="background">
      <NavBar />

      <div className="intro-container">
        <div className="logo-and-subtext-container">
          <div className="logo-container">
            <img
              src={opsgLogo}
              alt="OPSG logo"
              className="homepage-opsg-logo"
            ></img>
            <h1 className="opsg-name">OnPoint Solutions Group</h1>
          </div>

          <Col className="text-muted">
            <div className="secondary-header-box">
              <div>Credentials</div>
              <div>Enrollments</div>
              <div>Consulting</div>
            </div>
          </Col>
        </div>

        <div className="intro-text-container">
          {/* animate fade in going down */}
          <motion.div
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            custom={-2} // make y negative, so fade in from top moving down
          >
            <h1 className="intro-text-first-line">You care for patients</h1>
          </motion.div>

          <motion.div
            variants={fadeinAnimationDelay}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            custom={2}
          >
            <h1 className="intro-text-second-line">
              We'll take care of the rest
            </h1>
          </motion.div>
        </div>

        {/* <div className="main-image-container"> */}
        <img
          className="main-image"
          src={nurseSmiling}
          fluid="true"
          thumbnail="true"
          alt="nurse smiling"
          loading="lazy"
        />
        {/* </div> */}
      </div>

      <p className="centered-counter">
        Trusted by over <AnimationCountUp loading="lazy" from={0} to={50} />
        Hospitals, providers, and practicioners nationwide
      </p>

      <img className="us-map" src={usaMap} alt="United States map"></img>

      <div className="services-section">
        <ServiceSection cards={homeCardData} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
