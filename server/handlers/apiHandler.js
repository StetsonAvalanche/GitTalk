const chatroomCtrl = require('../db/controllers/chatroom.js');

function chatroomInit(req, res) {
  chatroomCtrl.update(req.body.repo, () => {
    res.status(201).end();
  });
}

function getMessages (req, res) {
  const chatroomId = req.body.chatroomId; 
  chatroomCtrl.findOne(chatroomId, (err, chatroom) => {
    if (err) {throw err;}
    res.status(200).send(JSON.stringify(chatroom[0].messages));
  });
}

module.exports = {
	getMessages: getMessages,
  chatroomInit: chatroomInit
}

