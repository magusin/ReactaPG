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
  try {
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
  } finally {
    await prisma.$disconnect()
  }
}

const levelUp = async (req, res) => {
  try {
    const playerId = Number(req.query.id)

    // Check if player is eligible for leveling up
    const player = await prisma.player.findUnique({
      where: { id: playerId },
      include: {
        abilitiesChoices: true,
        capacitiesChoices: true
      }
    })
    console.log('player', player)
    if (!player) {
      return res.status(404).json({ message: 'Player not found' })
    }

    if (player.xp < xpThresholdForLevel(player.level + 1)) {
      return res
        .status(403)
        .json({ message: 'Player not eligible for level up' })
    }

    const abilities = []
    const capacitiesChoices = []

    if (player.abilitiesChoices.length < 3) {
      const allAbilities = await prisma.ability.findMany()

      while (abilities.length < 3) {
        const randomIndex = Math.floor(Math.random() * allAbilities.length)
        const ability = allAbilities[randomIndex]

        if (!abilities.includes(ability)) {
          abilities.push(ability)
        }
        console.log('Selected abilities:', abilities)
      }
    }

    const levelSet = new Set([2, 5, 7, 10, 12, 15, 17, 20, 22, 25, 27, 30, 32, 35, 37, 40, 42, 45, 47, 50])

    if (player.capacitiesChoices.length < 3 && levelSet.has(player.level + 1)) {
      const allCapacities = await prisma.capacity.findMany({
        where: {
          NOT: {
            players: {
              some: {
                id: playerId
              }
            }
          }
        }
      })

      while (capacitiesChoices.length < 3) {
        const randomIndex = Math.floor(Math.random() * allCapacities.length)
        const capacity = allCapacities[randomIndex]

        if (!capacitiesChoices.includes(capacity)) {
          capacitiesChoices.push(capacity)
        }
        console.log('Selected capacities:', capacitiesChoices)
      }
    }

    await prisma.player.update({
      where: { id: playerId },
      data: {
        abilitiesChoices: {
          connect: abilities.map((ability) => ({ id: ability.id })),
        },
        capacitiesChoices: {
          connect: capacitiesChoices.map((capacity) => ({ id: capacity.id })),
        },
        abilityRequired: true,
        capacitiesRequired: levelSet.has(player.level + 1),
        levelingUp: true
      }
    })

    console.log('Player leveled up')

    return res.status(200).json({ message: 'Level up successful' })
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: error.message })
  }
}
