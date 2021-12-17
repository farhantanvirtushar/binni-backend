const { db, runQuery } = require("./db.js");

const dropTables = async () => {
  try {
    await runQuery("DROP TABLE IF EXISTS ordered_items CASCADE;", []);
    await runQuery("DROP TABLE IF EXISTS orders CASCADE;", []);
    // await runQuery("DROP TABLE IF EXISTS products CASCADE;", []);
    // await runQuery("DROP TABLE IF EXISTS categories CASCADE;", []);
    // await runQuery("DROP TABLE IF EXISTS departments CASCADE;", []);

    console.log("====================================");
    console.log("table deleted");
    console.log("====================================");
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
