import mysql from 'mysql2';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  port: 3306,
  database: 'rpg'
});

// Fonction pour créer la base de données
const createDatabase = async () => {
  try {
    await connection.promise().query('CREATE DATABASE IF NOT EXISTS rpg');
    console.log('Database created successfully');
  } catch (error) {
    console.error('Error creating database:', error);
  } finally {
    connection.end();
  }
};

export default createDatabase;