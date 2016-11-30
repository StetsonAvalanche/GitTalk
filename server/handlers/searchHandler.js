const Chatroom = require('../db/controllers/chatroom.js');
const Promise = require('bluebird');

function getAllMessages (req, res) {
  const username = req.params.username;
  Chatroom.findAll(username, (err, chatrooms) => {
    if (err) { 
      throw err;
    } else {
      let messages = [];
      chatrooms.forEach((chatroom) => {
        messages = messages.concat(chatroom.messages);
      });
      res.status(200).send(JSON.stringify(messages));
    } 
  });
}

module.exports = {
  getAllMessages: getAllMessages
};

