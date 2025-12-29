// Receive request
// check required fields
// Verify reCAPTCHA
// Decide: allow or deny
// If allowed → send email
// Return a simple result
import emailjs from "emailjs-node";

const sendContactMessage = async (e) => {
    const { token, fullName, email, phone, message } = JSON.parse(e.body);

      if (!fullName || !email || !phone || !message) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "All fields are required" })
        };
      }

      if (!token) {
        return {
            statusCode: 403,
            body: JSON.stringify({ error: "reCAPTCHA verification failed" }),
        }
      }

      const res = await fetch(
        "https://www.google.com/recaptcha/api/siteverify",
        {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                secret: process.env.RECAPTCHA_SECRET_KEY,
                response: token,
            }),
        }
    );

      const data = await res.json();

      // second guard
      if (!data.success) {
        return {
            statusCode: 403,
            body: JSON.stringify({ error: "reCAPTCHA verification failed" }),
        }
      }

    try {
       await emailjs.send(
        process.env.EMAILJS_SERVICE_ID,
        process.env.EMAILJS_TEMPLATE_ID,
        {
          full_name: fullName,
          email_address: email,
          phone_number: phone,
          message: message,
        }
      );

    return {
        statusCode: 200,
        body: JSON.stringify({ ok: true, message: "Email sent successfully"}),
    };
    
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to send email. Please try again later"}),
        };
    }

};

export { sendContactMessage as handler };