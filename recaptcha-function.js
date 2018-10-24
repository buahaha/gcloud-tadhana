const rp = require('request-promise');
// TODO: import multiple secrets
const { recaptcha, recaptcha_test } = require('./secrets/google');
const devToken = '03AMGVjXg-hCcfg1zfTIGVbGl_x79P6lMDUjVS3gXZYVmj5AAmGD6A8-DWMHM4usQnIstqUufrFj_g5r4c1j-XLb4td_5uzwnPosYv1WRRe7o1714qonDs3nLIWeXLHSa4zBOWmJem4NPXXfYYlgkv4kbIzRUGaet3CXdCCmUe8sSVkYuD238BN0F-ZUsXZp5u0natgqxyha9MwzA416AZzes0nglC65rqP1rFVMhlTHb6Gtlj5YeZCqlFPJEKkRXIJ-8nGkfmBPMZxM6F-eSdf_d4X2sqL7kRGA';

module.exports.reCAPTCHA = (req, res)  => {
  if (req.body.env === 'development') {
    var secret = recaptcha_test;
    var token = devToken;
  } else {
    var secret = recaptcha;
    var token = req.body['g-recaptcha-response'];
  }
  var url = `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${token}`
  return rp({
    url: url,
    method: 'POST',
    json: true,
  })
  .then(response => {
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