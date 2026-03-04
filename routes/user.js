const express = require("express");
const router = express.Router();

const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl,redirectIfLoggedIn } = require("../middleware.js");
const {
    renderSignupForm,
    signup,
    renderLoginForm,
    login,
    logout,
    verifyEmail,
    handleUnverifiedUser 

} = require("../controllers/users.js");


router.get("/signup", renderSignupForm);
router.post("/signup", wrapAsync(signup));


router.get("/login",redirectIfLoggedIn,renderLoginForm);
// router.post(
//     "/login",
//     redirectIfLoggedIn,
//     saveRedirectUrl,
//     console.log("LOGIN ATTEMPT:", req.body.email),
//     passport.authenticate("local", {
//         failureRedirect: "/login",
//         failureFlash: true
//     }),
//     wrapAsync(login)
// );
router.post("/login", redirectIfLoggedIn, saveRedirectUrl, (req, res, next) => {

    passport.authenticate("local", (err, user, info) => {

        if (err) return next(err);

        if (!user) {
            req.flash("error", info.message || "Invalid credentials");
            return res.redirect("/login");
        }

        if (!user.isVerified) {
            req.flash("error", "Please verify your email before logging in.");
            return res.redirect("/signup");
        }

        req.logIn(user, (err) => {
            if (err) return next(err);

            req.flash("success", `Welcome back ${user.username}`);

            const redirectUrl = res.locals.redirectUrl || "/listings";
            res.redirect(redirectUrl);
        });

    })(req, res, next);

});


router.get("/logout", logout);

router.get("/verify/:token", verifyEmail);

module.exports = router;