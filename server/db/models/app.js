const mongoose = require('mongoose');

const appSchema = mongoose.Schema({
  name: {
    type: String,
    unique: true
  }
  owner: String,
  apiKey: String,
  endpoint: String,
  category: String
});

const AppModel = mongoose.model('App', appSchema);

module.exports = AppModel;
