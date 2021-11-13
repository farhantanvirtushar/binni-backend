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

router.get("/", async (req, res) => {
  try {
    var query_text = "SELECT *\
      from orders\
      order by order_id desc;";

    var values = [];

    var orders = await runQuery(query_text, values);

    return res.status(201).json(orders);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.get("/:id/details", async (req, res) => {
  try {
    var query_text =
      "WITH orders AS\
      (SELECT *\
       FROM ordered_items\
       WHERE order_id = ?)\
       SELECT * \
       FROM orders join products on (orders.product_id = products.product_id);";

    var values = [req.params.id];

    var ordered_items = await runQuery(query_text, values);

    return res.status(201).json(ordered_items);
  } catch (error) {
    res.status(500).json(error);
  }
});
router.post("/new", async (req, res) => {
  try {
    var query_text =
      "INSERT INTO orders (first_name,last_name,shipping_address,contact_no)\
      VALUES(?,?,?,?);";

    var values = [
      req.body.first_name,
      req.body.last_name,
      req.body.shipping_address,
      req.body.contact_no,
    ];

    console.log("====================================");
    console.log(values);
    console.log("====================================");
    var result = await runQuery(query_text, values);

    var order_id = result.insertId;
    query_text =
      "INSERT INTO ordered_items (order_id,product_id,quantity)\
      VALUES ?;";

    values = [];

    for (const [key, value] of Object.entries(req.body.cart)) {
      item = [order_id, parseInt(key), value];
      values.push(item);
    }
    values = [values];
    console.log("====================================");
    console.log(values);
    console.log("====================================");
    await runQuery(query_text, values);
    return res.status(201).json({ msg: "order recieved" });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
