import bcrypt from 'bcrypt'
import Cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Initialiser le middleware CORS
let cors = Cors({
  methods: ['POST', 'HEAD']
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
  try {
    await runMiddleware(req, res, cors)
    switch (req.method) {
      case 'POST':
        return await login(req, res)
      default:
        return res.status(400).json({ message: 'bad request' })
    }
  } finally {
    await prisma.$disconnect()
  }
}

// login
const login = async (req, res) => {
  try {
    const player = await prisma.player.findUnique({
      where: { username: req.body.username }
    })

    if (!player) {
      return res.status(401).json({ usernameIncorrect: 'Username incorrect' })
    }

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      player.password
    )
    if (!isPasswordCorrect) {
      return res.status(401).json({ passwordIncorrect: 'Username incorrect' })
    }

    return res.status(200).json(player)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}
