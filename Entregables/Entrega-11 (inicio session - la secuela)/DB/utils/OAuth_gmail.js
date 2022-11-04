const passport = require("passport");
let GoogleStrategy = require("passport-google-oauth20").Strategy();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.OAUTH_CLI_ID,
      clientID: process.env.OAUTH_CLI_SECRET,
    },
    function (accessTocken, refreshTocken, profile, cb) {
      User.findOrCreate(
        {
          googleId: profile.id,
        },
        function (err, user) {
          return cb(err, user);
        }
      );
    }
  )
);
