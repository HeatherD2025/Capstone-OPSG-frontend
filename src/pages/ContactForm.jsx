import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import ReactiveButton from "reactive-button";
import ReCAPTCHA from "react-google-recaptcha";
import Footer from "../components/Footer";
import { motion } from "motion/react";
import { useRecaptcha } from "../utils/useRecaptcha";
import NavBar from "../components/navigations/Navbar";

export default function ContactFormPage() {
  const [loading, setLoading] = useState(false);

  const {
    recaptchaRef,
    error: recaptchaError,
    getToken,
    resetToken: removeRecaptchaToken,
  } = useRecaptcha();

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

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = getToken();
    if (!token) {
      alert("Please verify you are not a robot");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/.netlify/functions/send-contact-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, token }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      alert(data.message || "Message sent successfully!");
      setFormData({ fullName: "", email: "", phone: "", message: "" });

      removeRecaptchaToken();
    } catch (error) {
      alert(error.message || "Please try sending your message again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="background" style={{ minHeight: "100vh" }}>
        <div className="backgroundAccent" style={{ minHeight: "100vh" }}>
          <NavBar />
          <motion.div
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            custom={-1}
          >
            <h2
              style={{
                textAlign: "center",
                paddingTop: "150px",
                fontWeight: "175",
              }}
            >
              We'd Love To Hear From You!
            </h2>

            <div
              className="d-flex justify-content-center align-items-center"
              style={{
                minHeight: "calc(100vh - 90px)",
                paddingBottom: "400px",
                width: "100%",
              }}
            >
              <div
                className="container py-4 py-md-5"
                style={{ paddingTop: "300px" }}
              >
                <Card
                  style={{
                    padding: "30px",
                    width: "100%",
                    maxWidth: "50vw",
                    margin: "0 auto",
                  }}
                >
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label
                        htmlFor="fullName"
                        className="form-label"
                        style={{ fontSize: "12px" }}
                      >
                        FIRST AND LAST NAME
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        className="form-control"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        style={{ fontSize: "12px" }}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="email"
                        className="form-label"
                        style={{ fontSize: "12px" }}
                      >
                        EMAIL ADDRESS
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{ fontSize: "12px" }}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="phone"
                        className="form-label"
                        style={{ fontSize: "12px" }}
                      >
                        PHONE NUMBER
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="form-control"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        style={{ fontSize: "12px" }}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="message"
                        className="form-label"
                        style={{ fontSize: "12px" }}
                      >
                        MESSAGE
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        className="form-control"
                        rows={7}
                        value={formData.message}
                        onChange={handleChange}
                        required
                        style={{ fontSize: "12px" }}
                      />
                    </div>
                    <div className="mb-3 text-center">
                      {" "}
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                      />
                      {recaptchaError && (
                        <div className="text-danger mt-1">{recaptchaError}</div>
                      )}
                    </div>

                    <div className="text-center">
                      <ReactiveButton
                        rounded
                        buttonState={loading ? "loading" : "idle"}
                        idleText={"SUBMIT"}
                        loadingText={"Loading"}
                        variant="secondary"
                        className="button3"
                        type="submit"
                        style={{
                          justifyContent: "left",
                          width: "80px",
                          fontSize: "12px",
                          backgroundColor: "#558e89",
                          marginTop: "5px",
                        }}
                      ></ReactiveButton>
                    </div>
                  </form>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </>
  );
}
