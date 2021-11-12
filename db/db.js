var mysql = require("mysql");

var db = mysql.createConnection({
  host: "sql6.freemysqlhosting.net",
  user: "sql6449113",
  password: "PpVgNVPzQM",
  database: "sql6449113",
});

connectToDatabase = () => {
  db.connect(function (err) {
    if (err) {
      console.log("====================================");
      console.log(err);
      console.log("====================================");
    }
    console.log("Database Connected!");
  });

  db.on("error", function (err) {
    console.log("db error", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      // Connection to the MySQL server is usually
      connectToDatabase(); // lost due to either server restart, or a
    } else {
      // connnection idle timeout (the wait_timeout
      console.log("====================================");
      console.log(err);
      console.log("===================================="); // server variable configures this)
    }
  });
};

connectToDatabase();

module.exports = db;
