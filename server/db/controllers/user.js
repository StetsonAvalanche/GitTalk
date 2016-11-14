var UserModel = require('../models/user.js'); 

// findOne retrieves a user with the associated id 
function findOne(id, callback) {
	UserModel.find({id: id}, callback);
}

// updates current user; creates one if it doesn't exist
function update(user, callback) {
  UserModel.update({id: user.id}, user, {upsert: true}, callback);
}

// insertOne inserts a user into the db
function insertOne(user, callback) {
  UserModel.create(user, callback);
}

exports.findOne = findOne;
exports.insertOne = insertOne;
exports.update = update;
