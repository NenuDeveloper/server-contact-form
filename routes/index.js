var express = require('express');
var router = express.Router();
var path = require('path');

var reCAPTCHA = require('recaptcha2');

var recaptcha = new reCAPTCHA({
  siteKey: '6LeQEI0UAAAAAAKtYruZr_M4ymtGLUtuFOqGw6YP',
  secretKey: '6LeQEI0UAAAAAAlDXSfb7iPN5plL9wHYF3n9C4Z8'
})

/* GET home page. */
router.get('/', function(req, res, next) {
});

router.post('/', (req, res, next) => {
  
  recaptcha.validateRequest(req)
    .then(function(){
      var name = req.body.name;
      var email = req.body.email;
      var phone = req.body.phone;
      var message = req.body.message;


      res.send(`El nombre es: ${name} El correo electrónico es: ${email} - El teléfono es: ${phone} - El mensaje es: ${message}`);
    })
    .catch((errorCodes) => {
      res.json({
        formsubmit: false,
        errors: recaptcha.translateErrors(errorCodes)
      });
    })
  
  
});



module.exports = router;
