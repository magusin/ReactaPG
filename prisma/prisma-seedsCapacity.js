const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  const capacities = [
    {
      name: 'Bretteur',
      strengthIncrease: 3,
      dexterityIncrease: 3,
      healthIncrease: 0,
      speedIncrease: 3,
      defIncrease: 0,
      dmgMinIncrease: 0,
      dmgMaxIncrease: 0
    },
    {
      name: 'Clerc',
      strengthIncrease: 3,
      dexterityIncrease: 2,
      healthIncrease: 6,
      speedIncrease: 2,
      defIncrease: 0,
      dmgMinIncrease: 0,
      dmgMaxIncrease: 0
    },
    {
      name: 'Chamane',
      strengthIncrease: 3,
      dexterityIncrease: 0,
      healthIncrease: 0,
      speedIncrease: 0,
      defIncrease: 1,
      dmgMinIncrease: 0,
      dmgMaxIncrease: 1
    },
    {
      name: 'Alchimiste',
      strengthIncrease: 4,
      dexterityIncrease: 4,
      healthIncrease: 3,
      speedIncrease: 0,
      defIncrease: 0,
      dmgMinIncrease: 0,
      dmgMaxIncrease: 0
    },
    {
      name: 'Archer',
      strengthIncrease: 0,
      dexterityIncrease: 3,
      healthIncrease: 0,
      speedIncrease: 0,
      defIncrease: 0,
      dmgMinIncrease: 1,
      dmgMaxIncrease: 1
    },
    {
      name: 'Berserker',
      strengthIncrease: 3,
      dexterityIncrease: 0,
      healthIncrease: 0,
      speedIncrease: 0,
      defIncrease: 0,
      dmgMinIncrease: 0,
      dmgMaxIncrease: 2
    },
    {
      name: 'Enchanteur',
      strengthIncrease: 0,
      dexterityIncrease: 0,
      healthIncrease: 9,
      speedIncrease: 0,
      defIncrease: 0,
      dmgMinIncrease: 1,
      dmgMaxIncrease: 1
    },
    {
      name: 'Templier',
      strengthIncrease: 3,
      dexterityIncrease: 0,
      healthIncrease: 0,
      speedIncrease: 6,
      defIncrease: 0,
      dmgMinIncrease: 0,
      dmgMaxIncrease: 0
    },
    {
      name: 'Guardien',
      strengthIncrease: 0,
      dexterityIncrease: 0,
      healthIncrease: 9,
      speedIncrease: 0,
      defIncrease: 2,
      dmgMinIncrease: 0,
      dmgMaxIncrease: 0
    },
    {
      name: 'Assassin',
      strengthIncrease: 0,
      dexterityIncrease: 0,
      healthIncrease: 0,
      speedIncrease: 3,
      defIncrease: 0,
      dmgMinIncrease: 1,
      dmgMaxIncrease: 1
    },
    {
      name: 'Guerrier',
      strengthIncrease: 3,
      dexterityIncrease: 0,
      healthIncrease: 0,
      speedIncrease: 0,
      defIncrease: 0,
      dmgMinIncrease: 1,
      dmgMaxIncrease: 1
    },
    {
      name: 'Barde',
      strengthIncrease: 2,
      dexterityIncrease: 3,
      healthIncrease: 6,
      speedIncrease: 2,
      defIncrease: 0,
      dmgMinIncrease: 0,
      dmgMaxIncrease: 0
    },
    {
      name: 'Druide',
      strengthIncrease: 0,
      dexterityIncrease: 0,
      healthIncrease: 9,
      speedIncrease: 3,
      defIncrease: 1,
      dmgMinIncrease: 0,
      dmgMaxIncrease: 0
    },
    {
      name: 'Rodeur',
      strengthIncrease: 0,
      dexterityIncrease: 6,
      healthIncrease: 0,
      speedIncrease: 3,
      defIncrease: 0,
      dmgMinIncrease: 0,
      dmgMaxIncrease: 0
    },
    {
      name: 'Prêtre',
      strengthIncrease: 0,
      dexterityIncrease: 2,
      healthIncrease: 12,
      speedIncrease: 0,
      defIncrease: 1,
      dmgMinIncrease: 0,
      dmgMaxIncrease: 0
    },
    {
      name: 'Roublard',
      strengthIncrease: 0,
      dexterityIncrease: 4,
      speedIncrease: 4,
      healthIncrease: 3,
      defIncrease: 0,
      dmgMinIncrease: 0,
      dmgMaxIncrease: 0
    },
    {
      name: 'Barbare',
      strengthIncrease: 6,
      dexterityIncrease: 0,
      healthIncrease: 9,
      speedIncrease: 0,
      defIncrease: 0,
      dmgMinIncrease: 0,
      dmgMaxIncrease: 0
    },
    {
      name: 'Ninja',
      strengthIncrease: 0,
      dexterityIncrease: 3,
      healthIncrease: 0,
      speedIncrease: 6,
      defIncrease: 0,
      dmgMinIncrease: 0,
      dmgMaxIncrease: 0
    },
    {
      name: 'Moine',
      strengthIncrease: 2,
      dexterityIncrease: 2,
      healthIncrease: 6,
      speedIncrease: 0,
      defIncrease: 0,
      dmgMinIncrease: 0,
      dmgMaxIncrease: 1
    },
    {
      name: 'Chevalier',
      strengthIncrease: 3,
      dexterityIncrease: 0,
      healthIncrease: 9,
      speedIncrease: 0,
      defIncrease: 0,
      dmgMinIncrease: 0,
      dmgMaxIncrease: 1
    },
  ]

  for (const capacity of capacities) {
    await prisma.capacity.create({
      data: capacity
    })
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
    console.log('seeds completed')
  })
