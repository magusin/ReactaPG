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
        case 'GET':
            return await getCapacities(req, res)
          break
        default:
          return res.status(400).json({ message: 'bad request' })
      }
    } finally {
      await prisma.$disconnect()
    }
  }

  const getCapacities = async (req, res) => {
    try {
        const abilities = await prisma.Capacity.findMany({
            include: {
              playersChoices: true,
            },
          })
    
        return res.status(200).json(abilities)
    }
    catch (error) {
        return res.status(500).json({ message: error.message })
    }
}