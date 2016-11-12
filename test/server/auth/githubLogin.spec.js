const expect = require('chai').expect;
const Zombie = require('zombie');

Zombie.localhost('example.com', 8000);

describe('github login', () => {
  const zombie = new Zombie();

  before(done => {
    zombie.visit('/auth/github', done);
  });

  it('should redirect to github login page', (done) => {
    let url = zombie.location._url;
    const baseUrl = url.split('?')[0];
    expect(baseUrl).to.equal('https://github.com/login');
    expect(zombie.text('title')).to.equal('Sign in to GitHub · GitHub');
    done();
  });

  it('should not authorize login with incorrect credentials', (done) => {
    zombie.fill('#login_field', 'incorrectUsername')
      .fill('#password', 'chasefeliciaafsoontony');
    zombie.pressButton('input[value="Sign in"]')
      .then(() => {
        let url = zombie.location._url;
        expect(url).to.equal('https://github.com/session');
        console.log(url);
        done();
      });
  });

  it('should authorize login with correct credentials', (done) => {
    zombie.fill('#login_field', 'stetson-avalanche')
      .fill('#password', 'chasefeliciaafsoontony');
    zombie.pressButton('input[value="Sign in"]')
      .then(() => {
        let url = zombie.location._url;
        const baseUrl = url.split('?')[0];
        expect(baseUrl).to.equal('https://github.com/login/oauth/authorize');
        console.log(url);
        done();
      });
  });
});
