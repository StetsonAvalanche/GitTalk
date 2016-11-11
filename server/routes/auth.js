const express = require('express');
const authHandler = require('./../handlers/authHandler.js');
const passport = require('./../passportConfig.js');
const router = express.Router();

// routes for github authentication

// hello world example
router.get('/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }), authHandler.postLogin);

module.exports = router;
