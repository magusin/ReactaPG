import mysql from 'mysql2'
require('dotenv').config();

const connection = mysql.createPool({
  host: process.env.DB_HOST,
  password: process.env.DB_PASSWORD,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
})

export default connection
