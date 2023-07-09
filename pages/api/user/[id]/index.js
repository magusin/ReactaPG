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
    case 'GET':
      if (req.query.id) {
        return await getPlayer(req, res)
      }
      break
    case 'PUT':
      if (req.query.id) {
        return await updatePlayer(req, res)
      }
      break
    default:
      return res.status(400).json({ message: 'bad request' })
  }
}

// found player by Id
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
        xp: true
      }
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

const updatePlayer = async (req, res) => {
  try {
    const { id } = req.query
    let updateData = req.body

    const updatedPlayer = await prisma.player.update({
      where: {
        id: parseInt(id)
      },
      data: updateData
    })

    if (updatedPlayer) {
      return res.status(200).json(updatedPlayer)
    } else {
      return res.status(404).json({ message: 'Player not found' })
    }
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
