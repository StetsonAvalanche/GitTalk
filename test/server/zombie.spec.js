//http://zombie.js.org/
const Browser = require('zombie');

// We're going to make requests to http://example.com/signup
// Which will be routed to our test server localhost:8000
Browser.localhost('example.com', 8000);

describe('User visits signup page', function() {

  const browser = new Browser();

  before(function() {
    return browser.visit('/signup');
  });

  describe('submits form', function() {

    before(function() {
      browser
        .fill('email',    'zombie@underworld.dead')
        .fill('password', 'eat-the-living');
      return browser.pressButton('Sign Me Up!');
    });

    it('should be successful', function() {
      browser.assert.success();
    });

    it('should see welcome page', function() {
      browser.assert.text('title', 'Welcome To Brains Depot');
    });
  });

});