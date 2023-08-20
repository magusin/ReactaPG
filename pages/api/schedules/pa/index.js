import Cors from 'cors'
import { PrismaClient } from '@prisma/client'

// Initialiser le middleware CORS
let cors = Cors({
  methods: ['PUT', 'HEAD']
})

const prisma = new PrismaClient()

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
    try {
        const { username, password } = req.body;
        console.log(req.body)
      // Vérifiez le nom d'utilisateur et le mot de passe
      if (username === process.env.API_USERNAME && password === process.env.API_PASSWORD) {        
        await runMiddleware(req, res, cors);
  
        switch (req.method) {
          case 'PUT':
            return await updatePa(req, res);
          default:
            return res.status(400).json({ message: 'Bad request' });
        }
      } else {
        return res.status(401).json({ message: 'Unauthorized' });
      }
    } finally {
      await prisma.$disconnect();
    }
  }

  const updatePa = async (req, res) => {
    try {
        const players = await prisma.Player.findMany();
        for (const player of players) {
            const updatedPa = Math.min(player.pa + 5, player.paMax);
            await prisma.Player.update({
              where: { id: player.id },
              data: { pa: updatedPa },
            });
          }
        return res.status(200).json({ message: 'pa updated' })
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}