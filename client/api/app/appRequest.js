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



function createApp() {

}

module.exports = {
  createApp
}
