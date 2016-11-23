var ChatroomModel = require('../models/chatroom.js'); 

// findAll retrieves all chatrooms with associated member 
function findAll(member, callback) {
  ChatroomModel.find({members: member}, callback);
}

// findOne retrieves a chatroom with the associated id 
function findOneByIdJSON(id, callback) {
	ChatroomModel.find({id: id}).lean().exec(callback);
} // lean().exec() returns data as JSON instead of mongoose document, needed for amending of existing fields

// findOne retrieves a chatroom with the associated id 
function findOneById(id, callback) {
	ChatroomModel.find({id: id}, callback);
} // returns mongoose document

// updates current chatroom; creates one if it doesn't exist
function update(chatroom, callback) {
  ChatroomModel.update({id: chatroom.id}, chatroom, {upsert: true}, callback);
}

// insertOne inserts a chatroom into the db
function insertOne(chatroom, callback) {
  ChatroomModel.create(chatroom, callback);
}

// options = {
//   field: string[read, write]
//   body: string[endpoint, apiKey]
//   chaatroom: chatroom.id
// }
//
// starting to work on db schema refactor
// function addSubscription(chatroomId, app, cb) {
//   ChatroomModel.findOne({ id: chatroomId }, (err, chatroom) => {
//     if (err) cb(err, null);
//     if (!chatroom) cb(new Error(`chatroom ${ chatroomId } not found`), null);
//     chatroom.apps.read.push(app.endpoint);
//     chatroom.apps.write.push(app.apiKey);
//     chatroom.markModified('apps');
//     chatroom.save((err) => cb(err, chatroom));
//   });
// }

exports.findAll = findAll;
exports.findOneByIdJSON = findOneByIdJSON;
exports.findOneById = findOneById;
exports.insertOne = insertOne;
exports.update = update;
