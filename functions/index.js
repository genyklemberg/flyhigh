const functions = require('firebase-functions');
const cors = require('cors');

// const admin = require('firebase-admin');
// admin.initializeApp(functions.config().firebase);
// const cors = require('cors')({ origin: true });
// //const SENDGRID_API_KEY = functions.config().sendgrid.key;
const SENDGRID_API_KEY = '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';

// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);

const cors = require('cors')({
  origin: ['https://flyhigh-5416b.firebaseapp.com'], /** replace with the url of your development environment that serves your angular app. */
  methods: ['POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
  preflightContinue: false,
  optionsSuccessStatus: 204
});

function sendGridMessage(req, res) {
  return Promise.resolve()
        .then(function() {
          if (req.method !== 'POST') {
            const error = new Error('Only POST requests are accepted');
            error.code = 405;
            throw error;
          }
          const message = {
                    to: 'y.potupa@gmail.com',
                    from: req.body.from,
                    subject: req.body.subject,
                    // text: req.body.text,
                    html: '<h1>Меня звать: '+ req.body.name + '</h1><br><p>мне нужно: ' + req.body.text + '</p>'

                    // // custom templates
                    // templateId: '92f33794-5847-4e01-9e24-67601c5fdf5a',
                    // substitutionWrappers: ['{{', '}}'],
                    // substitutions: {
                    //   name: req.body.name,
                    //   text: req.body.text
                    //   // and other custom properties here
                    // }
                  };
          return sgMail.send(message);
        })
          .then(function(response) {
             if (response.body) {
                res.send(response.body);
             } else {
                res.end();
             }
          })
          .catch(function(err) {
            console.error(err);
            return Promise.reject(err);
          })
}

exports.httpEmail = functions.https.onRequest(function(req, res) {
  const corsFn = cors();
  corsFn(req, res, function() {
    sendGridMessage(req, res);
  });
});

