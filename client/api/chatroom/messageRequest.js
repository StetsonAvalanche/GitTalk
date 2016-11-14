import { ajax } from 'jquery';
import * as bluebird from 'bluebird';

function _get(url, body) {
  return ajax({
    url: url,
    method: 'GET',
    dataType: 'JSON',
    data: body
  });
}

function getMessages(chatroomid) {
  return new Promise((resolve, reject) => {
    _get('api/messages', {chatroomid: chatroomid})
    .done(data => {
      resolve(data);
    })
    .fail((jqXHR, textStatus, err) => {
      reject(err);
    });
  });
}

module.exports = {
  getMessages: getMessages
};