import { motion } from "motion/react";
// const { scrollYProgress } = useScroll();

import { Row, Col, Image, Container, CardImg } from "react-bootstrap";
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
        duration: 0.8,
        delay: 0.2,
      },
    },
  };

  return (
    <div className="background" style={{ minHeight: "100vh" }}>
      <div
        className="backgroundAccent"
        style={{ height: "14%", width: "100%" }}
      >
        {/* <motion.div style={{ scaleX: scrollYProgress }} /> */}
        <NavBar />
        <div className="nameLogo">
          <div
            className="logoContainer"
            style={{
              alignItems: "center",
              fontSize: "clamp(10px, 2vw, 50px)",
              fontWeight: "200",
            }}
          >
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
            <Row>
              <Col>OnPoint Solutions Group</Col>
            </Row>
          </div>

                          <Col className="text-muted">
                  <div
                    className="secondaryHeaderBox"
                    style={{ verticalAlign: "middle" }}
                  >
                    <div className="secondHeader">Credentials </div>
                    <div className="secondHeader">Enrollments</div>
                    <div className="secondHeader">Consulting</div>
                  </div>
                </Col>

          <Container className="main mt-3" fluid>
            
            {/* animate fade in going down */}
            <motion.div
              variants={fadeInAnimationVariants}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              custom={-3} // make y negative, so fade in from top moving down
            >
              <Row className="justify-content-md-center">
                <Col className="display-3" md="auto" style={{ margin: "auto" }}>
                  You care for patients
                </Col>
              </Row>
              <Row
                className="justify-content-md-center"
                style={{ color: "#558e89" }}
              >
                <Col className="display-3" md="auto">
                  We'll take care of the rest
                </Col>
              </Row>

              <Row
                className="justify-content-md-center mt-3 mb-5"
                style={{
                  display: "flex",
                }}
              >
                {/* <Col className="text-muted">
                  <div
                    className="secondaryHeaderBox"
                    style={{ verticalAlign: "middle" }}
                  >
                    <div className="secondHeader">Credentials </div>
                    <div className="secondHeader">Enrollments</div>
                    <div className="secondHeader">Consulting</div>
                  </div>
                </Col> */}
              </Row>
            </motion.div>
            <div className="mainImage">
              <img
                className="mainImage"
                src={nurseSmiling}
                fluid="true"
                rounded="true"
                thumbnail="true"
                alt="Nurse smiling"
                loading="lazy"
                style={{
                  margin: "auto",
                  borderRadius: "2%",
                  filter: "drop-shadow(8px 8px 10px gray)",
                }}
              />
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
                <h3
                  className="centeredCounter"
                  style={{
                    fontSize: "clamp(4.5vw, 6px, 2vw)",
                    display: "flex",
                    flexWrap: "wrap",
                    flexDirection: "column",
                    alignItems: "center",
                    fontFamily: "arial",
                    color: "#558e89",
                    opacity: "100%",
                    fontWeight: "200",
                    lineHeight: "var(--bs-body-line-height)",
                    zIndex: "2",
                  }}
                >
                  Trusted by over <AnimationCountUp from={0} to={50} />{" "}
                  Hospitals, providers, and practicioners
                </h3>

                <img
                  className="usMap"
                  src={usaMap}
                  alt="United States map"
                  style={{
                    opacity: "18%",
                    width: "85%",
                    transform: "translate(4%, 10%)",
                  }}
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
                <HomeInfoCards></HomeInfoCards>
              </div>
            </div>
          </Container>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Home;
