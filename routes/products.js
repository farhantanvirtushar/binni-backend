const express = require("express");
const app = express();
const router = express.Router();

const { v4: uuidv4 } = require("uuid");

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

router.get("/:id", async (req, res) => {
  try {
    var query_text =
      "SELECT *\
      from products \
      where product_id = ?;";

    var values = [req.params.id];

    var products = await runQuery(query_text, values);
    return res.status(201).json(products[0]);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    var url = req.body.image_url;
    if (req.file) {
      // console.log("file found");
      url = await uploadFile(
        req.file.path,
        req.file.filename + req.file.originalname
      );
    }
    var query_text =
      "UPDATE products \
      SET title = ?, description = ?, code = ?, stock = ?, price = ?, buying_price = ?,unit = ?,image_url = ?\
      where product_id = ?;";

    var values = [
      req.body.title,
      req.body.description,
      req.body.code,
      req.body.stock,
      req.body.price,
      req.body.buying_price,
      req.body.unit,
      url,
      req.params.id,
    ];

    await runQuery(query_text, values);

    query_text = "select *\
      from products\
      where category_id = ?;";

    values = [req.body.category_id];

    var products = await runQuery(query_text, values);
    return res.status(201).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/:id/delete", async (req, res) => {
  try {
    var query_text = "DELETE from products \
      where product_id = ?;";

    var values = [req.params.id];

    console.log("====================================");
    console.log(req.body);
    console.log("====================================");

    var products;
    await runQuery(query_text, values);

    query_text = "select *\
      from products\
      where category_id = ?;";

    values = [req.body.categoryId];

    products = await runQuery(query_text, values);
    return res.status(201).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});
module.exports = router;
