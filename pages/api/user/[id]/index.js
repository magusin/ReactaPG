import Cors from 'cors'
import { PrismaClient } from '@prisma/client'

// Initialiser le middleware CORS
let cors = Cors({
  methods: ['GET', 'HEAD']
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
        return await getPlayer(req, res)
      }
    default:
      return res.status(400).json({ message: 'bad request' })
  }
}

// Obtenir un joueur spécifique en utilisant son id
const getPlayer = async (req, res) => {
    try {
        const { id } = req.query
    
        const player = await prisma.player.findUnique({
        where: {
            id: parseInt(id)
        },
      select: {
        id: true,
        username: true,
        email: true,
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
      },
    })
        if (player) {
        return res.status(200).json(player)
        } else {
        return res.status(404).json({ message: 'Player not found' })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
    }
