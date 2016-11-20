const AppModel = require('../models/app.js');
const hat = require('hat');
const rack = hat.rack();

function findByOwner(owner, cb) {
  AppModel.find({ owner: owner }, cb);
}

function findByCategory(category, cb) {
  AppModel.find({ category: category }, cb);
}

function findOneByName(name, cb) {
  AppModel.findOne({ name: name }, cb);
}

function findOneByKey(key, cb) {
  AppModel.findOne({ apiKey: key }, cb);
}

function findOneByEndpoint(endpoint, cb) {
  AppModel.findOne({ endpoint: endpoint }, cb);
}

function findBySelector(selector, query, cb) {
  AppModel.find({ [selector]: query }, cb);
}

function findOneBySelector(selector, query, cb) {
  AppModel.findOne({ [selector]: query }, cb);
}

function insertOne(app, cb) {
  app.apiKey = rack(); // generate apiKey for app
  AppModel.create(app, cb);
}

function updateOneByKey(app, cb) {
  AppModel.update({ apiKey: app.apiKey }, app, { upsert: true }, cb);
}

module.exports = {
  findByOwner,
  findByCategory,
  findOneByName,
  findOneByKey,
  findOneByEndpoint,
  findBySelector,
  findOneBySelector,
  insertOne,
  UpdateOneByKey
};
