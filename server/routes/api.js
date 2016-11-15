const express = require('express');
const router = express.Router();
const apiHandler = require('../handlers/apiHandler.js');

router.post('/chatroom/init', apiHandler.chatroomInit); 

router.get('/messages/:username/:chatroom', apiHandler.getMessages);

module.exports = router;

