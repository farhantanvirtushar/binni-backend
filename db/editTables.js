const { db, runQuery } = require("./db.js");

const editTables = async () => {
  try {
    var query_text =
      "ALTER TABLE products\
        change product_image_url product_image_url VARCHAR(400)  NOT NULL;";

    var params = [];
    var resluts = runQuery(query_text, params);
    console.log("====================================");
    console.log("table changed");
    console.log("====================================");
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }
};

editTables();
