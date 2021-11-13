var mysql = require("mysql");

var db = mysql.createPool({
  host: "bhd1j95jzvvqriwqsl0u-mysql.services.clever-cloud.com",
  port: 3306,
  user: "u1mrzzipdzd1kvub",
  password: "7C9OFbkswj1wZStOSam4",
  database: "bhd1j95jzvvqriwqsl0u",
});

const runQuery = (query_text, params) => {
  return new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        console.error(err);
        reject(err);
      }

      connection.query(query_text, params, (error, results) => {
        if (error) {
          reject(error);
        }

        resolve(results);
        connection.release((err) => {
          if (err) {
            console.error(err);
            reject(err);
          }
        });
      });
    });
  });
};

module.exports = { db, runQuery };
