const express = require('express');
const router = express.Router();
const cacheHandler = require('../handlers/cacheHandler.js');

router.get('/user/repos', cacheHandler.getUserRepos);

// router.get('/user/repos', function(req, res) {
//   console.log('in router');
//   cacheHandler.getUserRepos(req, res);
// });

module.exports = router;
