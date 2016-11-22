const mongoose = require('mongoose');

const appSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  owner: String,
  apiKey: {
    type: String,
    unique: true
  },
  endpoint: {
    type: String,
    unique: true
  },
  category: String
});

const AppModel = mongoose.model('App', appSchema);

module.exports = AppModel;
