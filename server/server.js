
const path = require('path');
// import env variables from .env - if not found, fallback to OS env vars
require('dotenv').config({silent: true, path: path.join(__dirname, '../.env')});


const express = require('express');
const SocketIo = require('socket.io');
const session = require('express-session');
const auth = require('./routes/auth.js');
const passport = require('./passport/config.js');
const app = express();

/* express server */

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

const io = new SocketIo(server, {path: '/api/chat'});

io.on('connection', (socket) => {
  socket.on('new message', (msg) => {
    console.log('message received', msg);
    socket.emit('new bc message', msg);
    /* need to store msg in database */
  });
});

module.exports = app;
