const express = require('express');
const router = express.Router();
<<<<<<< 6ab62a972e22fefeb71a5b8a4ff276b938b2d366
const apiHandler = require('../handlers/apiHandler.js');

router.post('/chatroom/init', apiHandler.chatroomInit); 

module.exports = router;
