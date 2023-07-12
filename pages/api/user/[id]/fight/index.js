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
  await runMiddleware(req, res, cors)
  switch (req.method) {
    case 'GET':
      if (req.query.id) {
        return await getPlayerFights(req, res)
      }
      break
    default:
      return res.status(400).json({ message: 'bad request' })
  }
}

const getPlayerFights = async (req, res) => {
  try {
    const { id } = Number(req.query)

    const fights = await prisma.fight.findMany({
      where: {
        AND: [
          {
            player1_id: id
          },
          {
            player2_id: id
          }
        ]
      }
    })

    return res.status(200).json(fights)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}