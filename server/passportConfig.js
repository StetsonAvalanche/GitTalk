const passport = require('passport');
const GitHubStrategy = require('passport-github2');
const authHandler = require('./handlers/authHandler.js');

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'http://localhost:8000/auth/github/callback'
}, authHandler.login));

passport.serializeUser((user, done) => {
  console.log(user); // checking to see what is returned on login
  done(null, user);
});

passport.deserializeUser((id, done) => done(null, id));

module.exports = passport;
