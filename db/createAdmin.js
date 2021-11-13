const bcrypt = require("bcrypt");

const { db, runQuery } = require("./db.js");

const createAdmin = async () => {
  try {
    var query_text =
      "INSERT INTO admins (username,password)\
      VALUES(?,?);";

    var values = ["admin", "admin"];
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(values[1], salt);
    values[1] = hashedPassword;
    await runQuery(query_text, values);
  } catch (error) {
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }
};

createAdmin();
