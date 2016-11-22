
const path = require('path');
// import env variables from .env - if not found, fallback to OS env vars
require('dotenv').config({silent: true, path: path.join(__dirname, '../.env')});
require('aws-sdk');

const express = require('express');
const session = require('express-session');
const passport = require('./passport/config.js');
const bodyParser = require('body-parser');

const api = require('./routes/api.js');
const appRoute = require('./routes/app.js');
const auth = require('./routes/auth.js');
const apps = require('./devApi/inboundController.js');
const socket = require('./socket/socket.js');
const app = express();


/* express server */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ 
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// routes
app.use('/auth', auth);
app.use('/api', api);
app.use('/app', appRoute);
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../public', 'index.html'));   
});

app.get('/dashboard', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../public', 'index.html'));   
});

app.get('/rooms/:username/:reponame', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../public', 'index.html'));   
});

// process 3rd party inbound payloads
app.post('/apps', apps.inbound);

// s3 middleware
app.use('/s3', require('react-s3-uploader/s3router')({
  bucket: "gittalk",
  headers: {'Access-Control-Allow-Origin': '*'}
}));

app.get('*', function(req, res) {
  res.redirect('/');	  
});

const port = process.env.PORT || 8000;
const server = app.listen(port);

console.log(`🌎  ===> server listening on port ${port}`);

/* database intitialization */

const mongoose = require('mongoose'); 

// const uriString = process.env.MONGODB_URI || 'mongodb://localhost/gittalk';
const uriString = 'mongodb://localhost/gittalk';

mongoose.connect(uriString, (err, res) => {
  if (err) { 
    console.log ('ERROR connecting to: ' + uriString + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uriString);
  }
});

/* socket initialization */
socket(server);

module.exports = app;
