// handles login paths
// request handlers should have the (req, res) argument signature

function login(req, res) {
  res.status(200).end('hello world');
}

module.exports = {
  login
};
