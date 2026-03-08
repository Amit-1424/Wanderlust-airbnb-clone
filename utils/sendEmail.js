const nodemailer = require("nodemailer");

console.log("Initializing transporter...");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASS
    }
});

async function sendVerificationEmail(email, token) {
    try {

        console.log("sendVerificationEmail called");
        console.log("Email:", email);

        const verifyUrl = `https://wanderlust-tqzm.onrender.com/verify/${token}`;
        console.log("Verification URL:", verifyUrl);

        console.log("Sending email...");

        const info = await transporter.sendMail({
            from: `"Wanderlust" <${process.env.EMAIL_ID}>`,
            to: email,
            subject: "Verify your email",
            html: `
                <h2>Email Verification</h2>
                <p>Click the link below to verify your email:</p>
                <a href="${verifyUrl}">${verifyUrl}</a>
            `
        });

        console.log("Email sent successfully");
        console.log("Response:", info);

    } catch (err) {

        console.error("Email sending failed");
        console.error(err);

        throw err; // rethrow so controller knows
    }
}

module.exports = sendVerificationEmail;