import { ajax } from 'jquery';
import * as bluebird from 'bluebird';

function _get(url) {
  return ajax({
    url: url,
    method: 'GET',
    dataType: 'JSON'
  });
}

function _post(url, data) {
  return ajax({
    url: url,
    method: 'POST',
    data: data
  });
}

function init(repo) {
  console.log('init');
  return new Promise((resolve, reject) => {
    _post('/api/chatroom/init', {repo: {
        id: repo, 
        messages: [{ // add placeholder message for user delight and data field creation
          type: 'message', 
          chatroom: repo,
          image: null, 
          text: 'Welcome to GitTalk, chat away!', 
          userAvatarUrl: '/assets/GitTalkLogo.png', 
          user: 'GitTalk'
        }], 
        apps: [{  // add placeholder app subscription for data field creation
          read: { 'http://initPlaceholder': true },
          write: { initPlaceholder: true }
        }],
        members: ['placeholder'] // add member for data field creation
      }}).done(() => { 
      resolve(); 
    }).fail((jqXHR, textStatus, err) => {
      reject(err);
    });
  });
}

function getChatroom(repo) {
  return new Promise((resolve, reject) => {
    _get(`/api/chatroom/${repo}`)
    .done((data) => { 
      resolve(data); 
    }).fail((jqXHR, textStatus, err) => {
      reject(err);
    });
  });
}


//
function updatePullRequest(){
  return new Promise((resolve, reject) => {
    _post('/api/repo/pulls', {})
    .done(() => { 
      resolve(); 
    }).fail((jqXHR, textStatus, err) => {
      reject(err);
    });
  });

}

/* Send email invitation to chatroom */
function getUserEmailAddress(url) {
  return new Promise((resolve, reject) => {
    _get(url).done((user) => {
      resolve(user.email);
    }).fail((jqXHR, textStatus, err) => {
        reject(err);
      });
  });
}

function sendInvite(chatroomLink, forkedRepoUrl) {
  return new Promise((resolve, reject) => { 
    _get(forkedRepoUrl).done((forkedRepo) => {
      const parentRepoForksUrl = forkedRepo.parent.forks_url;
      _get(parentRepoForksUrl).done((parentRepoForks) => {
            const userUrls = parentRepoForks.map((userRepo) => {
              return userRepo.owner.url;
            });    
            const promises = [];
            userUrls.forEach((userUrl) => {
              promises.push(getUserEmailAddress(userUrl));
            });
            Promise.all(promises).then((emailAddressList) => {
              _post('/api/email/invite', {
                chatroomLink: chatroomLink, 
                emailAddressList: emailAddressList})
              .done(() => { 
                resolve(); 
              }).fail((jqXHR, textStatus, err) => {
                reject(err);
              });
            }).catch((err) => {
              console.log(err);
            }); 
        }).fail((jqXHR, textStatus, err) => {
        reject(err);
      });
    }).fail((jqXHR, textStatus, err) => {
      reject(err);
    });
  });
}

module.exports = {
  init: init,
  getChatroom: getChatroom,
  sendInvite: sendInvite,
  updatePullRequest: updatePullRequest
}
