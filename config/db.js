//Connect to MySQL Database
const mysql = require("mysql2/promise");
const mySqlPool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "Library_DB",
});
module.exports = mySqlPool;
