import Cors from 'cors'
import { PrismaClient } from '@prisma/client'

// Initialiser le middleware CORS
let cors = Cors({
  methods: ['POST', 'HEAD']
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
      case 'POST':
          return await createFightEvent(req, res)
        break
      default:
        return res.status(400).json({ message: 'bad request' })
    }
  } finally {
    await prisma.$disconnect()
  }
}

const createFightEvent = async (req, res) => {
  const fightEventData = req.body
  try {
    const fightEvent = await prisma.fightEvent.create({
      data: fightEventData
    })
    res.status(200).json({ fightEvent })
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
}
