const express = require("express");
const app = express();
const router = express.Router();

const { v4: uuidv4 } = require("uuid");
// change the path of json file

var multer = require("multer");
const upload = multer({ dest: "/tmp/uploads/" });

const bcrypt = require("bcrypt");

const { db, runQuery } = require("../db/db.js");

var jwt = require("jsonwebtoken");

const storageRef = require("../firebase/firabaseinit.js");

async function uploadFile(path, filename) {
    const storage = await storageRef.upload(path, {
        public: true,
        destination: `/uploads/coverimages/${filename}`,
        metadata: {
            firebaseStorageDownloadTokens: uuidv4(),
        },
    });

    return storage[0].metadata.mediaLink;
}

router.get("/", async(req, res) => {
    try {
        var query_text = "select *\
      from caterings;";

        var values = [];

        var caterings = await runQuery(query_text, values);
        return res.status(201).json(caterings);
    } catch (error) {
        res.status(500).json(error);
    }
});

// router.get("/:id", async (req, res) => {
//   try {
//     var query_text =
//       "select *\
//       from categories\
//       where category_id = ?;";

//     var values = [req.params.id];

//     var categories = await runQuery(query_text, values);
//     return res.status(201).json(categories[0]);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

// router.get("/:id/all", async (req, res) => {
//   try {
//     var query_text =
//       "select *\
//       from products\
//       where category_id = ? ;";

//     var values = [req.params.id];

//     var products = await runQuery(query_text, values);
//     return res.status(201).json(products);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

router.post("/new", async(req, res) => {
    try {
        var query_text =
            "INSERT INTO caterings (name,catering_menu)\
      VALUES(?,?);";

        var values = [req.body.name, req.body.catering_menu];

        await runQuery(query_text, values);

        query_text = "select *\
      from caterings;";

        values = [];

        var caterings = await runQuery(query_text, values);
        return res.status(201).json(caterings);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.put("/:id", async(req, res) => {
    try {
        var query_text =
            "UPDATE caterings \
      SET name = ?, catering_menu = ?\
      where catering_id = ?;";

        var values = [req.body.name, req.body.catering_menu, req.params.id];

        await runQuery(query_text, values);

        query_text = "select *\
      from caterings;";

        values = [];

        var caterings = await runQuery(query_text, values);
        return res.status(201).json(caterings);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete("/:id", async(req, res) => {
    try {
        var query_text = "DELETE from caterings\
      where catering_id = ?;";

        var values = [req.params.id];

        await runQuery(query_text, values);

        query_text = "select *\
      from caterings;";

        values = [];

        var caterings = await runQuery(query_text, values);
        return res.status(201).json(caterings);
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;