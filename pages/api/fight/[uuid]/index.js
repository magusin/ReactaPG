import { PrismaClient } from '@prisma/client'
import Cors from 'cors'

const prisma = new PrismaClient()

// Initialiser le middleware CORS
let cors = Cors({
  methods: ['GET', 'HEAD']
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
    case 'GET':
      return getFight(req, res)
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}

const getFight = async (req, res) => {
  try {
    const { uuid } = req.query

    const fight = await prisma.fight.findUnique({
      where: { uuid: uuid },
      include: {
        events: true,
      },
    })

    if (!fight) {
      return res.status(404).json({ error: 'Fight not found' })
    }

    return res.status(200).json(fight)
  } catch (error) {
    return res.status(500).json({ error: error.message })
  }
}