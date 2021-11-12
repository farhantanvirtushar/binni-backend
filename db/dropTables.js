const db = require("./db.js");

const dropTables = async () => {
  try {
    // await db.query("DROP TABLE IF EXISTS users CASCADE;");
    // await db.query("DROP TABLE IF EXISTS records CASCADE;");
    db.query("DROP TABLE IF EXISTS ordered_items CASCADE;", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("ok1 " + result);
      }
    });

    db.query("DROP TABLE IF EXISTS orders CASCADE;", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("ok2 " + result);
      }
    });

    db.query("DROP TABLE IF EXISTS products CASCADE;", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("ok3 " + result);
      }
    });

    db.query("DROP TABLE IF EXISTS categories CASCADE;", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("ok4 " + result);
      }
    });
    // db.query("DROP TABLE IF EXISTS admins CASCADE;", (err, result) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     console.log("ok5 " + result);
    //   }
    // });
  } catch (error) {}
};

dropTables();
