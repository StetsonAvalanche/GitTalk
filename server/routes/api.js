const express = require('express');
const router = express.Router();
const apiHandler = require('../handlers/apiHandler.js');

router.post('/chatroom/init', apiHandler.chatroomInit);

router.get('/chatroom/:username/:chatroom', apiHandler.getChatroom);

router.post('/email/invite', apiHandler.emailInvite); 

router.post('/repo/pulls', apiHandler.triggerPullRequestFetcher);

router.get('/messages/:username/:chatroom', apiHandler.getMessages);

// user's a member of repos
router.get('/memberrepos/:username', apiHandler.getMemberRepos);

module.exports = router;

