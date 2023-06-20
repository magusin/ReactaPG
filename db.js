import mysql from 'mysql2'

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: 3306,
  database: 'rpg'
})

connection.connect((error) => {
  if (error) throw error
  console.log('Connected to MySQL database')
})

export default connection
