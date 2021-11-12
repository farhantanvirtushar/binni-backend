const db = require("./db.js");

const editTables = async () => {
  try {
    db.query(
      "ALTER TABLE categories\
        ADD category_image_url VARCHAR(200);",
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log("table edited " + result);
        }
      }
    );
  } catch (error) {}
};

editTables();
