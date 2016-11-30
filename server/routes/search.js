const express = require('express');
const router = express.Router();
const searchHandler = require('../handlers/searchHandler.js');

router.get('/index/:username', searchHandler.getIndex);

module.exports = router;