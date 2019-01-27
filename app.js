var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var reCAPTCHA = require('recaptcha2');

var recaptcha = new reCAPTCHA({
  siteKey: '6LeQEI0UAAAAAAKtYruZr_M4ymtGLUtuFOqGw6YP',
  secretKey: '6LeQEI0UAAAAAAlDXSfb7iPN5plL9wHYF3n9C4Z8'
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post('/', (req, res) => {
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
})

app.get('*', (req, res) => {
    res.type('text').send('Not Found');
})

module.exports = app;
