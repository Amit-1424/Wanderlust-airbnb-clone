const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback"
    },

    async (accessToken, refreshToken, profile, done) => {
      try {

        const email = profile.emails[0].value;

        // 1️⃣ check if user already exists with googleId
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          return done(null, user);
        }

        // 2️⃣ check if user exists with same email
        user = await User.findOne({ email });

        if (user) {
          user.googleId = profile.id;
          user.authType = "google";
          await user.save();
          return done(null, user);
        }

        // 3️⃣ create new user
        const newUser = new User({
          username: profile.displayName,
          email: email,
          googleId: profile.id,
          authType: "google"
        });

        await newUser.save();

        return done(null, newUser);

      } catch (err) {
        return done(err, null);
      }
    }
  )
);