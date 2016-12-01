const request = require('request');
const redis = require('./../server/redis/init.js');
const { repoRequest , updateCache } = require('./../server/handlers/cacheHandler.js');

function fetchRepoPullRequests(callback) {

  redis.hgetall('activeChatroomId', (e, room) => {
  	if (e) console.log(e);
    const chatroomId = room.id;
	  // const repoId = `${room.id}/pulls`; // FIXME
	  getParentRepo(chatroomId, (parentRepoId) => {
	    // const repoId = 'StetsonAvalanche/GitTalk/pulls'; // FIXME
      const repoId = parentRepoId;
			redis.hgetall(repoId, (e, repo) => {
			  if (e) console.log(e);

			  if (!repo) {
			    repoPullsRequest(repoId, null, (e, response, body) => {
			      if (e) console.log(e);

			      const status = response.headers.status;
			      const etag = response.headers.etag;
			      if (status === '200 OK') updateCache(repoId, etag, body);
			      callback(chatroomId, JSON.parse(body));
			    });
			  } else {
			    repoPullsRequest(repoId, repo.etag, (e, response, body) => {
			      if (e) console.log(e);

			      const status = response.headers.status;
			      const etag = response.headers.etag;
			      if (status === '304 Not Modified') {
			        callback(chatroomId, 'Not Modified');
			      } else {
			        if (status === '200 OK') updateCache(repoId, etag, body);
			        callback(chatroomId, JSON.parse(body));
			      }
			    });
			  }
			});
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



function getParentRepo(forkedRepo, cb) {
  const forkedRepoKey = `${ forkedRepo }/child`;
  redis.hgetall(forkedRepoKey, (e, data) => {
    if (e) console.log(e);

    if (!data) {
    	console.log(repoRequest)
      repoRequest(forkedRepo, null, (e, response, body) => {
        if (e) console.log(e);

        const status = response.headers.status;
        const etag = response.headers.etag;
        if (status === '200 OK') {
        	redis.hmset(forkedRepoKey, ['parentRepo', JSON.stringify(body)]);
        };
        console.log('INSIDE NO DATA - body', response.headers.status)
        cb(JSON.parse(body).parent.full_name);
      });
    } else {
      repoRequest(forkedRepo, data.etag, (e, response, body) => {
        if (e) console.log(e);

        const status = response.headers.status;
        const etag = response.headers.etag;
        if (status === '304 Not Modified') {
          cb(JSON.parse(data.body).parent.full_name);
        } else {
          if (status === '200 OK') {
          	redis.hmset(forkedRepoKey, ['parentRepo', JSON.stringify(body)]);
          };
          cb(JSON.parse(body).parent.full_name);
        }
      });
    }
  });
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

