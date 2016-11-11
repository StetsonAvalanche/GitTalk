const path = require('path');
// import env variables from .env - if not found, fallback to OS env vars
require('dotenv').config({silent: false, path: path.join(__dirname, '../.env')});

const express = require('express');
const session = require('express-session');
const auth = require('./routes/auth.js');
const passport = require('./passport/config.js');
const app = express();

app.use(session({ 
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/auth', auth);

// app.use('/', express.static(path.join(__dirname, '../client/build')));
app.get('/', (req, res) => {
  // will need to change to serve static file
  res.status(200).end('hello world');
});

const port = process.env.PORT || 8000;
app.listen(port);

console.log(`🌎  ===> server listening on port ${port}`);
module.exports = app;
