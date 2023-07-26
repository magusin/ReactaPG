import Cors from 'cors'
import { PrismaClient } from '@prisma/client'

// Initialiser le middleware CORS
let cors = Cors({
  methods: ['GET', 'PUT', 'HEAD']
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
    await runMiddleware(req, res, cors)
    switch (req.method) {
      case 'DELETE':
        if (req.query.id) {
          return await deleteAbilities(req, res)
        }
        break
      default:
        return res.status(400).json({ message: 'bad request' })
    }
  } finally {
    await prisma.$disconnect()
  }
}

const deleteAbilities = async (req, res) => {
    try {
      const playerId = parseInt(req.query.id);
  
      const abilities = await prisma.abilityChoice.deleteMany({
        where: {
          playerId: playerId,
        },
      });
  
      return res.status(200).json(abilities)
    } catch (error) {
      return res.status(500).json({ message: error.message })
    }
  }
