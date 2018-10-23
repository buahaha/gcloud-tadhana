const rp = require('request-promise');
const recaptcha = require('./secrets/google').recaptcha_localhost;

module.exports.reCAPTCHA = (req, res)  => {
  url = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptcha}&response=${req.body['g-recaptcha-response']}`
  return rp({
    url: url,
    method: 'POST',
    json: true,
  })
  .then(response => {
    console.log(response)
    if (response.success) {
      return res.send({
        success: true
      });
    } else {
      return res.send({
        success: false
      })
    }
  })
  .catch(e => {
    return res.send({
      error: e,
      success: false
    });
  })
}