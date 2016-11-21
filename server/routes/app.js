const express = require('express');
const router = express.Router();
const appHandler = require('../handlers/appHandler.js');

router.get('/create', appHandler.createApp);

module.exports = router;

