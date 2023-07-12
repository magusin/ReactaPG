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
      if (req.query.uuid) {
        return await getPlayerFights(req, res)
      }
      break
    default:
      return res.status(400).json({ message: 'bad request' })
  }
}

const getPlayerFights = async (req, res) => {
  try {
    const { uuid } = req.query

    const fight = await prisma.fight.findUnique({
      where: {
        uuid: uuid
      }
    })

    return res.status(200).json(fight)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
