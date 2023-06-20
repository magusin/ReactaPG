import connection from '../../db';

export default function handler(req, res) {
  if (req.method === 'GET') {
    connection.query('SELECT * FROM player', (error, results) => {
      if (error) throw error;
      res.status(200).json(results);
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}