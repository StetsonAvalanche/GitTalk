var mongoose = require('mongoose');

var userSchmea = mongoose.Schmea({
	id: {
		type: String, 
		unique: true
	}, 
	repos: Array
});

var UserModel = mongoose.model('User', userSchmea); 

module.exports = UserModel; 
