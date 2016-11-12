const path = require('path');
// import env variables from .env - if not found, fallback to OS env vars
require('dotenv').config({silent: true, path: path.join(__dirname, '../.env')});


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
app.use(express.static(path.join(__dirname, '../public')));

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../public', 'index.html'));	
});

const port = process.env.PORT || 8000;
app.listen(port);

console.log(`🌎  ===> server listening on port ${port}`);
module.exports = app;
