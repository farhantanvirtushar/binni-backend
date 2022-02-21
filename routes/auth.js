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

// const { getAuth, signInWithPhoneNumber } = require("firebase-admin/auth");

// const auth = getAuth();

// const sendVerificationCodeToPhone = async (phoneNumber) => {
//   return new Promise((resolve, reject) => {
//     signInWithPhoneNumber(auth, phoneNumber)
//       .then((confirmationResult) => {
//         // SMS sent. Prompt user to type the code from the message, then sign the
//         // user in with confirmationResult.confirm(code).
//         resolve(confirmationResult);

//         // ...
//       })
//       .catch((error) => {
//         // Error; SMS not sent
//         reject(error);
//       });
//   });
// };

// const verifyPhoneNumber = async (code, confirmationResult) => {
//   return new Promise((resolve, reject) => {
//     confirmationResult
//       .confirm(code)
//       .then((result) => {
//         // User signed in successfully.
//         // const user = result.user;
//         resolve(result);
//       })
//       .catch((error) => {
//         // User couldn't sign in (bad verification code?)
//         reject(error);
//       });
//   });
// };

// router.post("/phone_num", async (req, res) => {
//   try {
//     const confirmationResult = sendVerificationCodeToPhone(req.body.phone_num);
//     return res.status(201).json(confirmationResult);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// router.post("/verification_code", async (req, res) => {
//   try {
//     const result = verifyPhoneNumber(
//       req.body.code,
//       req.body.confirmationResult
//     );
//     console.log("====================================");
//     console.log(result);
//     console.log("====================================");
//     return res.status(201).json(result);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

router.post("/register", async(req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        var query_text =
            "INSERT INTO users (first_name, last_name,mobile_number,email,password)\
      VALUES($1,$2,$3,$4,$5) RETURNING *;";

        var values = [
            req.body.first_name,
            req.body.last_name,
            req.body.mobile_number,
            req.body.email,
            hashedPassword,
        ];

        var newUser = await db.query(query_text, values);
        newUser = newUser.rows[0];
        delete newUser["password"];

        jwt.sign({ user: newUser }, process.env.SECRET_KEY, function(err, token) {
            newUser.token = token;
            res.status(201).json(newUser);
        });
    } catch (error) {
        if (error.constraint) {
            res.status(500).json({ error: error.constraint });
        }
        return res.status(500).json(error);
    }
});

router.post("/login", async(req, res) => {
    try {
        var query_text = "select *\
      from users \
      where email = $1;";

        var values = [req.body.email];

        var user = await db.query(query_text, values);

        if (user.rowCount != 1) {
            return res.status(404).json("User Not found");
        }

        user = user.rows[0];

        const validPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!validPassword) {
            return res.status(403).json({ error: "wrong password" });
        }

        delete user["password"];
        jwt.sign({ user: user }, process.env.SECRET_KEY, function(err, token) {
            user.token = token;
            res.status(201).json(user);
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post("/admin/login", async(req, res) => {
    try {
        var query_text = "select *\
      from admins \
      where username = ?;";

        var values = [req.body.username];

        var admin = await runQuery(query_text, values);

        if (admin.length != 1) {
            return res.status(404).json("Admin Not found");
        }

        admin = admin[0];

        const validPassword = await bcrypt.compare(
            req.body.password,
            admin.password
        );

        if (!validPassword) {
            return res.status(403).json({ error: "wrong password" });
        }

        delete admin["password"];
        jwt.sign({ admin: admin }, process.env.SECRET_KEY, function(err, token) {
            admin.token = token;
            res.status(201).json(admin);
        });
    } catch (error) {
        res.status(500).json(error);
    }
});
module.exports = router;