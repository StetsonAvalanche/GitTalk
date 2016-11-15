const Chatroom = require('./../db/controllers/chatroom.js');

function chatroomInit(req, res) {
	Chatroom.update(req.body.repo, () => {
		res.status(201).end();
	});
}

exports.chatroomInit = chatroomInit;