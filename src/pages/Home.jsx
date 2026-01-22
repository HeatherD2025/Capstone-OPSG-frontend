import { useState, useEffect } from "react";
import { motion } from "motion/react";
import InfoModal from "../../src/components/Modal";
import { Col } from "react-bootstrap";
import opsgLogo from "../assets/images/opsg-logo.webp";
import nurseSmiling from "../assets/images/nurseSmiling.webp";
import NavBar from "../components/navigations/Navbar";
import AnimationCountUp from "../components/AnimationCountUp";
import "../styles/home.css";
import "../styles/app.css";
import "../styles/ourServices.css";
import HomeInfoCards from "../components/servicesCards/HomeInfoCards";
import usaMap from "../assets/images/usaMap.webp";
import Footer from "../components/Footer";

const Home = () => {
  // set initial modal state to closed
  const [modalShow, setModalShow] = useState(false);
  const [modalHeading, setModalHeading] = useState("");
  const [modalBody, setModalBody] = useState("");
  const SESSION_STORAGE_KEY = "isModalShownOnce";

  useEffect(() => {
    // check if modal has been shows yet in current session
    const hasBeenShown = sessionStorage.getItem(SESSION_STORAGE_KEY);

    if (!hasBeenShown) {
      setModalHeading("Welcome to the OnPoint Solutions Group demo app!");
      setModalBody(
        "Explore user dashboard using the following login credentials: \n\nEmail: 'demo@demo.com'\nPassword: '123'"
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
    <div className="background" style={{ minHeight: "100vh" }}>
      <div
        className="backgroundAccent"
        style={{ height: "14%", width: "100%" }}
      >
        <NavBar />

        <InfoModal
          show={modalShow}
          hide={() => setModalShow(false)}
          heading={modalHeading}
          body={modalBody}
        />

        <div className="introContainer">
          <div className="logoHeaderContainer">
            <div className="logoAndSubtextContainer">
              <div className="logoContainer">
                <img
                  src={opsgLogo}
                  alt="OPSG logo"
                  style={{
                    width: "5vw",
                    height: "auto",
                    paddingRight: "1vw",
                  }}
                ></img>
                <h1 className="opsgName">OnPoint Solutions Group</h1>
              </div>

              <Col className="text-muted">
                <div className="secondaryHeaderBox">
                  <div>Credentials </div>
                  <div>Enrollments</div>
                  <div>Consulting</div>
                </div>
              </Col>
            </div>

            <div className="introTextContainer">
              {/* animate fade in going down */}
              <motion.div
                variants={fadeInAnimationVariants}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                custom={-3} // make y negative, so fade in from top moving down
              >
                <h1 className="introTextFirstLine">You care for patients</h1>
              </motion.div>

              <motion.div
                variants={fadeinAnimationDelay}
                initial="initial"
                whileInView="animate"
                viewport={{ once: true }}
                custom={3}
              >
                <h1 className="introTextSecondLine">
                  We'll take care of the rest
                </h1>
              </motion.div>
            </div>
          </div>
          <div className="mainImageContainer">
            <img
              className="mainImage"
              src={nurseSmiling}
              fluid="true"
              thumbnail="true"
              alt="Nurse smiling"
              loading="lazy"
            />
          </div>
        </div>

        <div className="counterWrapperContainer">
          <div
            className="counterWrapper"
            style={{
              marginTop: "10rem",
              display: "grid",
              justifyContent: "center",
            }}
          >
            <p className="centeredCounter">
              Trusted by over{" "}
              <AnimationCountUp loading="lazy" from={0} to={50} /> Hospitals,
              providers, and practicioners nationwide
            </p>

            <img className="usMap" src={usaMap} alt="United States map"></img>
          </div>
        </div>

        <HomeInfoCards />

        <Footer />
      </div>
    </div>
  );
};

export default Home;
