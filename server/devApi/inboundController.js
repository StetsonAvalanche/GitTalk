const Chatroom = require('./../db/controllers/chatroom.js');
const App = require('./../db/controllers/app.js');

const fakeRoom = {
  id: 'chasestarr/GitTalk',
  apps: {
    read: {
      'http://localhost:8002': true,
      'http://localhost:8003': true,
      'chasebot%dot%herokuapp%dot%com': true
    },
    write: {
      'abc': true,
      '123': true
    }
  }
}

function inbound(req, res) {
  const payload = req.body;

  if (!payload.apiKey) {
    res.status(400).json({ err: 'apiKey not found in request payload' });
  }

  if (!payload.method) {
    res.status(400).json({ err: 'method not found in request payload' });
  }

  if (!payload.room) {
    res.status(400).json({ err: 'room not found in request payload' });
  }

  Chatroom.findOne(payload.room, (err, chatroom) => {
    if (err) res.status(400).json({ err: 'room not found' });

    // will replace this code with real check
    if (!fakeRoom.apps.write[payload.apiKey]) {
      res.status(400).json({ err: `not authorized to write to ${payload.room}` });
    }

    // real lookup... commented out for now while chatroom schema is updated
    // if (!chatroom.apps.write[payload.apiKey]) {
    //   res.status(400).json({ err: `not authorized to write to ${payload.room}` });
    // }

    // find app name
    App.findOneByKey(payload.apiKey, (err, app) => {
      // if (err) res.status(400).json({ err: 'app not found' });
      if (err) console.log(err);

      const message = {
        type: !!payload.action.image ? 'image': 'text',
        chatroom: payload.room,
        image: payload.action.image,
        text: payload.action.text,
        userAvatarUrl: payload.action.avatar
      }

      const room = chatroom[0];
      room.messages.push(message);
      room.save();
    });

    res.status(201).end();
  });
}

module.exports = {
  inbound
};

