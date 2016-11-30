const express = require('express');
const router = express.Router();
const cacheHandler = require('../handlers/cacheHandler.js');

router.get('/user/repos', cacheHandler.getUserRepos);

router.get('/:user/:repo', cacheHandler.getRepo);

module.exports = router;
