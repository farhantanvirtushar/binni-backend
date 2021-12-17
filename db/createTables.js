const { db, runQuery } = require("../db/db.js");

const createTable = (query_text) =>
  new Promise((resolve, reject) => {
    db.getConnection((err, connection) => {
      if (err) {
        reject(err);
      }

      connection.query(query_text, (error, results) => {
        if (error) {
          reject(error);
        }

        resolve(results);
        connection.release((err) => {
          if (err) {
            console.error(err);
          }
        });
      });
    });
  });
const createTables = async () => {
  try {
    await createTable(
      "CREATE TABLE IF NOT EXISTS departments (\
        department_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,\
        name VARCHAR(30)  NOT NULL,\
        department_image_url VARCHAR(200)  NOT NULL);"
    );
    await createTable(
      "CREATE TABLE IF NOT EXISTS categories (\
        category_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,\
        department_id INT UNSIGNED,\
        name VARCHAR(30)  NOT NULL,\
        category_image_url VARCHAR(200)  NOT NULL,\
        FOREIGN KEY (department_id) REFERENCES departments(department_id)\
        ON DELETE CASCADE);"
    );

    await createTable(
      "CREATE TABLE IF NOT EXISTS products (\
        product_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,\
        title VARCHAR(200)  NOT NULL,\
        code VARCHAR(20)  NOT NULL,\
        image_url VARCHAR(200)  NOT NULL,\
        description VARCHAR(1500) NOT NULL,\
        stock FLOAT(12, 2) DEFAULT 0,\
        price FLOAT(12, 2) DEFAULT 0,\
        buying_price FLOAT(12, 2) DEFAULT 0,\
        unit VARCHAR(30)  NOT NULL,\
        created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\
        category_id INT UNSIGNED,\
        FOREIGN KEY (category_id) REFERENCES categories(category_id)\
        ON DELETE CASCADE);"
    );

    await createTable(
      "CREATE TABLE IF NOT EXISTS orders (\
        order_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,\
        first_name VARCHAR(30)  NOT NULL,\
        last_name VARCHAR(30)  NOT NULL,\
        shipping_address VARCHAR(200) NOT NULL,\
        contact_no VARCHAR(30)  NOT NULL,\
        payment_account_no VARCHAR(30)  NOT NULL,\
        delivered BOOL DEFAULT 0,\
        confirmed BOOL DEFAULT 0,\
        transaction_id VARCHAR(30),\
        paid FLOAT(12, 2) DEFAULT 0);"
    );

    await createTable(
      "CREATE TABLE IF NOT EXISTS ordered_items (\
        item_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,\
        order_id INT UNSIGNED,\
        product_id INT UNSIGNED,\
        quantity FLOAT(12, 2) DEFAULT 1,\
        FOREIGN KEY (order_id) REFERENCES orders(order_id),\
        FOREIGN KEY (product_id) REFERENCES products(product_id)\
        ON DELETE CASCADE);"
    );
    await createTable(
      "CREATE TABLE IF NOT EXISTS users (\
        user_id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,\
        first_name VARCHAR(30)  NOT NULL,\
        last_name VARCHAR(30)  NOT NULL,\
        mobile_number VARCHAR(30) ,\
        email VARCHAR(30) UNIQUE NOT NULL,\
        password VARCHAR(60) NOT NULL,\
        created_on TIMESTAMP DEFAULT CURRENT_TIMESTAMP,\
        last_login TIMESTAMP);"
    );

    await createTable(
      "CREATE TABLE IF NOT EXISTS admins (\
      username VARCHAR(30) UNIQUE NOT NULL,\
      password VARCHAR(80) NOT NULL );"
    );
  } catch (error) {
    console.log("error creating tables");
    console.log("====================================");
    console.log(error);
    console.log("====================================");
  }
};

module.exports = createTables;
