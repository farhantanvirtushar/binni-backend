const bcrypt = require("bcrypt");

const { db, runQuery } = require("./db.js");

const fs = require("fs");

const readData = () => {
  return new Promise((resolve, reject) => {
    fs.readFile("./insertData.txt", "utf8", (err, data) => {
      if (err) {
        reject(err);
      }

      data = data.split("\n");
      data.pop();
      values = [];
      while (data.length > 0) {
        values.push([31, "", "piece", ...data.splice(0, 4)]);
      }
      console.log("====================================");
      console.log(values);
      console.log("====================================");
      resolve(values);
    });
  });
};

const insertData = async () => {
  try {
    var query_text =
      "INSERT INTO products (category_id,image_url,unit,code,title,description,price)\
      VALUES ?;";

    var values = [];
    values = await readData();
    values = [values];

    await runQuery(query_text, values);
    console.log("data inserted");
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }
};

insertData();
