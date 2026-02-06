import { useState, useEffect } from "react";
import { motion } from "motion/react";
import InfoModal from "../../src/components/Modal";
import { Col, Container } from "react-bootstrap";
import opsgLogo from "../assets/images/opsg-logo.webp";
import nurseSmiling from "../assets/images/nurseSmiling.webp";
import NavBar from "../components/navigations/Navbar";
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
  // set initial modal state to closed
  const [modalShow, setModalShow] = useState(false);
  const [modalHeading, setModalHeading] = useState("");
  const [modalBody, setModalBody] = useState("");
  const SESSION_STORAGE_KEY = "isModalShownOnce";

    const homeCardData = [
      {
        image: {
        src: certificate,
        alt: "certificate"
        },
        subtitle: "Get verified quickly",
        text: "We'll collect, verify, and store your nursing credentials securely.",
      },
      {
        image: {
        src: stethoscope,
        alt: "stethoscope"
        },
        subtitle: "Streamlined onboarding",
        text: "Our platform automates enrollments so you can focus on patient care.",
      },
      {
        image: {
        src: medicalBag,
        alt: "medical bag"
        },
        subtitle: "Expert guidance",
        text: "Work one-on-one with our team of healthcare IT specialists.",
      },
    ];

  useEffect(() => {
    // check if modal has been shows yet in current session
    const hasBeenShown = sessionStorage.getItem(SESSION_STORAGE_KEY);

    if (!hasBeenShown) {
      setModalHeading("Welcome to the OnPoint Solutions Group demo app!");
      setModalBody(
        "Explore user dashboard using the following login credentials: \n\nEmail: 'demo@demo.com'\nPassword: '123'",
      );
      setModalShow(true);
      sessionStorage.setItem(SESSION_STORAGE_KEY, "true");
    }
  }, []);

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
        delay: 1.5,
      },
    },
  };

  return (
    <div className="background">
      <NavBar />
        <InfoModal
          show={modalShow}
          hide={() => setModalShow(false)}
          heading={modalHeading}
          body={modalBody}
        />

        <div className="intro-container">
          <div className="logo-header-container">
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
                  <div>Credentials </div>
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
                custom={-3} // make y negative, so fade in from top moving down
              >
                <h1 className="intro-text-first-line">You care for patients</h1>
              </motion.div>

              <motion.div
                variants={fadeinAnimationDelay}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                custom={3}
              >
                <h1 className="intro-text-second-line">
                  We'll take care of the rest
                </h1>
              </motion.div>
            </div>
          </div>
          <div className="main-image-container">
            <img
              className="main-image"
              src={nurseSmiling}
              fluid="true"
              thumbnail="true"
              alt="nurse smiling"
              loading="lazy"
            />
          </div>
        </div>

          <div
            className="counter-section-wrapper"
          >
            <p className="centered-counter">
              Trusted by over{" "}
              <AnimationCountUp loading="lazy" from={0} to={50} />
            </p>
            <p className="centered-counter-text">Hospitals, providers, and practicioners nationwide
            </p>

            <img className="us-map" src={usaMap} alt="United States map"></img>
          </div>

          <Container >
            <ServiceSection 
              cards={homeCardData}
            />
          </Container>
         
       <Footer />
    </div>
  );
};

export default Home;
