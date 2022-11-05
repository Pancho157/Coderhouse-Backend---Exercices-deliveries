const passport = require("passport");
const { Strategy: GoogleStrategy } = require("passport-google-oauth20");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.OAUTH_CLI_ID,
      clientSecret: process.env.OAUTH_CLI_SECRET,
      callbackURL: process.env.OAUTH_REDIRECT_URL,
      scope: ["email", "profile"],
    },
    async (accessTocken, refreshTocken, profile, done) => {
      console.log();
      console.log();
      console.log(accessTocken);
      console.log();
      console.log();
      console.log(profile);
      console.log();
      console.log();
      console.log(done);
    }
  )
);
