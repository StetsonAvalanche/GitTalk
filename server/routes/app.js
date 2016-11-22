const express = require('express');
const router = express.Router();
const appHandler = require('../handlers/appHandler.js');

router.post('/create', appHandler.createApp);
router.post('/subscribe', appHandler.subscribeApp);

router.get('/allapps', appHandler.getAllApps);
router.get('/userapps', appHandler.getUserApps);

module.exports = router;
