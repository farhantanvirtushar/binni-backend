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

const insertRowWithLastId = (query_text, params) => {
    return new Promise((resolve, reject) => {
        db = new sqlite3.Database("./db/database.db");
        db.run(query_text, params, function(error) {
            if (error) {
                console.log("====================================");
                console.log(error);
                console.log("====================================");
                reject(error);
            }

            resolve(this.lastID);
        });
        db.close();
    });
};

module.exports = { db, runQuery, insertRowWithLastId };