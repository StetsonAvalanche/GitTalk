import { ajax } from 'jquery';
import * as bluebird from 'bluebird';

function _get(url) {
  return ajax({
    url: url,
    method: 'GET',
  });
}

function getIndex(username) {
  return new Promise((resolve, reject) => {
    _get(`/search/index/${username}`)
    .done(data => {
      resolve(data);
    })
    .fail((jqXHR, textStatus, err) => {
      console.log('error in getIndex', jqXHR, err);
    });
  });
}

module.exports = {
  getIndex: getIndex,
};