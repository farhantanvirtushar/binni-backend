var mysql = require("mysql");

var db;

try {
  db = mysql.createPool({
    connectTimeout: 60 * 60 * 1000,
    acquireTimeout: 60 * 60 * 1000,
    timeout: 60 * 60 * 1000,
    host: "34.136.232.107",
    port: 3306,
    user: "root",
    password: "binniadmin777",
    database: "binni_catering_database",
  });
} catch (error) {
  console.log("====================================");
  console.log(error);
  console.log("====================================");
}

const runQuery = (query_text, params) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        reject(err);
      }

      connection.query(query_text, params, (error, results) => {
        if (error) {
          console.log("====================================");
          console.log(error);
          console.log("====================================");
          reject(error);
        }

        connection.release();
        resolve(results);
      });
    });
  });
};

module.exports = { db, runQuery };
