const bcrypt = require("bcrypt");

const db = require("./db.js");

const createAdmin = async () => {
  try {
    db.connect(function (err) {
      if (err) throw err;
      console.log("Database Connected!");
    });

    var query_text =
      "INSERT INTO admins (username,password)\
      VALUES(?,?);";

    var values = ["admin", "admin"];
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(values[1], salt);
    values[1] = hashedPassword;
    db.query(query_text, values, (err, reslut) => {
      if (err) {
        console.log(err);
      } else {
        console.log("admin created " + reslut);
      }
    });
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }
  db.end();
};

createAdmin();
