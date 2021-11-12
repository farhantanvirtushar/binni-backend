const firebaseAdmin = require("firebase-admin");

const serviceAccount = require("./credentials.json");

const admin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(serviceAccount),
});

const storageRef = admin.storage().bucket(`gs://binni-foods.appspot.com`);

module.exports = storageRef;
