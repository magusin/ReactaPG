import connection from '#/db';

export default async function handler(req, res) {
    switch (req.method) {
      case "POST":
        return emailExist(req, res);
      default:
        return res.status(400).json({ message: "bad request" });
    }
  }

  const emailExist = async (req, res) => {
    try {
      connection.query('SELECT * FROM player WHERE email = ?', [req.body.email], (error, results) => {
        if (error) throw error;
        console.log(results);
  
        if (results.length > 0) {
          return res.status(200).json({ taken: true });
        } else {
          return res.status(200).json({ taken: false });
        }
      });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };