const App = require('./../db/controllers/app.js');
const Chatroom = require('../db/controllers/chatroom.js');

function createApp(req, res) {
  const app = {
    name: req.body.name,
    category: req.body.category,
    endpoint: req.body.endpoint,
    owner: req.body.owner
  };

  App.insertOne(app, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).end();
    }

    res.status(201).end();
  });
}

function subscribeApp(req, res) {
  const app = req.body.app;
  const chatroomId = req.body.reponame;
  Chatroom.findOneByIdJSON(chatroomId, (err, chatroom) => {
    // method returns JSON instead of mongoose document
    // so that existing fields can be edited
    if (err) { 
      throw err;
    } else {
      let room = chatroom[0];
      if (room === undefined) {
        res.status(400).end();
      } else {
        room.apps[0].read[app.endpoint.split('.').join('%dot%')] = true;
        room.apps[0].write[app.apiKey] = true;

        Chatroom.update(room, () => {
          res.status(201).end();        
        });        
      }
    } 
  });
}

function unsubscribeApp(req, res) {
  const app = req.body.app;
  const chatroomId = req.body.reponame;
  Chatroom.findOneByIdJSON(chatroomId, (err, chatroom) => {
    // method returns JSON instead of mongoose document
    // so that existing fields can be edited
    if (err) { 
      throw err;
    } else {
      let room = chatroom[0];
      if (room === undefined) {
        res.status(400).end();
      } else {
        delete room.apps[0].read[app.endpoint.split('.').join('%dot%')];
        delete room.apps[0].write[app.apiKey];

        Chatroom.update(room, () => {
          res.status(201).end();        
        });        
      }
    } 
  });
}

function getAllApps(req, res) {
  App.findAll((err, result) => {
    if (err) {
      console.log('error in getAllApps', err);
      res.status(400).end();
    }
    res.status(200).send(JSON.stringify(result));
  });
}

function getSubscriptions(req, res) {
  const chatroomId = req.params.username + '/' + req.params.chatroom;
  Chatroom.findOneById(chatroomId, (err, chatroom) => {
    if (err) { 
      throw err;
    } else {
      let room = chatroom[0];
      if (room === undefined) {
        res.status(400).end();
      } else {
        res.status(200).send(JSON.stringify(room.apps[0])); 
      }
    } 
  });
}

function getUserApps(req, res) {
  const user = req.user.username;

  App.findByOwner(user, (err, result) => {
    if (err) {
      console.log('error in getUserApps', err);
      res.status(400).end();
    }
    res.status(200).send(JSON.stringify(result));
  });
}

module.exports = {
  createApp,
  subscribeApp,
  unsubscribeApp,
  getAllApps,
  getSubscriptions,
  getUserApps,
}
