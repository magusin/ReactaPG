const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
    const skills = [
        { name: "Renaissance", description: "Après avoir été réduit à 0 point de vie vous en regagnez un dixième (qu'une fois par combat)" },
        { name: "Parade", description: "Si votre esquive échoue vous avez une chance de parer l'attaque et de réduire les dégâts reçus de moitié." },
        { name: "Riposte", description: "Vous avez une chance de contre-attaquer après une attaque ennemie." },
        { name: "Nociception", description: "Vous avez une chance de réduire les dégats reçus."},
        { name: "Pyromancie", description: "Vous avez une chance de brûler votre adversaire et de lui infliger des dégats supplémentaires."},
        { name: "Cryomancie", description: "Vous avez une chance de geler votre adversaire et de lui gêner son prochain tour."},
        { name: "Thermoception", description: "Vous avez une chance d'annuler les effets liés aux éléments."},
        { name: "Régénération", description: "Vous avez une chance de récupérer des points de vie."},
        { name: "Rage", description: "Vous avez une chance d'augmentez votre force après avoir reçus un coup."}

        
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