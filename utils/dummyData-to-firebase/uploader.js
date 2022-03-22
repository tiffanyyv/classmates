var admin = require('firebase-admin');

var serviceAccount = require('./service_key.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const firestore = admin.firestore();
const path = require('path');
const fs = require('fs');
const directoryPath = path.join(__dirname, 'files');
console.log(directoryPath);

fs.readdir(directoryPath, function(error, files) {
  if (error) {
    return console.log('Unable to scan directory: ', error);
  }
  files.forEach(function(file) {
    var lastDotIndex = file.lastIndexOf('.');
    var menu = require('./files/' + file);
    menu.forEach(function(obj) {
      firestore
        .collection(file.substring(0, lastDotIndex))
        .doc(obj.id)
        .set(obj)
        .then(function(docRef) {
          console.log('Document written with ID: ', docRef.id);
        })
        .catch(function(error) {
          console.error('Error adding document: ', error)
        });
    });
  });
});