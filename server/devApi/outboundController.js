const request = require('request');

function send(room, message) {
  console.log(room, 'room');
  const endpoints = Object.keys(room.apps[0].read);
  endpoints.forEach(endpoint => {
    const parsedEndpoint = endpoint.split('%dot%').join('.');
    const payload = {
      user: message.user,
      text: message.text,
      image: message.image,
      room: room.id
    };

    _outboundRequest(parsedEndpoint, payload, _handleAppResponse);
  });
}

function _outboundRequest(url, payload, cb) {
  request.post({ url: url, json: payload }, cb);
}

function _handleAppResponse(err, resp) {
  if (err) {
    console.log(err);
    // alert owner if endpoint errs to often
  }
  // append resp to app log?
}

module.exports = {
  send
};
