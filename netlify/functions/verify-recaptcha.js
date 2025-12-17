export const handler = async (e) => {
    try {
    const { token } = JSON.parse(event.body);

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

    return {
        statusCode: 200,
        body: JSON.stringify(data),
    };
    } catch (err) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "reCAPTCHA verification failed"});
        };
    }
};