import connection from '#/db';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
  switch (req.method) {
    case "POST":
      return await login(req, res);
    default:
      return res.status(400).json({ message: "bad request" });
  }
}
// login
const login = async (req, res) => {
  try {
    connection.query('SELECT * FROM player WHERE username = ?', [req.body.username], async (error, results) => {
      if (error) throw error;
      if (results.length === 0) return res.status(401).json({ message: 'username or password incorrect' });
      const isPasswordCorrect = await bcrypt.compare(req.body.password, results[0].password);
      if (!isPasswordCorrect) return res.status(401).json({ message: 'username or password incorrect' });
      return res.status(200).json(results[0]);
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};