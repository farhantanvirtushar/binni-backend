var sqlite3 = require("sqlite3").verbose();
var db;

const runQuery = (query_text, params) => {
    return new Promise((resolve, reject) => {
        db = new sqlite3.Database("./db/database.db");
        db.all(query_text, params, (error, results) => {
            if (error) {
                console.log("====================================");
                console.log(error);
                console.log("====================================");
                reject(error);
            }

            resolve(results);
        });
        db.close();
    });
};

module.exports = { db, runQuery };