
const path = require('path');
// import env variables from .env - if not found, fallback to OS env vars
require('dotenv').config({silent: true, path: path.join(__dirname, '../.env')});


const express = require('express');
const SocketIo = require('socket.io');
const session = require('express-session');
const auth = require('./routes/auth.js');
const passport = require('./passport/config.js');
const app = express();
const bodyParser = require('body-parser');

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

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../public', 'index.html'));	  
});

const port = process.env.PORT || 8000;
const server = app.listen(port);

console.log(`🌎  ===> server listening on port ${port}`);

/* database intitialisation */

const mongoose = require('mongoose'); 

const uriString = process.env.MONGODB_URI || 'mongodb://localhost/gittalk';

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
    /* need to store msg in database */
    chatroomCtrl.findOne(msg.chatroom, (err, chatroom) => {
      if (err) {throw err;}
      chatroom[0].messages.push(msg);
      chatroom[0].save();
    })


  });
});

module.exports = app;
