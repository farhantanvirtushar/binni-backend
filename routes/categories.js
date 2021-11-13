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

router.get("/", async (req, res) => {
  try {
    var query_text = "select *\
      from categories;";

    var values = [];

    var categories = await runQuery(query_text, values);
    return res.status(201).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    var query_text =
      "select *\
      from categories\
      where category_id = ?;";

    var values = [req.params.id];

    var categories = await runQuery(query_text, values);
    return res.status(201).json(categories[0]);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id/all", async (req, res) => {
  try {
    var query_text =
      "select *\
      from products\
      where category_id = ? ;";

    var values = [req.params.id];

    var products = await runQuery(query_text, values);
    return res.status(201).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/new", upload.single("image"), async (req, res) => {
  try {
    console.log("====================================");
    console.log(req.file);
    console.log("====================================");
    const url = await uploadFile(
      req.file.path,
      req.file.filename + req.file.originalname
    );
    var query_text =
      "INSERT INTO categories (name,category_image_url)\
      VALUES(?,?);";

    var values = [req.body.categoryName, url];

    await runQuery(query_text, values);

    query_text = "select *\
      from categories;";

    values = [];

    var categories = await runQuery(query_text, values);
    return res.status(201).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    console.log("====================================");
    console.log(req.file);
    console.log("====================================");
    var url = req.body.image_url;
    if (req.file) {
      // console.log("file found");
      url = await uploadFile(
        req.file.path,
        req.file.filename + req.file.originalname
      );
    }
    var query_text =
      "UPDATE categories \
      SET name = ?, category_image_url = ?\
      where category_id = ?;";

    var values = [req.body.categoryName, url, req.params.id];

    await runQuery(query_text, values);

    query_text = "select *\
      from categories;";

    values = [];

    var categories = await runQuery(query_text, values);
    return res.status(201).json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/:id/new", upload.single("image"), async (req, res) => {
  try {
    const url = await uploadFile(
      req.file.path,
      req.file.filename + req.file.originalname
    );

    var query_text =
      "INSERT INTO products (title,description,stock,price,buying_price,unit,category_id,image_url)\
      VALUES(?,?,?,?,?,?,?,?);";

    var values = [
      req.body.title,
      req.body.description,
      req.body.stock,
      req.body.price,
      req.body.buying_price,
      req.body.unit,
      req.params.id,
      url,
    ];

    await runQuery(query_text, values);

    query_text = "select *\
      from products\
      where category_id = ?;";

    values = [req.params.id];

    var products = await runQuery(query_text, values);
    return res.status(201).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
