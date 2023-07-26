import Cors from 'cors'
import { PrismaClient } from '@prisma/client'
import xpThresholdForLevel from 'src/utils/levelFunction'

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
        abilityChoices: true,
        capacityChoices: {
          include: {
            capacity: true
          }
        },
        capacities: true,
      }
    });

    if (!player) {
      return res.status(404).json({ message: 'Player not found' })
    }

    if (player.xp < xpThresholdForLevel(player.level + 1)) {
      return res
        .status(403)
        .json({ message: 'Player not eligible for level up' })
      }
      
      const levelSet = new Set([2, 5, 7, 10, 12, 15, 17, 20, 22, 25, 27, 30, 32, 35, 37, 40, 42, 45, 47, 50]);
      const allAbilities = await prisma.ability.findMany();
      let abilities = [];
      
      while (abilities.length < 3) {
        const randomAbility = allAbilities[Math.floor(Math.random() * allAbilities.length)];
      
        // Vérifiez que l'ability n'est pas déjà dans le tableau
        if (!abilities.find(ability => ability.id === randomAbility.id)) {
          abilities.push(randomAbility);
        }
      }
      
      // Pour les Capacity
      let capacitiesChoices = [];
      if (levelSet.has(player.level + 1)) {
        const allCapacities = await prisma.capacity.findMany({
          where: {
            NOT: {
              id: {
                in: player.capacities.map(capacity => capacity.id),
              },
            },
          },
        });
      
        while (capacitiesChoices.length < 3) {
          const randomCapacity = allCapacities[Math.floor(Math.random() * allCapacities.length)];
      
          // Vérifiez que la capacité n'est pas déjà dans le tableau
          if (!capacitiesChoices.find(capacity => capacity.id === randomCapacity.id)) {
            capacitiesChoices.push(randomCapacity);
          }
        }
      }
      
      const updatedPlayer = await prisma.player.update({
        where: { id: playerId },
        data: {
          abilityChoices: {
            create: abilities.map((ability) => ({
              abilityId: ability.id,
            })),
          },
          capacityChoices: {
            create: capacitiesChoices.map((capacity) => ({
              capacityId: capacity.id,
            })),
          },
          abilityRequired: true,
          capacitiesRequired: levelSet.has(player.level + 1),
          levelingUp: true,
        },
        include: {
          abilityChoices: {
            include: {
              ability: true,
            },
          },
          capacityChoices: {
            include: {
              capacity: true,
            },
          },
        },
      });

    return res.status(200).json(updatedPlayer)
  } catch (error) {
    console.error(error)
    return res
      .status(500)
      .json({ message: error.message })
  }
}
