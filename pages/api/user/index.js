import bcrypt from 'bcrypt';
import Cors from 'cors'
import { PrismaClient } from '@prisma/client';

// Initialiser le middleware CORS
let cors = Cors({
  methods: ['POST', 'GET', 'HEAD'],
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

// Obtenir tous les joueurs
const getPlayers = async (req, res) => {
  try {
    const players = await prisma.player.findMany(
      {select: {
        id: true,
        username: true,
        def: true,
        dex: true,
        dmgMax: true,
        dmgMin: true,
        hp: true,
        hpMax: true,
        init: true,
        level: true,
        pa: true,
        paMax: true,
        str: true,
        type: true,
        xp: true,
        speed: true
      },
    }
  );

    return res.status(200).json(players);
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