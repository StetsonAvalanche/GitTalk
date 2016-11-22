const App = require('./../db/controllers/app.js');
const Chatroom = require('../db/controllers/chatroom.js');

const mongoose = require('mongoose'); 

const uriString = process.env.MONGODB_URI || 'mongodb://localhost/gittalk';

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
  Chatroom.findOne(chatroomId, (err, chatroom) => {
    if (err) { 
      throw err;
    } else {
      let room = chatroom[0];
      if (room === undefined) {
        throw 'error: chatroom does not exist';
      }
      let apps = room.apps;
      if (apps[0] === undefined) {
        apps.push({
          read: {},
          write: {}
        });
      }
      apps[0].read[app.endpoint.split('.').join('%dot%')] = true;
      apps[0].write[app.apiKey] = true;

      Chatroom.update(room, () => {
        res.status(201).end();        
      });
    } 
  });
}

function unsubscribeApp(req, res) {
  const app = req.body.app;
  const chatroomId = req.body.reponame;
  Chatroom.findOne(chatroomId, (err, chatroom) => {
    if (err) { 
      throw err;
    } else {
      const room = chatroom[0];
      if (room === undefined) {
        throw 'error: chatroom does not exist';
      }
      if (room.apps[0] === undefined) {
        room.apps.push({
          read: {},
          write: {}
        });
      }
      let apps = room.apps[0];
      delete apps.read[app.endpoint.split('.').join('%dot%')];
      delete apps.write[app.apiKey];

      // database save is working strange, cannot append new objects

      room.save((err, chatroom) => {
        if (err) { console.log(err); }
      });
      console.log(room.apps);
      res.status(201).end();
    } 
  });
}

function getAllApps(req, res) {
  App.findAll((err, result) => {
    if (err) {
      console.log(err);
      res.status(400).end();
    }
    res.status(200).send(JSON.stringify(result));
  });
}

// user

function getUserApps(req, res) {
  const user = req.user.username;

  App.findByOwner(user, (err, result) => {
    if (err) {
      console.log(err);
      res.status(400).end();
    }
    res.status(200).send(JSON.stringify(result));
  });
}

module.exports = {
  createApp,
  subscribeApp,
  getAllApps,
  getUserApps,
}
