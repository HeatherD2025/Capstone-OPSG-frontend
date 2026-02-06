import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactiveButton from "reactive-button";
import ReCAPTCHA from "react-google-recaptcha";
import Footer from "../components/Footer";
import { motion } from "motion/react";
import { useRecaptcha } from "../utils/useRecaptcha";
import NavBar from "../components/navigations/Navbar";
import Form from "react-bootstrap/Form";
import "../styles/app.css";

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
      <div className="background">
        <NavBar />
        <motion.div
          variants={fadeInAnimationVariants}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          custom={-1}
        >
          <h2 className="contact-page-header">We'd Love To Hear From You!</h2>

          <div className="contact-form-container">
            <Form onSubmit={handleSubmit} className="login-register-form">

              <Form.Group className="mb-3" controlId="form-basic-name">
                <Form.Label>
                  FIRST AND LAST NAME
                </Form.Label>

                <Form.Control
                  type="text"
                  name="fullName"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-basic-email">
                <Form.Label>
                  E-MAIL
                </Form.Label>

                <Form.Control
                  type="email"
                  name="email"
                  placeholder="johndoe@email.com"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="form-basic-phone">
                <Form.Label>
                  PHONE NUMBER
                </Form.Label>

                <Form.Control
                  type="phone"
                  name="phone"
                  placeholder="(555)555-5555"
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group  className="mb-4" controlId="form-basic-message">
                <Form.Label>
                  MESSAGE
                </Form.Label>

                <Form.Control
                  as="textarea"
                  rows={3}
                  type="message"
                  name="message"
                  onChange={handleChange}
                />
              </Form.Group>

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
                  className="submit-btn-custom"
                  type="submit"
                ></ReactiveButton>
              </div>
            </Form>
          </div>
        </motion.div>
        <Footer />
      </div>
    </>
  );
}
