const mongoose = require('mongoose'); 

const uriString = process.env.MONGODB_URI || 'mongodb://localhost/gittalk';

function init() {
  mongoose.connect(uriString, (err, res) => {
    if (err) { 
      console.log ('ERROR connecting to: ' + uriString + '. ' + err);
    } else {
      console.log ('Succeeded connected to: ' + uriString);
    }
  });
}

module.exports = {
  init
}
