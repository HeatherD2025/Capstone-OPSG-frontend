import { motion } from "motion/react";

import { Row, Col} from "react-bootstrap";
import opsgLogo from "../assets/img/opsg-logo.png";
import nurseSmiling from "../assets/img/nurseSmiling.jpg";
import NavBar from "../components/navigations/Navbar";
import AnimationCountUp from "../components/AnimationCountUp";
import "../styles/home.css";
import "../styles/app.css";
import HomeInfoCards from "../components/servicesCards/HomeInfoCards";
import usaMap from "../assets/img/usaMap.png";
import Footer from "../components/Footer";

const Home = () => {
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
  }

  return (
    <div className="background" style={{ minHeight: "100vh" }}>
      <div
        className="backgroundAccent"
        style={{ height: "14%", width: "100%" }}
      >
        {/* <motion.div style={{ scaleX: scrollYProgress }} /> */}
        <NavBar />
          <div className="introContainer">

            <div className="logoHeaderContainer">

              <div className="logoAndSubtextContainer">
                <div className="logoContainer">
                  <img
                    src={opsgLogo}
                    alt="OPSG logo"
                    // className="rounded-circle usr-image2"
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
                  
                      <h1 className="introTextSecondLine">We'll take care of the rest</h1>
                        
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
                  marginTop: "7vh",
                  marginBottom: "7vh",
                  display: "grid",
                  justifyContent: "center",
                }}
              >
                <p className="centeredCounter">
                  Trusted by over <AnimationCountUp loading="lazy" from={0} to={50} />{" "}
                  Hospitals, providers, and practicioners nationwide
                </p>

                <img
                  className="usMap"
                  src={usaMap}
                  alt="United States map"
                  // style={{
                  //   opacity: "18%",
                  //   width: "80%",
                  //   transform: "translate(4%, 10%)",
                  // }}
                ></img>
              </div>
            </div>
            <div
              className="cardsContainer"
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around",
                gap: "3vw",
              }}
            >
              <div>
                <HomeInfoCards />
              </div>
            </div>

          <Footer />

      </div>
    </div>
  );
};

export default Home;
