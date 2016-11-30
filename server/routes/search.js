const express = require('express');
const router = express.Router();
const searchHandler = require('../handlers/searchHandler.js');

router.get('/messages/:username', searchHandler.getAllMessages);

module.exports = router;