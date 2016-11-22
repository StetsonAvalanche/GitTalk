import { ajax } from 'jquery';
import * as bluebird from 'bluebird';

function _get(url, data) {
  return ajax({
    url: url,
    method: 'GET',
    data: data
  });
}

function _post(url, data) {
  return ajax({
    url: url,
    method: 'POST',
    data: data
  });
}

function createApp(app) {
  return new Promise((resolve, reject) => {
    _post('/app/create', app).done(() => {
      resolve();
    }).fail((jqXHR, textStatus, err) => reject(err));
  });
}

function getAllApps() {
  return new Promise((resolve, reject) => {
    _get('/app/allapps').done((data) => {
      resolve(data);
    }).fail((jqXHR, textStatus, err) => reject(err));
  });
}

function getSubscriptions(chatroomId) {
  return new Promise((resolve, reject) => {
    // chatroomId is translated into :username and :repo in the routes
    _get(`/app/subscriptions/${chatroomId}`).done((data) => {
      resolve(data);
    }).fail((jqXHR, textStatus, err) => reject(err));
  });
}

function getUserApps() {
  return new Promise((resolve, reject) => {
    _get('/app/userapps').done((data) => {
      resolve(data);
    }).fail((jqXHR, textStatus, err) => reject(err));
  });
}

function subscribeApp(app, reponame) {
  return new Promise((resolve, reject) => {
    _post('/app/subscribe', { app: app, reponame: reponame }).done(() => {
      resolve();
    }).fail((jqXHR, textStatus, err) => reject(err));
  });
}

function unsubscribeApp(app, reponame) {
  return new Promise((resolve, reject) => {
    _post('/app/unsubscribe', { app: app, reponame: reponame }).done(() => {
      resolve();
    }).fail((jqXHR, textStatus, err) => reject(err));
  });
}

module.exports = {
  createApp,
  getAllApps,
  getSubscriptions,
  getUserApps,
  subscribeApp,
  unsubscribeApp,
}
