const User = require("../models/user.js");
const passport = require("passport");
const crypto = require("crypto");

const sendVerificationEmail = require("../utils/sendEmail");

// Render Signup
module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};


// Signup
module.exports.signup = async (req, res, next) => {
    try {

        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        // Case 1: Email already registered and verified
        if (existingUser && existingUser.isVerified) {
            req.flash("error", "Email already registered.");
            return res.redirect("/signup");
        }

        // Case 2: User exists but not verified → resend email
        if (existingUser && !existingUser.isVerified) {

            const token = crypto.randomBytes(32).toString("hex");

            existingUser.verificationToken = token;
            existingUser.tokenExpiry = Date.now() + 3600000;

            await existingUser.save();

            await sendVerificationEmail(existingUser.email, token);

            req.flash("sucess", "Verification email resent. Please check your inbox.");
            return res.redirect("/login");
        }

        // Case 3: New user
        const token = crypto.randomBytes(32).toString("hex");

        const newUser = new User({
            username,
            email,
            verificationToken: token,
            tokenExpiry: Date.now() + 3600000
        });

        await User.register(newUser, password);

        await sendVerificationEmail(email, token);

        req.flash("sucess", "Verification email sent. Please check your email.");
        res.redirect("/login");

    } catch (e) {
        console.log(e);
        req.flash("error", e.message);
        res.redirect("/signup");
    }
};


// Render Login
module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};


// Login
module.exports.login = async (req, res) => {


    req.flash("sucess", `Welcome back ${req.user.username}`);

    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};


// Logout
module.exports.logout = (req, res, next) => {

    req.logout((err) => {
        if (err) {
            return next(err);
        }

        req.flash("sucess", "You are logged out!");
        res.redirect("/listings");
    });

};


// Verify Email
module.exports.verifyEmail = async (req, res) => {
    try {

        const { token } = req.params;

        const user = await User.findOne({
            verificationToken: token,
            tokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            req.flash("error", "Verification link is invalid or expired.");
            return res.redirect("/signup");
        }

        user.isVerified = true;
        user.verificationToken = undefined;
        user.tokenExpiry = undefined;

        await user.save();

        req.login(user, (err) => {
            if (err) {
                console.log(err);
                req.flash("error", "Something went wrong.");
                return res.redirect("/login");
            }

            req.flash("sucess", "Email verified successfully. Welcome to Wanderlust!");

            res.redirect("/listings");
        });

    } catch (err) {

        console.log(err);

        req.flash("error", "Something went wrong.");
        res.redirect("/signup");
    }
};

