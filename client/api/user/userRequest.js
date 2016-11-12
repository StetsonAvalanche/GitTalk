import { ajax } from 'jquery';

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

function getUserRepos(cb) {
  _get('auth/user').done(data => {
    const repos_url = JSON.parse(data)._json.repos_url;
    _get(repos_url).done(repos => {;
      cb(null, repos);
    }).fail((jqXHR, textStatus, err) => {;
      cb(err);
    });
  }).fail((jqXHR, textStatus, err) => {;
    cb(err);
  });
}

export {
  getUserRepos
}

