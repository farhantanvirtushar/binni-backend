const bcrypt = require("bcrypt");

const { db, runQuery } = require("./db.js");

const fs = require("fs");

const readData = () => {
    return new Promise((resolve, reject) => {
        fs.readFile("./insertData.csv", "utf8", (err, data) => {
            if (err) {
                reject(err);
            }

            data = data.split("\n");

            data.pop();
            values = [];
            for (var i = 0; i < data.length; i++) {
                row = data[i].split(",");
                row = ["piece", "", ...row.splice(0, 5)];
                row[2] = parseInt(row[2]);
                row[6] = parseInt(row[6]);
                values.push(row);
            }

            console.log("====================================");
            console.log(values);
            console.log("====================================");
            resolve(values);
        });
    });
};

const insertData = async() => {
    try {
        var query_text =
            "INSERT INTO products (unit,image_url,category_id,code,title,description,price)\
      VALUES (?,?,?,?,?,?,?);";

        var values = [];
        values = await readData();

        for (var i = 0; i < values.length; i++) {
            value = values[i];

            await runQuery(query_text, value);
        }

        console.log("data inserted");
    } catch (error) {
        console.log("====================================");
        console.log(error);
        console.log("====================================");
    }
};

// readData();
insertData();