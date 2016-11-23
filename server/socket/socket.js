/* websockets */
const SocketIo = require('socket.io');
const chatroomCtrl = require('./../db/controllers/chatroom.js');
const outbound = require('./../devApi/outboundController.js');

let io;

function listen(server) {
  io = new SocketIo(server, {path: '/api/chat'});

  io.on('connection', (socket) => {
    socket.on('new message', (msg) => {
      console.log('message received', msg);
      io.sockets.emit('new bc message', msg);
      chatroomCtrl.findOneById(msg.chatroom, (err, chatroom) => {
        if (err) {throw err;}
        const room = chatroom[0];
        if (room === undefined) { throw 'error: chatroom does not exist'; }
        if (room.members === undefined) {
          room.members = [];
        }
        if (room.members.indexOf(msg.user) === -1) {
          room.members.push(msg.user);
        }
        if (room.messages === undefined) {
          room.messages = [];
        }
        room.messages.push(msg);

        room.save();
        // chatroomCtrl.update(room, () => {
        if (room.apps[0].read) outbound.send(room, msg);
        // });
      });
    });
  });
};

function updateMessage(message) {
  io.sockets.emit('new bc message', message);
}

module.exports = {
  io,
  listen,
  updateMessage
}