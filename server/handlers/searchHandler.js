const Chatroom = require('../db/controllers/chatroom.js');
const Promise = require('bluebird');

const _genIndex = (messages) => {
  let index = {};

  const _insertIndex = function(key, message, inserted) {
    const lowerCaseKey = key.toLowerCase();
    if (inserted[lowerCaseKey] === undefined) {
      inserted[lowerCaseKey] = true;
      if (index[lowerCaseKey] === undefined) {
        index[lowerCaseKey] = [message];
      } else {
        index[lowerCaseKey] = index[lowerCaseKey].concat([message]);
      }
    }
    return inserted;
  };

  messages.forEach((message) => {
    let inserted = {}; // remove duplicate messages in one key
    // handle message.chatroom e.g. stetsonAvalanche/GitTalk
    if (typeof message.chatroom === 'string') {
      inserted = _insertIndex(message.chatroom, message, inserted);
      var paths = message.chatroom.split('/');
      paths.forEach((path) => {
        inserted = _insertIndex(path, message, inserted);
      });
    }
    // handle message.image, e.g. /assets/GitTalkLogo.png
    if (typeof message.image === 'string') {
      // extract image type
      let splitImgStr = message.image.split('.');
      if (splitImgStr.length === 2) {
        inserted = _insertIndex(splitImgStr[1], message, inserted);
      }
    }
    // handle message.text, e.g. Welcome to GitTalk, chat away!
    if (typeof message.text === 'string') {
      let words = message.text.split(' ');
      words.forEach((word) => {
        const stripPunctuation = word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,'');
        inserted = _insertIndex(stripPunctuation, message, inserted);
      });
    }
    // handle message.type, e.g. message
    if (typeof message.type === 'string') {
      inserted = _insertIndex(message.type, message, inserted);          
    }
    // handle umessage.user, e.g. GitTalk
    if (typeof message.user === 'string') {
      inserted = _insertIndex(message.user, message, inserted);          
    }   
    // no need to handle message.userAvatarUrl
    // /assets/GitTalkLogo.png
  });

  return index;
};

function getIndex (req, res) {
  const username = req.params.username;
  Chatroom.findAll(username, (err, chatrooms) => {
    if (err) { 
      throw err;
    } else {
      let messages = [];
      chatrooms.forEach((chatroom) => {
        messages = messages.concat(chatroom.messages);
      });
      const index = _genIndex(messages);
      res.status(200).send(JSON.stringify(index));
    } 
  });
}

module.exports = {
  getIndex: getIndex,
};

