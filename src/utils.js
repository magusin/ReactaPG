import mysql from 'mysql2'

async function connectToDatabase() {
  try {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      port: 3306
    })
    return connection
  } catch (error) {
    console.error('Error connecting to database:', error)
    throw error
  }
}

export const checkDatabaseExists = async () => {
  let connection
  try {
    connection = await connectToDatabase()
    const [rows] = connection.query(
      `SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = 'rpg'`
    )
    return rows.length > 0
  } catch (error) {
    console.error('Error checking database existence:', error)
    return false
  } finally {
    if (connection) {
      connection.end()
    }
  }
}

