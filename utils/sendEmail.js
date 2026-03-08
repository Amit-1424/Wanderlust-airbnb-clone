const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASS
    }
});

async function sendVerificationEmail(email, token) {

    const verifyUrl = `https://wanderlust-tqzm.onrender.com/verify/${token}`;

    await transporter.sendMail({
        from: `"Wanderlust" <${process.env.EMAIL_ID}>`,
        to: email,
        subject: "Verify your email",
        html: `
            <h2>Email Verification</h2>
            <p>Click the link below to verify your email:</p>
            <a href="${verifyUrl}">${verifyUrl}</a>
        `
    });
}

module.exports = sendVerificationEmail;