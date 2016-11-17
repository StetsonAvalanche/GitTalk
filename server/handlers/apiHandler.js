const chatroomCtrl = require('../db/controllers/chatroom.js');

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


function emailInvite (req, res) {
  // Require the module and set default options 
  // You may use almost any option available in nodemailer,  
  // but if you need fine tuning I'd recommend to consider using nodemailer directly. 
  const send = require('gmail-send')({
    user: 'gittalk.hr49@gmail.com',               // Your GMail account used to send emails 
    pass: 'sllgudocgtykewdv',             // Application-specific password 
    to:   'a.nicknam@gmail.com',      // Send back to yourself 
    // from:   '"User" <user@gmail.com>'  // from: by default equals to user 
    // replyTo:'user@gmail.com'           // replyTo: by default undefined 
    subject: 'test subject',
    text:    'test text'
    // html:    '<b>html text text</b>' 
  });
   
  // var file = './demo.js';        // File to attach 
  // Override any default option and send email 
  send({                         
    subject: 'Hello'   // Override value set as default  
    // files: [file]                // String or array of strings of filenames to attach 
  }, function (err, response) {
    console.log('send(): err:', err, '; res:', response);
    res.status(201).end();
  });

}

module.exports = {
	getMessages: getMessages,
  chatroomInit: chatroomInit,
  getMemberRepos: getMemberRepos
  emailInvite: emailInvite
}

