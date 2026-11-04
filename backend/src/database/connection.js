require('dotenv').config();
const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: process.env.BD_SERVIDOR,
  user: process.env.BD_USUARIO,
  password: process.env.BD_SENHA,
  database: process.env.BD_BANCO,
  port: Number(process.env.BD_PORTA || 3306),
  waitForConnections: true,
  connectionLimit: 2
});

module.exports = connection;