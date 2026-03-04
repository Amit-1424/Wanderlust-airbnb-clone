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

        //google login id exits user
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          return done(null, user);
        }

            // if not login with google check if same email exists
        user = await User.findOne({ email });

        if (user) {
          user.googleId = profile.id;
          user.authType = "google";
          await user.save();
          return done(null, user);
        }

        // if not than cretae user
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