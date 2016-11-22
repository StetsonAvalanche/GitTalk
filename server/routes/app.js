const express = require('express');
const router = express.Router();
const appHandler = require('../handlers/appHandler.js');

router.post('/create', appHandler.createApp);
router.post('/subscribe', appHandler.subscribeApp);
router.post('/unsubscribe', appHandler.unsubscribeApp);

router.get('/allapps', appHandler.getAllApps);
router.get('/subscriptions/:username/:chatroom', appHandler.getSubscriptions);
router.get('/userapps', appHandler.getUserApps);

module.exports = router;
