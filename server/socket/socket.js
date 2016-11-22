/* websockets */
const SocketIo = require('socket.io');
const chatroomCtrl = require('./../db/controllers/chatroom.js');
const outbound = require('./../devApi/outboundController.js');

module.exports = function(server) {
  const io = new SocketIo(server, {path: '/api/chat'});

  io.on('connection', (socket) => {
    socket.on('new message', (msg) => {
      console.log('message received', msg);
      io.sockets.emit('new bc message', msg);
      chatroomCtrl.findOne(msg.chatroom, (err, chatroom) => {
        if (err) {throw err;}
        const room = chatroom[0];
        if (room === undefined) { throw 'error: chatroom does not exist'; }
        if (room.members.indexOf(msg.user) === -1) {
          room.members.push(msg.user);
        }
        room.messages.push(msg);
        room.save();

        // fake test data will need to remove
        const fakeRoom = {
          id: room.id,
          apps: {
            read: {
              'http://localhost:8002': true,
              'http://localhost:8003': true
            },
            write: {
              'abc': true,
              '123': true
            }
          }
        }
        outbound.send(fakeRoom, msg);
      });
    });
  });

};
