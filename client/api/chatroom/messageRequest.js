import { ajax } from 'jquery';
import * as bluebird from 'bluebird';

function _get(url) {
  return ajax({
    url: url,
    method: 'GET',
  });
}

function getMessages(chatroomid) {
  console.log(chatroomid)
  return new Promise((resolve, reject) => {
    _get(`/api/messages/${chatroomid}`)
    .done(data => {
      resolve(data);
    })
    .fail((jqXHR, textStatus, err) => {
      console.log('error in getMessges', jqXHR, err);
      reject(err);
    });
  });
}

module.exports = {
  getMessages: getMessages
}