import { ajax } from 'jquery';
import * as bluebird from 'bluebird';

function _get(url) {
  return ajax({
    url: url,
    method: 'GET',
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

module.exports = {
  createApp
}
