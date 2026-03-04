const User = require("../models/user.js");
const passport = require("passport");

// Render Signup
module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup.ejs");
};

// Signup
module.exports.signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email });
        let registeredUser = await User.register(newUser, password);

        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("sucess", "welcome to wanderlust !");
            res.redirect("/listings");
        });

    } catch (e) {
        req.flash("error", e.message);
        console.log(e);
        res.redirect("/signup");
    }
};

// Render Login
module.exports.renderLoginForm = (req, res) => {
    res.render("users/login.ejs");
};

// Login
module.exports.login = async (req, res) => {
    let username = req.user.username
    req.flash("sucess", ` welcome Back ${username} `);
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
};

// Logout
module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            next(err);
        }
        req.flash("sucess", "you are logged out!");
        res.redirect("/listings");
    });
};