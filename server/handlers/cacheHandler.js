const request = require('request');
const redis = require('./../redis/init.js');

function getUserRepos(req, res) {
  if (!req.isAuthenticated()) return res.status(401).end(); // Bail if not authed

  const username = req.user.username;
  redis.hgetall(username, (e, user) => {
    if (e) console.log(e);

    if (!user) {
      userReposRequest(username, null, (e, response, body) => {
        if (e) console.log(e);
        res.status(200).json(body);

        const status = response.headers.status;
        const etag = response.headers.etag;
        if (status === '200 OK') updateCache(username, etag, body);
      });
    } else {
      res.status(200).json(JSON.parse(user.body));

      userReposRequest(username, user.etag, (e, response, body) => {
        if (e) console.log(e);

        const status = response.headers.status;
        const etag = response.headers.etag;
        if (status === '200 OK') {
          updateCache(username, etag, body);
        }
      });
    }
  });
}

function getRepo(req, res) {
  if (!req.isAuthenticated()) return res.status(401).end(); // Bail if not authed

  const repo = `${ req.params.user }/${ req.params.repo }`;
  redis.hgetall(repo, (e, data) => {
    if (e) console.log(e);

    if (!data) {
      repoRequest(repo, null, (e, response, body) => {
        if (e) console.log(e);
        res.status(200).json(body);

        const status = response.headers.status;
        const etag = response.headers.etag;
        if (status === '200 OK') updateCache(username, etag, body);
      });
    } else {
      repoRequest(repo, data.etag, (e, response, body) => {
        if (e) console.log(e);

        const status = response.headers.status;
        const etag = response.headers.etag;
        if (status === '304 Not Modified') {
          res.status(200).json(JSON.parse(data.body));
        } else {
          res.status(200).json(body);
          if (status === '200 OK') updateCache(repo, etag, body);
        }
      });
    }
  });
}

function repoRequest(repo, etag, cb) {
  const keys = `&client_id=${ process.env.GITHUB_CLIENT_ID }&client_secret=${ process.env.GITHUB_CLIENT_SECRET }`;

  if (!etag) {
    const options = {
      url: `https://api.github.com/repos/${ repo }${ keys }`,
      headers: {
        'User-Agent': 'chasestarr'
      }
    };
    request(options, cb);
  } else {
    const options = {
      url: `https://api.github.com/repos/${ repo }${ keys }`,
      headers: {
        'If-None-Match': etag,
        'User-Agent': 'chasestarr'
      }
    };
    request(options, cb);
  }
}

function userReposRequest(username, etag, cb) {
  const keys = `&client_id=${ process.env.GITHUB_CLIENT_ID }&client_secret=${ process.env.GITHUB_CLIENT_SECRET }`;
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
  getUserRepos,
  getRepo
}
