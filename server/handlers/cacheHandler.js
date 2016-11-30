const request = require('request');
const redis = require('./../redis/init.js');

function getUserRepos(req, res) {
  if (!req.isAuthenticated()) return res.status(401).end(); // Bail if not authed

  const username = req.user.username;
  redis.hgetall(username, (e, user) => {
    if (e) console.log(e);

    if (!user) {
      githubRequest(username, null, (e, response, body) => {
        if (e) console.log(e);
        res.status(200).json(body);

        const status = response.headers.status;
        const etag = response.headers.etag;
        if (status === '200 OK') updateCache(username, etag, body);
      });
    } else {
      githubRequest(username, user.etag, (e, response, body) => {
        if (e) console.log(e);

        const status = response.headers.status;
        const etag = response.headers.etag;
        if (status === '304 Not Modified') {
          res.status(200).json(user.body);
        } else {
          res.status(200).json(body);
          if (status === '200 OK') updateCache(username, etag, body);
        }
      });
    }
  });
}

function githubRequest(username, etag, cb) {
  const keys = `&client_id=0a1f44ddf5d9aefe2880&client_secret=2e58fc8d180701020cc86225d352e72a678dd5e2`;
  if (!etag) {
    const options = {
      url: `https://api.github.com/users/${ username }/repos?per_page=100${ keys }`,
      headers: {
        'User-Agent': 'chasestarr'
      }
    }
    request(options, cb);
  } else {
    const options = {
      url: `https://api.github.com/users/${ username }/repos?per_page=100${ keys }`,
      headers: {
        'If-None-Match': etag,
        'User-Agent': 'chasestarr'
      }
    }
    request(options, cb);
  }
}

function updateCache(key, etag, body) {
  redis.hmset(key, ['etag', etag, 'body', JSON.stringify(body)]);
}

module.exports = {
  getUserRepos
}
