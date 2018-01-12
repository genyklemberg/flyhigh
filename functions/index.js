const functions = require('firebase-functions');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

/*
* 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
* */

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const cors = require('cors')({ origin: true });

//const SENDGRID_API_KEY = functions.config().sendgrid.key;
const SENDGRID_API_KEY = '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';


const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(SENDGRID_API_KEY);


exports.httpEmail = functions.https.onRequest((req, res) => {

  cors( req, res, () => {

  const toName  = req.body.toName;
  const toEmail = req.body.toEmail;

  const msg = {
    to: toEmail,
    from: 'hello@angularfirebase.com',
    subject:  'New Follower',
    // text: `Hey ${toName}. You have a new follower!!! `,
    // html: `<strong>Hey ${toName}. You have a new follower!!!</strong>`,

    // custom templates
    templateId: '5de0953a-0ad1-4cda-8c84-c260d8104837',
    substitutionWrappers: ['{{', '}}'],
    substitutions: {
      name: toName
      // and other custom properties here
    }
  };

  return sgMail.send(msg)
    .then(() => res.status(200).send('email sent!'))
    .catch(err => res.status(400).send(err))
    })
})
