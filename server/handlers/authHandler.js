// handles login paths
// request handlers should have the (req, res) argument signature
const User = require('./../db/controllers/user.js');

function login(accessToken, refreshToken, profile, done) {
  let user = {
    id: profile._json.login
  }
  User.update(user, (err) => {
    if (err) done(err);
    done(null, profile);
  });
}

function logout(req, res) {
  req.session.passport = null;
  res.redirect('/');
}

function postAuth(req, res) {
  // Successful authentication, redirect to dashboard.
  res.redirect('/dashboard');
}

// returns logged in user's data
function getUser(req, res) {
  if (req.isAuthenticated()) {
    res.json(JSON.stringify(req.user));
  } else {
    res.status(401).end();
  }
}

module.exports = {
  login,
  logout,
  postAuth,
  getUser,
};
