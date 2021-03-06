const firebaseAdmin = require("firebase-admin");

var serviceAccount = require("./credentials.json");
const dotenv = require("dotenv");

dotenv.config();

var google_private_key = process.env.GOOGLE_PRIVATE_KEY;

serviceAccount.type = process.env.GOOGLE_ACCOUNT_TYPE;
serviceAccount.client_id = process.env.GOOGLE_CLIENT_ID;
serviceAccount.private_key_id = process.env.GOOGLE_PRIVATE_KEY_ID;
serviceAccount.private_key = process.env.GOOGLE_PRIVATE_KEY.replace(
    /\\n/g,
    "\n"
);
serviceAccount.client_email = process.env.GOOGLE_CLIENT_EMAIL;

const admin = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
});

const storageRef = admin.storage().bucket(`gs://binni-catering.appspot.com`);

module.exports = storageRef;