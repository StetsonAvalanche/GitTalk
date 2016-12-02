const request = require('request');
const redis = require('./../server/redis/init.js');
const { repoRequest , updateCache } = require('./../server/handlers/cacheHandler.js');
const Promise = require('bluebird');
const _ = require('underscore');

function fetchRepoPullRequests(callback) {
  redis.hgetall('activeChatroomId', (e, room) => {
  	if (e) console.log(e);

    const chatroomId = room.id;
	  getParentRepo(chatroomId, (parentRepoId) => {
	    const repoId = `${parentRepoId}/pulls`; 
			redis.hgetall(repoId, (e, repo) => {
			  if (e) console.log(e);

			  if (!repo) {
			    repoPullsRequest(repoId, null, (e, response, body) => {
			      if (e) console.log(e);

			      const status = response.headers.status;
			      const etag = response.headers.etag;
			      const pullRequests = JSON.parse(body); // array of JSON pull requests
			      const pullRequestIds = pullRequests.map((pr) => {return pr.id;});
			      if (status === '200 OK') updateCache(repoId, etag, pullRequestIds);
			      callback(chatroomId, pullRequests);
			    });
			  } else {
			    repoPullsRequest(repoId, repo.etag, (e, response, body) => {
			      if (e) console.log(e);

			      const status = response.headers.status;
			      const etag = response.headers.etag;
			      if (status === '304 Not Modified') {
			        callback(chatroomId, '');
			      } else {
			      	const pullRequests = JSON.parse(body); // array of JSON pull requests
			      	const pullRequestIds = pullRequests.map((pr) => {return pr.id;});
              const cachedPullRequestIds = redis.hgetall(repoId, (e, repo) => {
				      	const newPullRequestIds = _.difference(pullRequestIds, JSON.parse(repo.body));
				      	if (status === '200 OK') updateCache(repoId, etag, pullRequestIds);
				      	const newPullRequests = pullRequests.filter((pr) => {
				      		if (_.contains(newPullRequestIds, pr.id)) {return pr;}
				      	});
				      	callback(chatroomId, newPullRequests);
              });
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
      repoRequest(forkedRepo, null, (e, response, body) => {
        if (e) console.log(e);

        const status = response.headers.status;
        const etag = response.headers.etag;
        if (status === '200 OK') {
        	redis.hmset(forkedRepoKey, ['parentRepo', JSON.stringify(body)]);
        };
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

function requestDiffFile(diffURL){
	const keys = `&client_id=${ process.env.GITHUB_CLIENT_ID }&client_secret=${ process.env.GITHUB_CLIENT_SECRET }`;
  return new Promise((resolve, reject) => {
  	let options = {
  	  url: `${ diffURL }?per_page=100${ keys }`,
  	  headers: {
  	    'User-Agent': 'chasestarr'
  	  }
  	}
  	request(options, (e, response, body) => {
  		if (e) {
  			reject(e)
  		} else {
  			console.log('returned diff file', body);
  		  resolve(body);
  		}
  	});
  })
}

function getPullRequestDiff(diffURLs, cb){
  let promises = [];
  for (let i = 0; i < diffURLs.length; i++){
  	promises.push(requestDiffFile(diffURLs[i]));
  }
  Promise.all(promises).then((diffFiles) => {
  	cb(diffFiles);
  })
}

function sendUpdates(cb) {
	setInterval(function(){
	  fetchRepoPullRequests(function(chatroomId, data){
	    cb(chatroomId, data);
	  });
	  // cb('anicknam/GitTalk', [{diff_url: 'www.cnn.com'}])
	}, 20000);
}

module.exports = {
  fetchRepoPullRequests,
  sendUpdates
}

