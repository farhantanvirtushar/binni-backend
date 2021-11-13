const express = require("express");
const app = express();
const router = express.Router();

const { v4: uuidv4 } = require("uuid");
// change the path of json file

var multer = require("multer");
const upload = multer({ dest: "uploads/" });

const bcrypt = require("bcrypt");

const { db, runQuery } = require("../db/db.js");

var jwt = require("jsonwebtoken");

const bodyParser = require("body-parser");

const storageRef = require("../firebase/firabaseinit.js");

const { getAuth, signInWithPhoneNumber } = require("firebase-admin/auth");

const auth = getAuth();

const sendVerificationCodeToPhone = async (phoneNumber) => {
  return new Promise((resolve, reject) => {
    signInWithPhoneNumber(auth, phoneNumber)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        resolve(confirmationResult);

        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        reject(error);
      });
  });
};

const verifyPhoneNumber = async (code, confirmationResult) => {
  return new Promise((resolve, reject) => {
    confirmationResult
      .confirm(code)
      .then((result) => {
        // User signed in successfully.
        // const user = result.user;
        resolve(result);
      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)
        reject(error);
      });
  });
};

router.post("/phone_num", async (req, res) => {
  try {
    const confirmationResult = sendVerificationCodeToPhone(req.body.phone_num);
    return res.status(201).json(confirmationResult);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/verification_code", async (req, res) => {
  try {
    const result = verifyPhoneNumber(
      req.body.code,
      req.body.confirmationResult
    );
    console.log("====================================");
    console.log(result);
    console.log("====================================");
    return res.status(201).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
