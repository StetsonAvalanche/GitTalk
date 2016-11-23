const Chatroom = require('./../db/controllers/chatroom.js');
const App = require('./../db/controllers/app.js');
const SocketIo = require('socket.io');
const server = require('./../server.js').server;

const io = new SocketIo(server, {path: '/api/chat'});

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
        userAvatarUrl: payload.action.avatar,
        user: app.name
      };

      const room = chatroom[0];
      console.log(room, 'room');
      room.messages.push(message);
      io.on('connection', (socket) => {
        console.log('connected to sockets');
        io.sockets.emit('new bc message', message);
      });

      Chatroom.update(room, () => {});
      // room.save();
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

    if (!chatroom[0].apps[0].write[key]) {
      cb({ err: `not authorized to write to ${room}` }, null);
    }

    cb(null, chatroom);
  });
}

module.exports = {
  inbound
};

