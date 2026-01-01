// Receive request
// check required fields
// Verify reCAPTCHA
// Decide: allow or deny
// If allowed → send email
// Return a simple result
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const sendContactMessage = async (e) => {

  try {
  const { token, fullName, email, phone, message } = JSON.parse(e.body);

  if (!fullName || !email || !phone || !message) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "All fields are required" }),
    };
  }

  if (!token) {
    return {
      statusCode: 403,
      body: JSON.stringify({ error: "reCAPTCHA verification failed" }),
    };
  }

  const recaptchaRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: process.env.RECAPTCHA_SECRET_KEY,
      response: token,
    }),
  }
);

  if (!process.env.RECAPTCHA_SECRET_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing reCAPTCHA secret" }),
    };
  }

  const recaptchaData = await recaptchaRes.json();

  // second guard
  if (!recaptchaData.success) {
    return {
      statusCode: 403,
      body: JSON.stringify({ error: "reCAPTCHA verification failed" }),
    };
  }

  await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL,
    to: [process.env.CONTACT_TO_EMAIL],
    replyTo: email,
    subject: "New contact form message",
    html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
  });

    return {
      statusCode: 200,
      body: JSON.stringify({
        ok: true,
        message: "Email sent successfully",
      }),
    };
  }
  catch (error) {
  console.error("Send contact message failure", error);

  return {
    statusCode: 500,
    body: JSON.stringify({
      ok: true,
      message: "Failed to send message. Please try again later",
    }),
  };
 }
};

export { sendContactMessage as handler };
