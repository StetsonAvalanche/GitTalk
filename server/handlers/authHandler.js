// handles login paths
// request handlers should have the (req, res) argument signature

function helloWorld(req, res) {
  res.status(200).end('hello world');
}

function login(accessToken, refreshToken, profile, done) {
  // check here to see if user is in our db
  // if not, create the user
  // It would be cool if we could return a jwt to the front-end with user info

  console.log(profile); // check to see what is returned from github
  done(null, profile);
}

function postLogin(req, res) {
  // Successful authentication, redirect home.

  console.log(req.isAuthenticated());
  res.redirect('/dashboard');
}

module.exports = {
  login,
  postLogin,
  helloWorld,
};
