/* websockets */
const SocketIo = require('socket.io');
const chatroomCtrl = require('./../db/controllers/chatroom.js');
const outbound = require('./../devApi/outboundController.js');
const request = require('request');

let io;

function listen(server) {
  io = new SocketIo(server, {path: '/chat'});

  io.on('connection', (socket) => {
    // socket.on('join chatroom', function(chatroom) {
    //   console.log('joined chatroom', chatroom.id)
    //   socket.join(chatroom.id);
    // });

    socket.on('new message', (msg) => {
      console.log('message received', msg);
      io.sockets.emit(msg.chatroom, msg);
      // socket.broadcast.to(msg.chatroom).emit(msg.chatroom, msg);
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

    const pullRequestURL = 'https://api.github.com/repos/StetsonAvalanche/GitTalk/pulls';

    setInterval(function(){

       request(`${pullRequestURL}?client_id=0a1f44ddf5d9aefe2880&client_secret=2e58fc8d180701020cc86225d352e72a678dd5e2`, 
        function (error, response, body) {
         if (!error) {
           console.log(body) // Print the body of response.
         }
       })
      let newMessage = {
        type: 'text',
        user: '',
        userAvatarUrl: '',
        chatroom: 'StetsonAvalanche/GitTalk',
        image: '',
        text: 'HELLO'
      };
      
      // socket.emit(newMessage.chatroom, newMessage);
      }, 20000);

  });
};


function updateMessage(message) {
  io.sockets.emit(message.chatroom, message);
}


module.exports = {
  io,
  listen,
  // updateMessage
}
