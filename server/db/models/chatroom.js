var mongoose = require('mongoose');

var chatroomSchema = mongoose.Schema({
	id: {
		type: String, 
		unique: true
	}, 
	members: Array,
	messages: Array,
  apps: Array
});

var ChatroomModel = mongoose.model('Chatroom', chatroomSchema);

module.exports = ChatroomModel; 