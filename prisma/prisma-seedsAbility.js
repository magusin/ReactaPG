const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const abilities = [
    { name: "Puissant", strengthIncrease: 2, agilityIncrease: 1, healthIncrease: 0, speedIncrease: 0 },
    { name: "Robuste", strengthIncrease: 2, agilityIncrease: 0, healthIncrease: 3, speedIncrease: 0 },
    { name: "Combatif", strengthIncrease: 2, agilityIncrease: 0, healthIncrease: 0, speedIncrease: 1 },
    { name: "Adroit", strengthIncrease: 1, agilityIncrease: 2, healthIncrease: 0, speedIncrease: 0 },
    { name: "Ingénieux", strengthIncrease: 0, agilityIncrease: 2, healthIncrease: 3, speedIncrease: 0 },
    { name: "Habile", strengthIncrease: 0, agilityIncrease: 2, healthIncrease: 0, speedIncrease: 1 },
    { name: "Tenace", strengthIncrease: 1, agilityIncrease: 0, healthIncrease: 6, speedIncrease: 0},
    { name: "Infatigable", strengthIncrease: 0, agilityIncrease: 1, healthIncrease: 6, speedIncrease: 0 },
    { name: "Vigoureux", strengthIncrease: 0, agilityIncrease: 0, healthIncrease: 6, speedIncrease: 1 },
    { name: "Energique", strengthIncrease: 1, agilityIncrease: 0, healthIncrease: 0, speedIncrease: 2 },
    { name: "Vivace", strengthIncrease: 0, agilityIncrease: 1, healthIncrease: 0, speedIncrease: 2 },
    { name: "Dynamique", strengthIncrease: 0, agilityIncrease: 0, healthIncrease: 3, speedIncrease: 2}
  ];

  for (const ability of abilities) {
    await prisma.ability.create({
      data: ability,
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });