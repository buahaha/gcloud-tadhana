const request = require('supertest');
const chai = require('chai');

const assert = chai.assert;

var test = require('cloud-function-test').TestFunction;
var { reCAPTCHA } = require('../recaptcha-function');

describe('reCAPTCHA', () => {

  before(done => {
    test.start(4000);
    app = test.server;
    test.fn = reCAPTCHA
    done();
  });

  after(done => {
    test.close();
    done();
  });

  it('check if user is not a robot', () => {
    request(app)
    .get('/')
    .send({
      env: 'development'
    })
    .expect(res => {
      assert.isTrue(res.body.success);
    })
    .end((err, res) => {
      if (err) return done(err);
      done();
    });
  });
});
