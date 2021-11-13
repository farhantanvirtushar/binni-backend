const { db, runQuery } = require("./db.js");

const editTables = async () => {
  try {
    var query_text =
      "ALTER TABLE orders\
        change shiping_address shipping_address VARCHAR(200);";

    var params = [];
    var resluts = runQuery(query_text, params);
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }
};

editTables();
