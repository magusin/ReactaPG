import connection from '../../../db';

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getPlayer(req, res);
    default:
      return res.status(400).json({ message: "bad request" });
  }
}

const getPlayer = async (req, res) => {
  try {
    connection.query('SELECT * FROM player', (error, results) => {
      if (error) throw error;
      return res.status(200).json(results);
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};