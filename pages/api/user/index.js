import connection from '#/db';
import bcrypt from 'bcrypt';
import Cors from 'cors'
import { PrismaClient } from '@prisma/client';

// Initialiser le middleware CORS
let cors = Cors({
  methods: ['POST', 'HEAD'],
})

const prisma = new PrismaClient();

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
    case "GET":
      return await getPlayers(req, res);
    case "POST":
      return await createPlayer(req, res);
    default:
      return res.status(400).json({ message: "bad request" });
  }
}
// liste des joueurs
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

// création d'un joueur
const createPlayer = async (req, res) => {
  try {
    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(req.body.password, 10); // '10' est le nombre de tours de hachage

    // Remplacement du mot de passe en clair par le mot de passe haché
    const player = {
      ...req.body,
      password: hashedPassword,
    };

    const createdPlayer = await prisma.player.create({
      data: {
        username: player.username,
        email: player.email,
        password: player.password,
      },
    });

    return res.status(200).json(createdPlayer);
  } catch (error) {
    if (error.code === 'P2002') {
      const isUsername = error.meta.target.includes('username');
      const isEmail = error.meta.target.includes('email');
      return res.status(409).json({ usernameTaken: isUsername, emailTaken: isEmail });
    }

    console.log('Error in createPlayer function:', error);
    return res.status(500).json({ message: error.message });
  }
};

//     connection.query('INSERT INTO player(username, email, password) VALUES(?,?,?)', [player.username, player.email, player.password], (error, results) => {    
//       if (error) {
//       if (error.code === 'ER_DUP_ENTRY') {
//         const isUsername = error.message.includes('username');
//         const isEmail = error.message.includes('email');
//         return res.status(409).json({ usernameTaken: isUsername, emailTaken: isEmail });
//       }
//       console.log('Error in INSERT query:', error);
//       return res.status(500).json({ message: error.message });
      
//     }
//     return res.status(200).json(results);
//   });

// } catch (error) {
//   console.log('Error in createPlayer function:', error);
//   return res.status(500).json({ message: error.message });
// }
// };