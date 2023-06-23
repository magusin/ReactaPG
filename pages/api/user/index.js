import connection from '#/db';

export default async function handler(req, res) {
  switch (req.method) {
    case "GET":
      return await getPlayers(req, res);
    case "POST":
      return await createPlayer(req, res);
    default:
      return res.status(400).json({ message: "bad request" });
  }
}

const getPlayers = async (req, res) => {
  try {
    connection.query('SELECT * FROM player', (error, results) => {
      if (error) throw error;
      return res.status(200).json(results);
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const createPlayer = async (req, res) => {
  connection.query('INSERT INTO player SET ?', [req.body], (error, results) => {
    if (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        const isUsername = error.message.includes('username');
        const isEmail = error.message.includes('email');
        return res.status(409).json({ usernameTaken: isUsername, emailTaken: isEmail });
      }
      return res.status(500).json({ message: error.message });
    }
    return res.status(200).json(results);
  });
};