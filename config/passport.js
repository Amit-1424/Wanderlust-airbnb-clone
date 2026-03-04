const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("../models/user");

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    User.authenticate()
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());