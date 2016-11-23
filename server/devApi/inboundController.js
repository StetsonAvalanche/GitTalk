const Chatroom = require('./../db/controllers/chatroom.js');
const App = require('./../db/controllers/app.js');

function inbound(req, res) {
  const payload = req.body;
  const err = _ensureRequired(payload);
  if (err) res.status(400).json(err);

  _verifyRoomWriteAccess(payload.room, payload.apiKey, (err, chatroom) => {
    if (err) res.status(400).json(err);

    App.findOneByKey(payload.apiKey, (err, app) => {
      if (err) res.status(400).json({ err: 'app not found' });

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

function _ensureRequired(payload) {
  if (!payload.apiKey) {
    return { err: 'apiKey field not found in inbound payload' };
  }

  if (!payload.method) {
    return { err: 'method field not found in inbound payload' };
  }

  if (!payload.room) {
    return { err: 'room field not found in inbound payload' };
  }
}

function _verifyRoomWriteAccess(room, key, cb) {
  Chatroom.findOne(room, (err, chatroom) => {
    if (err) cb({ err: `${room} not found` }, null);

    if (!chatroom.apps.write[payload.apiKey]) {
      res.status(400).json({ err: `not authorized to write to ${payload.room}` });
    }

    cb(null, chatroom);
  });
}

module.exports = {
  inbound
};

