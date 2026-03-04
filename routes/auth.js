const express = require("express");
const router = express.Router();
const passport = require("passport");


// STEP 1 — redirect user to Google login
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);


// STEP 2 — Google redirects user back here
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    failureFlash: true
  }),
  (req, res) => {
    req.flash("sucess", "Welcome! Logged in with Google.");
    res.redirect("/listings");
  }
);


module.exports = router;