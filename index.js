const express = require("express");
const app = express();
var multer = require("multer");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");

const authRouter = require("./routes/auth.js");
const categoryRouter = require("./routes/categories.js");
const productRouter = require("./routes/products.js");
const orderRouter = require("./routes/orders.js");

const createTables = require("./db/createTables.js");

dotenv.config();

createTables();

app.use(express.urlencoded({ extended: true })); // for form data
app.use(express.json()); // for json

app.use(helmet());
app.use(morgan());

app.use("/api/auth/", authRouter);
app.use("/api/categories/", categoryRouter);
app.use("/api/products/", productRouter);
app.use("/api/orders/", orderRouter);
app.listen(process.env.PORT || 5000);
