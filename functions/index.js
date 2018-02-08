const functions = require('firebase-functions');
const cors = require('cors');

var api_key = 'key-685c46166f0607fbf761f2ce8b4329a0';
// var domain = 'flyhigh-5416b.firebaseapp.com';
var domain = 'sandbox4f0d1573738a4c02816238a129149267.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: domain});

function mailgunMessage(req, res) {
    var data = {
              from: req.body.from,
              to: 'aputop@yahoo.com',
              subject: 'Flyhigh запрос',
              // subject: req.body.subject,
              // text: req.body.text
              html: '<h1>Меня звать: '+ req.body.name + '</h1><br><p>email: ' + req.body.from +
              '</p><br><p>тема запроса: ' + req.body.subject +
              '</p><br><p>мне нужно: ' + req.body.text + '</p>'
            };
    mailgun.messages().send(data).then(function(){
      res.status(200).json({success:true});
    }).catch(function() {
        res.status(500).json({success:false});
    });
}

exports.httpEmail = functions.https.onRequest(function(req, res) {
  const corsFn = cors();
  corsFn(req, res, function() {
    mailgunMessage(req, res);
  });
});

