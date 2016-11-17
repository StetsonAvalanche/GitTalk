const chatroomCtrl = require('../db/controllers/chatroom.js');
const gmailSend = require('gmail-send');

function chatroomInit(req, res) {
  chatroomCtrl.update(req.body.repo, () => {
    res.status(201).end();
  });
}

function getMessages (req, res) {
  const chatroomId = req.params.username + '/' + req.params.chatroom; 
  chatroomCtrl.findOne(chatroomId, (err, chatroom) => {
    if (err) { 
      throw err;
    } else {
      if (chatroom[0] === undefined) {
        throw 'error: chatroom does not exist';
      } else if (chatroom[0].messages === undefined) {
        chatroom[0].messages = [];
      }
  	  res.status(200).send(JSON.stringify(chatroom[0].messages));
    } 
  });
}

function getMemberRepos (req, res) {
  const username = req.params.username; 
  chatroomCtrl.findAll(username, (err, chatrooms) => {
    if (err) { 
      throw err;
    } else {
      res.status(200).send(JSON.stringify(chatrooms));
    } 
  });
}

function emailInvite (req, res) {
   
  const send = gmailSend({
    user: 'gittalk.hr49@gmail.com',       /* GMail account used to send emails */ 
    pass: 'sllgudocgtykewdv',             /* Application-specific password */
    to: 'a.nicknam@gmail.com',       
    text: req.body.chatroomUrl,
    // html:    '<b>html text text</b>' 
  });
   
   const inviterUsername = req.body.chatroomUrl.split('/')[2];
   const inviterChatroom = req.body.chatroomUrl.split('/')[3];
  // const file = './demo.js';        // File to attach 

  /* Override any default option and send email */ 
  send({                         
    subject: '\'' + inviterUsername + '\'' + ' invited you to join chatroom \'' + inviterChatroom + '\''  // Override value set as default  
    // files: [file]                // String or array of strings of filenames to attach 
  }, function (err, response) {
    console.log('send(): err:', err, '; res:', response);
    res.status(201).end();
  });

}

module.exports = {
	getMessages: getMessages,
  chatroomInit: chatroomInit,
  getMemberRepos: getMemberRepos,
  emailInvite: emailInvite
}

