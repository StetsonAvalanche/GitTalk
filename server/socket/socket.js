/* websockets */
const SocketIo = require('socket.io');
const chatroomCtrl = require('./../db/controllers/chatroom.js');
const outbound = require('./../devApi/outboundController.js');

let io;

function listen(server) {
  io = new SocketIo(server, {path: '/chat'});

  io.on('connection', (socket) => {
    socket.on('join chatroom', function(chatroom) {
      console.log('joined chatroom', chatroom.id)
      socket.join(chatroom.id);
    });

    socket.on('new message', (msg) => {
      console.log('message received', msg);
      // io.sockets.emit('new bc message', msg);
      socket.broadcast.to(msg.chatroom).emit('new bc message', msg);
      chatroomCtrl.findOneById(msg.chatroom, (err, chatroom) => {
        if (err) {throw err;}
        const room = chatroom[0];
        if (room === undefined) { throw 'error: chatroom does not exist'; }
        if (room.members.indexOf(msg.user) === -1) {
          room.members.push(msg.user);
        }
        room.messages.push(msg);
        room.save();

        if (room.apps) {
          if (room.apps[0].read) outbound.send(room, msg);
        }

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
