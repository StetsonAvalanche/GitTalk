// handles login paths
// request handlers should have the (req, res) argument signature

function helloWorld(req, res) {
  res.status(200).end('hello world');
}

function login(accessToken, refreshToken, profile, done) {
  // check here to see if user is in our db
  // if not, create the user
  done(null, profile);
}

function postAuth(req, res) {
  // Successful authentication, redirect to dashboard.
  res.redirect('/dashboard');
}

function getUser(req, res) {
  if (req.isAuthenticated()) {
    res.json(JSON.stringify(req.user));
  } else {
    res.status(401).end();
  }
}

module.exports = {
  login,
  postAuth,
  getUser,
  helloWorld,
};
