const express = require("express");
const app = express();
var multer = require("multer");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");

const authRouter = require("./routes/auth.js");
const departmentRouter = require("./routes/departments.js");
const categoryRouter = require("./routes/categories.js");
const productRouter = require("./routes/products.js");
const orderRouter = require("./routes/orders.js");
const cateringRouter = require("./routes/caterings");

// const createTables = require("./db/createTables.js");

dotenv.config();

// createTables();

app.use(express.urlencoded({ extended: true })); // for form data
app.use(express.json()); // for json

app.use(helmet());
app.use(morgan());
// Add headers before the routes are defined
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "*");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,Content-Type,X-CSRFToken,Authorization"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

app.use("/api/auth/", authRouter);
app.use("/api/departments/", departmentRouter);
app.use("/api/categories/", categoryRouter);
app.use("/api/products/", productRouter);
app.use("/api/orders/", orderRouter);
app.use("/api/caterings/", cateringRouter);
app.listen(process.env.PORT || 5000);
