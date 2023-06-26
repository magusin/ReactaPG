import connection from '#/db';
import bcrypt from 'bcrypt';
import Cors from 'cors'

// Initialiser le middleware CORS
let cors = Cors({
  methods: ['POST', 'HEAD'],
})

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async function handler(req, res) {
  await runMiddleware(req, res, cors)
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
      // déchiffrer le mot de passe haché
      const isPasswordCorrect = await bcrypt.compare(req.body.password, results[0].password);
      if (!isPasswordCorrect) return res.status(401).json({ message: 'username or password incorrect' });
      return res.status(200).json(results[0]);
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};