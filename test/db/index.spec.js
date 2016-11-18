var mongoose = require('mongoose');
var chai = require('chai');
var expect = chai.expect; 
var ChatroomController = require('../../server/db/controllers/chatroom.js');
var UserController = require('../../server/db/controllers/user.js');
var ChatroomModel = require('../../server/db/models/chatroom.js');
var UserModel = require('../../server/db/models/user.js');

var uriString = process.env.MONGODB_URI || 'mongodb://localhost/devDB';

var chat1 = {
	id: 'DYWXaStMxp/GypORHVxal', 
	members: ['Tony', 'Afsoon', 'Chase', 'Felicia'], 
	messages: [
		{ member: 'Felicia',
			body: 'testing'
	 	}, 
	 	{ member: 'Afsoon', 
	 		body: 'testing 2'
	 	}
	]
}; 

var chat2 = {
	id: 'hdTMWMRXNu/ymNgklmcnl',
	members: ['Tony', 'Afsoon'], 
	messages: [
		{ member: 'Afsoon',
			body: 'Hi'
	 	}, 
	 	{ member: 'Tony', 
	 		body: 'Sup'
		}
	]
};

var user1 = {
	id: 'f-fong',
	repos: ['Imperial/Rolls', 'Hot/Pot','K/BBQ']
}

describe('Chatroom Model', () => {

	beforeEach(done => {
		var clearDB = () => {
			ChatroomModel.remove({}).exec();
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

	it('should add a chatroom', done => {
		ChatroomController.insertOne(chat1, (err, res) => {
			expect(err).to.not.exist;
			expect(res.id).to.equal('DYWXaStMxp/GypORHVxal');
			done();
		});
	});

	it('should find a chatroom by id', done => {
		ChatroomController.insertOne(chat1, () => {
			ChatroomController.findOne('DYWXaStMxp/GypORHVxal', (err, res) => {
				expect(err).to.not.exist;
				expect(res[0].id).to.equal('DYWXaStMxp/GypORHVxal');
				done();
			});
		});
	});

	it('should update existing chatroom', done => {
		ChatroomController.insertOne(chat1, () => {
			ChatroomController.update({
				id: 'DYWXaStMxp/GypORHVxal',
				messages: [
					{ member: 'Felicia',
					body: 'testing'
			 		}, 
			 		{ member: 'Afsoon', 
			 		body: 'testing 2'
			 		}, 
			 		{ member: 'Tony',
			 			body: 'testing 3'
			 		}
		 		]
		 	}, (err, res) => {
		 		expect(err).to.not.exist;
		 		expect(res.nModified).to.equal(1);
		 		done();
		 	});
		});
	});

	it('should update a chatroom or add it if it does not exist', done => {
		ChatroomController.update({
			id: 'hdTMWMRXNu/ymNgklmcnl',
			members: ['Tony', 'Afsoon'], 
			messages: [
				{ member: 'Afsoon',
					body: 'Hi'
			 	}, 
			 	{ member: 'Tony', 
			 		body: 'Sup'
	 			}
			]
		}, (err, res) => {
			expect(err).to.not.exist;
			expect(res.n).to.equal(1);
			done();
		});
	});

	it('should find all chatrooms with an associated member', done => {
		ChatroomController.insertOne(chat1, () => {
			ChatroomController.insertOne(chat2, () => {
				ChatroomController.findAll('Tony', (err, res) => {
					expect(err).to.not.exist;
					expect(res.length).to.equal(2);
					done();
				});
			});
		});
	});

});


describe('User Model', () => {

	beforeEach(done => {
		var clearDB = () => {
			UserModel.remove({}).exec();
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

	it('should add a user', done => {
		UserController.insertOne(user1, (err, res) => {
			expect(err).to.not.exist;
			expect(res.id).to.equal('f-fong');
			done();
		});
	});

	it('should find a user by id', done => {
		UserController.insertOne(user1, () => {
			UserController.findOne('f-fong', (err, res) => {
				expect(err).to.not.exist;
				expect(res[0].id).to.equal('f-fong');
				done();
			});
		});
	});

	it('should update existing user', done => {
		UserController.insertOne(user1, () => {
			UserController.update({
				id: 'f-fong',
				repos: ['Imperial/Rolls', 'Hot/Pot','K/BBQ', 'Poki/Bowl']
		 	}, (err, res) => {
		 		expect(err).to.not.exist;
		 		expect(res.nModified).to.equal(1);
		 		done();
		 	});
		});
	});

	it('should update a user or add he/she if he/she does not exist', done => {
		UserController.update({
			id: 'f-fong',
			repos: ['Imperial/Rolls', 'Hot/Pot','K/BBQ']
		}, (err, res) => {
			expect(err).to.not.exist;
			expect(res.n).to.equal(1);
			done();
		});
	});

});