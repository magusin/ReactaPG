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
    await runMiddleware(req, res, cors)
    switch (req.method) {
      case 'POST':
        if (req.query.id) {
          return await createFight(req, res)
        }
        break
      default:
        return res.status(400).json({ message: 'bad request' })
    }
}

const createFight = async (req, res) => {
    const combatData = req.body
    try {
      const combat = await prisma.combat.create({
        data: combatData
      })
      res.status(200).json({ combat })
    } catch (error) {
      res.status(500).json({ error: 'Unable to save combat data' })
    }
}
