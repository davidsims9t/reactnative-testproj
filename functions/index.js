const functions = require('firebase-tools');

exports.helloWorld = functions.http.onRequest((req, res) => {
  res.send('Hello World');
});
