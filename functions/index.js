const functions = require('firebase-functions');
const cors = require('cors');

var api_key = 'key-685c46166f0607fbf761f2ce8b4329a0';
var domain = 'flyhigh-5416b.firebaseapp.com';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

function mailgunMessage(req, res) {
  return Promise.resolve()
        .then(function() {
          if (req.method !== 'POST') {
            const error = new Error('Only POST requests are accepted');
            error.code = 405;
            throw error;
          }
          const message = {
                    to: 'aputop@yahoo.com',
                    from: req.body.from,
                    subject: req.body.subject,
                    text: req.body.text
                    // html: '<h1>Меня звать: '+ req.body.name + '</h1><br><p>мне нужно: ' + req.body.text + '</p>'
                  };
          return mailgun.messages().send(message);
        }).then( function() {
            res.status(200).json({success:true});
        }).catch( function() {
            res.status(500).json({success:false});
        });

}

exports.httpEmail = functions.https.onRequest(function(req, res) {
  const corsFn = cors();
  corsFn(req, res, function() {
    mailgunMessage(req, res);
  });
});

