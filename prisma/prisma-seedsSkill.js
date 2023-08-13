const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
    const skills = [
        { name: 'Renaissance', description: "Vous n'abandonnez jamais et vous relevez avec un dixième de vos points de vie maximum après avoir été réduit à 0 point de vie. Vous ne pouvez utiliser cette capacité qu'une fois par combat." },
        { name: "Parade", description: "Si votre esquive échoue vous avez une chance de parer l'attaque et de réduire les dégâts de moitié." },
        { name: "Fourberie", description: "Le fairplay c'est pour les faibles. Vous attaquez toujours en premier et avez une faible chance de la faire quand ce n'est pas votre tour."}
    ];

    for (const skill of skills) {
        await prisma.skill.create({
            data: skill,
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
    console.log('seeds completed')
  });