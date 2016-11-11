const express = require('express');
const authHandler = require('./../handlers/authHandler.js');
const router = express.Router();

// routes for github authentication

// hello world example
router.get('/github', authHandler.login);

module.exports = router;
