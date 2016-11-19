
const path = require('path');
// import env variables from .env - if not found, fallback to OS env vars
require('dotenv').config({silent: true, path: path.join(__dirname, '../.env')});
require('aws-sdk');

const express = require('express');
const SocketIo = require('socket.io');
const session = require('express-session');
const auth = require('./routes/auth.js');
const passport = require('./passport/config.js');
const bodyParser = require('body-parser');
const app = express();

const api = require('./routes/api.js');
const chatroomCtrl = require('./db/controllers/chatroom.js');

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

/* database intitialisation */

const mongoose = require('mongoose'); 

const uriString = process.env.MONGODB_URI || 'mongodb://localhost/gittalk';
// const uriString = 'mongodb://localhost/gittalk'; // uncomment to use local database

mongoose.connect(uriString, (err, res) => {
  if (err) { 
    console.log ('ERROR connecting to: ' + uriString + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uriString);    
  }
});

/* websockets */
// FIXME -> all socketEvents should be moved to a seperate file
const io = new SocketIo(server, {path: '/api/chat'});

io.on('connection', (socket) => {
  socket.on('new message', (msg) => {
    console.log('message received', msg);
    io.sockets.emit('new bc message', msg);
    chatroomCtrl.findOne(msg.chatroom, (err, chatroom) => {
      if (err) {throw err;}
      const room = chatroom[0];
      if (room === undefined) { throw 'error: chatroom does not exist'; }
      if (room.members.indexOf(msg.user) === -1) {
        room.members.push(msg.user);
      }
      room.messages.push(msg);
      room.save();
    });
  });
});

module.exports = app;
