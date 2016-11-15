const ChatroomController = require('./db/controllers/chatroom.js');

const mongoose = require('mongoose'); 

const uriString = process.env.MONGODB_URI || 'mongodb://localhost/gittalk';

mongoose.connect(uriString, (err, res) => {
  if (err) { 
    console.log ('ERROR connecting to: ' + uriString + '. ' + err);
  } else {
    console.log ('Succeeded connected to: ' + uriString); 
    ChatroomController.insertOne({
      id: 'test567890',
      members: [],
      messages: []
    }, (err, res) => {
      if (err) {
        throw err;
      } else {
        mongoose.connection.close();      
      }
    });
  }
});