const Chatroom = require('./../db/controllers/chatroom.js');
const App = require('./../db/controllers/app.js');
const io = require('./../socket/socket.js');

function inbound(req, res) {
  const payload = req.body;
  const err = _ensureRequired(payload);
  if (err) return res.status(400).json(err);

  _verifyRoomWriteAccess(payload.room, payload.apiKey, (err, chatroom) => {
    if (err) return res.status(400).json(err);

    App.findOneByKey(payload.apiKey, (err, app) => {
      if (err) return res.status(400).json({ err: 'app not found' });
      if (app) {
        const message = {
          type: !!payload.action.image ? 'image': 'text',
          chatroom: payload.room,
          image: payload.action.image,
          text: payload.action.text,
          userAvatarUrl: payload.action.avatar,
          user: app.name
        };

        const room = chatroom[0];
        room.messages.push(message);
        room.save();

        // io.sockets.emit('new bc message', message);
        io.updateMessage(message);
      }
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

function _verifyRoomWriteAccess(roomId, key, cb) {
  Chatroom.findOneById(roomId, (err, chatroom) => {
    if (err) cb({ err: `${room} not found` }, null);

    if (!chatroom[0].apps[0].write[key]) {
      cb({ err: `not authorized to write to ${roomId}` }, null);
    }

    cb(null, chatroom);
  });
}

module.exports = {
  inbound
};

