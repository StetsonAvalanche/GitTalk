const { repoPullsRequest, updateCache } = require('./../server/handlers/cacheHandler.js');
const redis = require('./../server/redis/init.js');

function fetchRepoPullRequests() {

  redis.hgetall('activeChatroomId', (e, room) => {
  	if (e) console.log(e);

	  const repoId = `${room.id}/pulls`;
	  console.log(repoId)
		redis.hgetall(repoId, (e, repo) => {
		  if (e) console.log(e);

		  if (!repo) {
		    repoPullsRequest(repoId, null, (e, response, body) => {
		      if (e) console.log(e);
		      // res.status(200).json(body);

		      const status = response.headers.status;
		      const etag = response.headers.etag;
		      if (status === '200 OK') updateCache(repoId, etag, body);
		      return body;
		    });
		  } else {
		    repoPullsRequest(repoId, repo.etag, (e, response, body) => {
		      if (e) console.log(e);

		      const status = response.headers.status;
		      const etag = response.headers.etag;
		      if (status === '304 Not Modified') {
		        // res.status(200).json(JSON.parse(user.body));
		        // return JSON.parse(repo.body);
		        return 'Not Modified';
		      } else {
		        if (status === '200 OK') updateCache(repoId, etag, body);
		        // res.status(200).json(body);
		        return body;
		      }
		    });
		  }
		});
  });
}

module.exports = {
  fetchRepoPullRequests
}

