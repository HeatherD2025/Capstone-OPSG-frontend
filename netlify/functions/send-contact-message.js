// Receive request
// check required fields
// Verify reCAPTCHA
// Decide: allow or deny
// If allowed → send email
// Return a simple result

const sendContactMessage = async (e) => {
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

  const res = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      secret: process.env.RECAPTCHA_SECRET_KEY,
      response: token,
    }),
  });

  if (!process.env.RECAPTCHA_SECRET_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Missing reCAPTCHA secret" }),
    };
  }

  const data = await res.json();

  // second guard
  if (!data.success) {
    return {
      statusCode: 403,
      body: JSON.stringify({ error: "reCAPTCHA verification failed" }),
    };
  }

  const emailRes = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_PUBLIC_KEY,
      template_params: {
        full_name: fullName,
        email_address: email,
        phone_number: phone,
        message: message,
      },
    }),
  });

  if (!emailRes.ok) {
    const errorText = await emailRes.text();

    return {
      statusCode: 502,
      body: JSON.stringify({
        error: "Email service failed",
        details: errorText,
      }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({
      ok: true,
      message: "Email sent successfully",
    }),
  };
};

export { sendContactMessage as handler };
