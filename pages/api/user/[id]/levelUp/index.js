import Cors from 'cors'
import { PrismaClient } from '@prisma/client'
import xpThresholdForLevel from 'src/utils/levelFunction'

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
        return await levelUp(req, res)
      }
      break
    default:
      return res.status(400).json({ message: 'bad request' })
  }
}

const levelUp = async (req, res) => {
    try {
      const playerId = Number(req.query.id);
  
      // Check if player is eligible for leveling up
      const player = await prisma.player.findUnique({
        where: { id: playerId }
      })
      
      if (!player) {
        return res.status(404).json({ message: 'Player not found' })
      }
  
      if (player.xp < xpThresholdForLevel(player.level + 1)) {
        return res
          .status(403)
          .json({ message: 'Player not eligible for level up' })
      }
  
      if (player.ability1Id !== null && player.ability2Id !== null && player.ability3Id !== null) {
        console.log('Player has already abilities, cannot add abilities');
        return res.status(409).json({ message: 'Player has already abilities, cannot add abilities' });
      }
  
      const allAbilities = await prisma.ability.findMany()
      const abilities = []
  
      while (abilities.length < 3) {
        const randomIndex = Math.floor(Math.random() * allAbilities.length)
        const ability = allAbilities[randomIndex]
  
        if (!abilities.includes(ability)) {
          abilities.push(ability)
        }
      }
  
      await prisma.player.update({
        where: { id: playerId },
        data: {
          ability1: { connect: { id: abilities[0].id } },
          ability2: { connect: { id: abilities[1].id } },
          ability3: { connect: { id: abilities[2].id } }
        }
      })
  
      console.log('Player leveled up')
  
      return res.status(200).json({ message: 'Level up successful' })
    } catch (error) {
      console.error(error)
      return res
        .status(500)
        .json({ message: 'An error occurred while trying to level up' })
    }
  }
