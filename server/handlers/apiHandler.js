const chatroomCtrl = require('../db/controllers/chatroom.js');

function chatroomInit(req, res) {
  chatroomCtrl.update(req.body.repo, () => {
    res.status(201).end();
  });
}

function getMessages (req, res) {
  const chatroomId = req.params.username + '/' + req.params.chatroom; 
  chatroomCtrl.findOne(chatroomId, (err, chatroom) => {
    if (err) { 
      throw err;
    } else {
	  res.status(200).send(JSON.stringify(chatroom[0].messages));
    } 
  });
}

module.exports = {
	getMessages: getMessages,
  chatroomInit: chatroomInit
}

