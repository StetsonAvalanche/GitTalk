import { ajax } from 'jquery';
import * as bluebird from 'bluebird';

function _get(url) {
  return ajax({
    url: url,
    method: 'GET',
  });
}

function getAllMessages(username) {
  return new Promise((resolve, reject) => {
    _get(`/search/messages/${username}`)
    .done(data => {
      resolve(data);
    })
    .fail((jqXHR, textStatus, err) => {
      console.log('error in getMessages', jqXHR, err);
      reject(err);
    });
  });
}

module.exports = {
  getAllMessages: getAllMessages
};