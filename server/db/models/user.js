var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	id: {
		type: String, 
		unique: true
	}, 
	repos: Array
});

var UserModel = mongoose.model('User', userSchema); 

module.exports = UserModel; 
