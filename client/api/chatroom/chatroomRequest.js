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
  return new Promise((resolve, reject) => {
    _post('/api/chatroom/init', {repo: {id: repo}}).done(() => { 
      resolve(); 
    }).fail((jqXHR, textStatus, err) => {
      reject(err);
    })
  });
}

function sendInvite(chatroomUrl){
  return new Promise((resolve, reject) => {
    _post('/api/email/invite', {chatroomUrl: chatroomUrl}).done(() => { 
      resolve(); 
    }).fail((jqXHR, textStatus, err) => {
      reject(err);
    })
  });
}


module.exports = {
  init: init,
  sendInvite: sendInvite
}