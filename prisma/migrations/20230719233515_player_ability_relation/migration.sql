-- AlterTable
ALTER TABLE `player` ADD COLUMN `ability1Id` INTEGER NULL,
    ADD COLUMN `ability2Id` INTEGER NULL,
    ADD COLUMN `ability3Id` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Player` ADD CONSTRAINT `AbilityToPlayer1FKey` FOREIGN KEY (`ability1Id`) REFERENCES `Ability`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Player` ADD CONSTRAINT `AbilityToPlayer2FKey` FOREIGN KEY (`ability2Id`) REFERENCES `Ability`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Player` ADD CONSTRAINT `AbilityToPlayer3FKey` FOREIGN KEY (`ability3Id`) REFERENCES `Ability`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;