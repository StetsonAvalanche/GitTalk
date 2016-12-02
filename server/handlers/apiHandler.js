const chatroomCtrl = require('../db/controllers/chatroom.js');
const gmailSend = require('gmail-send');
const Promise = require('bluebird');
const redis = require('./../redis/init.js');
const { sendUpdates } = require('./../../workers/pullRequestFetcher.js');
const { updateMessage } = require('./../socket/socket.js');


function chatroomInit(req, res) {
  chatroomCtrl.update(req.body.repo, () => {
    res.status(201).end();
  });
}

function getChatroom (req, res) {
  const chatroomId = req.params.username + '/' + req.params.chatroom; 
  chatroomCtrl.findOneById(chatroomId, (err, chatroom) => {
    if (err) { 
      throw err;
    } else {
      if (chatroom[0] === undefined) {
        res.status(200).send(JSON.stringify(null));
      } else {
        redis.hmset('activeChatroomId', ['id', chatroom[0].id]);      
        res.status(200).send(JSON.stringify(chatroom[0]));
      }
    } 
  });
}

function getMessages (req, res) {
  const chatroomId = req.params.username + '/' + req.params.chatroom; 
  chatroomCtrl.findOneById(chatroomId, (err, chatroom) => {
    if (err) { 
      throw err;
    } else {
      if (chatroom[0] === undefined) {
        throw 'error: chatroom does not exist';
      } else {
    	  res.status(200).send(JSON.stringify(chatroom[0].messages));      
      }
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

function triggerPullRequestFetcher(req, res) {
  sendUpdates(function(chatroomId, data){
    if (data.length > 0) {
      data.forEach((pr) => {
        let messageText = '__' + pr.user.login + '__ made a new pull request. Click the following link to see diffs:\n' + pr.diff_url;
        let message = {
          type: 'text',
          user: 'GitTalk',
          userAvatarUrl: '/assets/GitTalkLogo.png',
          chatroom: chatroomId,
          image: '',
          text: messageText
        };
        updateMessage(message);
        res.status(200).end();
      }); 
    }
  });
}

function emailInvite (req, res) {
  const emailList = req.body.emailAddressList; 
  const chatroomLinkParse = req.body.chatroomLink.split('/');
  const inviterUsername = chatroomLinkParse[chatroomLinkParse.length - 2];
  const inviterChatroom = chatroomLinkParse[chatroomLinkParse.length - 1];
  const sendEmail = function(emailAddress) {
    return new Promise((resolve, reject) => {
      const send = gmailSend({
        user: 'gittalk.hr49@gmail.com',   /* GMail account used to send emails */ 
        pass: 'sllgudocgtykewdv',         /* Application-specific password */
        to: emailAddress,       
        text: req.body.chatroomLink
      });
      /* Override any default option and send email */ 
      send({                         
        subject: '\'' + inviterUsername + '\'' + ' invited you to join chatroom \'' + inviterChatroom + '\''  /*Override value set as default */               
      }, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  };
  /* Create promise for each email address and send all asyncronously */ 
  const promises = [];
  emailList.forEach((email) => {
    promises.push(sendEmail(email));
  });
  Promise.all(promises).then((response) => {
    res.status(201).end();
  }).catch((err) => {
    console.log(err);
  });
} 

module.exports = {
  chatroomInit: chatroomInit,
  emailInvite: emailInvite,
  getChatroom: getChatroom,
  getMemberRepos: getMemberRepos,
  getMessages: getMessages,
  triggerPullRequestFetcher: triggerPullRequestFetcher
}

