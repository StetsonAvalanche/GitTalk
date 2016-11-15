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

function getUser() {
  return new Promise((resolve, reject) => {
    _get('/auth/user').done(data => {
      resolve(data);
    }).fail((jqXHR, textStatus, err) => {;
      reject(err);
    });
  });
}

function getUserRepos() {
  return new Promise((resolve, reject) => {
    _get('/auth/user').done(data => {
      const reposUrl = JSON.parse(data)._json.repos_url;
      _get(reposUrl).done(repos => {
        resolve(repos);
      }).fail((jqXHR, textStatus, err) => {;
        reject(err);
      });
    }).fail((jqXHR, textStatus, err) => {;
      reject(err);
    });
  });
}

export {
  getUser,
  getUserRepos
}

