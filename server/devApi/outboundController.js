const request = require('request');

function send(room, message) {
  const endpoints = room.apps.read;
  endpoints.forEach(endpoint => {

    const payload = {
      user: message.user,
      text: message.text,
      image: message.image,
      room: room.id
    };

    request.post({ url: endpoint, json: payload }, function(err, resp) {
      if (err) {
        // handle err
        // if an endpoint errs too often, alert owner
      }
    });
  });
}

module.exports = {
  send
};
