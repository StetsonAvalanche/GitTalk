import { ajax } from 'jquery';
import * as bluebird from 'bluebird';

function _get(url) {
  return ajax({
    url: url,
    method: 'GET',
    dataType: 'JSON'
  });
}

function getMessages(chatroomid) {
  return new Promise((resolve, reject) => {
    _get(`api/messages/${chatroomid}`)
    .done(data => {
      resolve(data);
    })
    .fail((jqXHR, textStatus, err) => {
      reject(err);
    });
  });
}

export {
  getMessages
}