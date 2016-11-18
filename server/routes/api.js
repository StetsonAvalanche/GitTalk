const express = require('express');
const router = express.Router();
const apiHandler = require('../handlers/apiHandler.js');

router.post('/chatroom/init', apiHandler.chatroomInit);

router.post('/email/invite', apiHandler.emailInvite); 

router.get('/messages/:username/:chatroom', apiHandler.getMessages);

// user's a member of repos
router.get('/memberrepos/:username', apiHandler.getMemberRepos);

module.exports = router;

