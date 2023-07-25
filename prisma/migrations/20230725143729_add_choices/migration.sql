/*
  Warnings:

  - You are about to drop the `_playertoabilitychoices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_playertocapacitychoices` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_playertoabilitychoices` DROP FOREIGN KEY `_PlayerToAbilityChoices_A_fkey`;

-- DropForeignKey
ALTER TABLE `_playertoabilitychoices` DROP FOREIGN KEY `_PlayerToAbilityChoices_B_fkey`;

-- DropForeignKey
ALTER TABLE `_playertocapacitychoices` DROP FOREIGN KEY `_PlayerToCapacityChoices_A_fkey`;

-- DropForeignKey
ALTER TABLE `_playertocapacitychoices` DROP FOREIGN KEY `_PlayerToCapacityChoices_B_fkey`;

-- DropTable
DROP TABLE `_playertoabilitychoices`;

-- DropTable
DROP TABLE `_playertocapacitychoices`;

-- CreateTable
CREATE TABLE `AbilityChoice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `playerId` INTEGER NOT NULL,
    `abilityId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `CapacityChoice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `playerId` INTEGER NOT NULL,
    `capacityId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AbilityChoice` ADD CONSTRAINT `AbilityChoice_playerId_fkey` FOREIGN KEY (`playerId`) REFERENCES `Player`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AbilityChoice` ADD CONSTRAINT `AbilityChoice_abilityId_fkey` FOREIGN KEY (`abilityId`) REFERENCES `Ability`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CapacityChoice` ADD CONSTRAINT `CapacityChoice_playerId_fkey` FOREIGN KEY (`playerId`) REFERENCES `Player`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CapacityChoice` ADD CONSTRAINT `CapacityChoice_capacityId_fkey` FOREIGN KEY (`capacityId`) REFERENCES `Capacity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
