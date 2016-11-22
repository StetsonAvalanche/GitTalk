const request = require('request');

function send(room, message) {
  const endpoints = Object.keys(room.apps.read);
  endpoints.forEach(endpoint => {
    const parsedEndpoint = endpoint.split('%dot%').join('.');
    const payload = {
      user: message.user,
      text: message.text,
      image: message.image,
      room: room.id
    };

    request.post({ url: parsedEndpoint, json: payload }, function(err, resp) {
      if (err) {
        console.log(err);
        // if an endpoint errs too often, alert owner
      }
      // handle err resp codes and act accordingly
    });
  });
}

module.exports = {
  send
};
