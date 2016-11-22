const mongoose = require('mongoose');
const chai = require('chai');
const expect = chai.expect; 
const App = require('../../server/db/controllers/app.js');
const AppModel = require('../../server/db/models/app.js');

const uriString = 'mongodb://localhost/devDB';

const testApp = {
  name: 'tonyboy',
  category: 'weather',
  endpoint: 'http://tonyboy.herokuapp.com',
  owner: 'chasestarr'
};

describe('App Model', () => {

  beforeEach(done => {
    var clearDB = () => {
      AppModel.remove({}).exec();
      return done();
    };


    if (mongoose.connection.readyState === 0) {
      mongoose.connect(uriString, err => {
        console.log('connecting: ', uriString);
        console.log('connection error: ', err);
        return clearDB();
      });
    } else {
      return clearDB();
    }
  });

  afterEach(done => {
    mongoose.disconnect();
    return done();
  });

  it('should add an app', done => {
    App.insertOne(testApp, (err, res) => {
      expect(err).to.not.exist;
      expect(res.name).to.equal('tonyboy');
      done();
    });
  });

  it('should find all apps by an owner', done => {
    App.insertOne(testApp, (err, res) => {
      App.findByOwner('chasestarr', (err, res) => {
        expect(err).to.not.exist;
        expect(res[0].name).to.equal('tonyboy');
        done();
      });
    });
  });

  it('should find all apps by a category', done => {
    App.insertOne(testApp, (err, res) => {
      App.findByCategory('weather', (err, res) => {
        expect(err).to.not.exist;
        expect(res[0].name).to.equal('tonyboy');
        done();
      });
    });
  });

  it('should find one app by name', done => {
    App.insertOne(testApp, (err, res) => {
      App.findOneByName('tonyboy', (err, res) => {
        expect(err).to.not.exist;
        expect(res.owner).to.equal('chasestarr');
        done();
      });
    });
  });

  // unable to test right now because auto gens key on insert
  xit('should find one app by key', done => {
    App.insertOne(testApp, (err, res) => {
      App.findOneByKey('abc', (err, res) => {
        expect(err).to.not.exist;
        expect(res.name).to.equal('tonyboy');
        done();
      });
    });
  });

  it('should find one app by endpoint', done => {
    App.insertOne(testApp, (err, res) => {
      App.findOneByEndpoint('http://tonyboy.herokuapp.com', (err, res) => {
        expect(err).to.not.exist;
        expect(res.name).to.equal('tonyboy');
        done();
      });
    });
  });

  it('should find all apps based on selector', done => {
    App.insertOne(testApp, (err, res) => {
      App.findBySelector('owner', 'chasestarr', (err, res) => {
        expect(err).to.not.exist;
        expect(res[0].name).to.equal('tonyboy');
        done();
      });
    });
  });

  it('should find one app based on selector', done => {
    App.insertOne(testApp, (err, res) => {
      App.findOneBySelector('name', 'tonyboy', (err, res) => {
        expect(err).to.not.exist;
        expect(res.owner).to.equal('chasestarr');
        done();
      });
    });
  });

  // can't test currently. key is autogen'd on insert
  xit('should update one app by key', done => {
    App.insertOne(testApp, (err, res) => {
      App.updateOneByKey(testApp, (err, res) => {
        expect(err).to.not.exist;
        expect(res.owner).to.equal('chasestarr');
        done();
      });
    });
  });

});
