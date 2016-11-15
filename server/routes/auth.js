const express = require('express');
const authHandler = require('../handlers/authHandler.js');
const passport = require('../passport/config.js');
const router = express.Router();

// routes for github authentication
router.get('/github', passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }), authHandler.postAuth);

router.get('/logout', authHandler.logout);

// user's a logged in user's data
router.get('/user', authHandler.getUser);

module.exports = router;
