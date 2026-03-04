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
    logout
} = require("../controllers/users.js");


router.get("/signup", renderSignupForm);
router.post("/signup", wrapAsync(signup));


router.get("/login",redirectIfLoggedIn,renderLoginForm);
router.post(
    "/login",
    redirectIfLoggedIn,
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true
    }),
    wrapAsync(login)
);


router.get("/logout", logout);

module.exports = router;