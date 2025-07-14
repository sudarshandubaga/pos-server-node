const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost", // or your hosting DB host
  user: "root",
  password: "",
  database: "pos_app",
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool.promise();
