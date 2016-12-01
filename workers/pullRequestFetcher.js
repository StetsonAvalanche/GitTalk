const request = require('request');
const redis = require('./../server/redis/init.js');

function fetchRepoPullRequests(callback) {

  redis.hgetall('activeChatroomId', (e, room) => {
  	if (e) console.log(e);
    const forkedRepo = room.id;
	  // const repoId = `${room.id}/pulls`; // FIXME
	  const repoId = 'StetsonAvalanche/GitTalk/pulls'; // FIXME
		redis.hgetall(repoId, (e, repo) => {
		  if (e) console.log(e);

		  if (!repo) {
		    repoPullsRequest(repoId, null, (e, response, body) => {
		      if (e) console.log(e);
		      const status = response.headers.status;
		      const etag = response.headers.etag;
		      if (status === '200 OK') updateCache(repoId, etag, body);
		      callback(forkedRepo, JSON.parse(body));
		    });
		  } else {
		    repoPullsRequest(repoId, repo.etag, (e, response, body) => {
		      if (e) console.log(e);

		      const status = response.headers.status;
		      const etag = response.headers.etag;
		      if (status === '304 Not Modified') {
		        callback(forkedRepo, 'Not Modified');
		      } else {
		        if (status === '200 OK') updateCache(repoId, etag, body);
		        callback(forkedRepo, JSON.parse(body));
		      }
		    });
		  }
		});
  });
}


function repoPullsRequest(userRepo, etag, cb) {
  const keys = `&client_id=${ process.env.GITHUB_CLIENT_ID }&client_secret=${ process.env.GITHUB_CLIENT_SECRET }`;
  if (!etag) {
    const options = {
      url: `https://api.github.com/repos/${ userRepo }?per_page=100${ keys }`,
      headers: {
        'User-Agent': 'chasestarr'
      }
    }
    request(options, cb);
  } else {
    const options = {
      url: `https://api.github.com/repos/${ userRepo }?per_page=100${ keys }`,
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


function sendUpdates(cb) {

	setInterval(function(){
	  fetchRepoPullRequests(function(chatroomId, data){
	    cb(chatroomId, data);
	  });
	  
	  }, 20000);
}

module.exports = {
  fetchRepoPullRequests,
  sendUpdates
}

