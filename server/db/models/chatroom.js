var mongoose = require('mongoose');

// starting to work on db schema refactor
// var appsSchema = mongoose.Schema({
//   read: Array,
//   write: Array
// });

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
