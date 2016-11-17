const chatroomCtrl = require('../db/controllers/chatroom.js');
const gmailSend = require('gmail-send');
const Promise = require('bluebird');


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
   
  const emailList = ['a.nicknam@gmail.com', 't@tonyktan.com', 'chasestarr@gmail.com'];
   
  var sendEmail = function(emailAddress) {
    return new Promise((resolve, reject) => {
      const send = gmailSend({
        user: 'gittalk.hr49@gmail.com',       /* GMail account used to send emails */ 
        pass: 'sllgudocgtykewdv',             /* Application-specific password */
        to: emailAddress,       
        text: req.body.chatroomUrl,
        // html:    '<b>html text text</b>' 
      });
       
       const inviterUsername = req.body.chatroomUrl.split('/')[2];
       const inviterChatroom = req.body.chatroomUrl.split('/')[3];
      // const file = './demo.js';        // File to attach 

      /* Override any default option and send email */ 
      send({                         
        subject: '\'' + inviterUsername + '\'' + ' invited you to join chatroom \'' + inviterChatroom + '\''  /*Override value set as default */
        // files: [file]                // String or array of strings of filenames to attach 
      }, function (err, response) {
        console.log('send(): err:', err, '; res:', response);
      });
    
    });
  }

  var promises = [];
  for (var i = 0; i < emailList.length; i++) {
    promises.push(sendEmail(emailList[i]));
  }

  Promise.all(promises).then(() => {
    res.status(201).end();
  }).catch((err) => {
    console.log(err);
  })
  } 



module.exports = {
	getMessages: getMessages,
  chatroomInit: chatroomInit,
  getMemberRepos: getMemberRepos,
  emailInvite: emailInvite
}

