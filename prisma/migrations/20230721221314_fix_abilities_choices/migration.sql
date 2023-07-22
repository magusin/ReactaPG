/*
  Warnings:

  - You are about to drop the column `ability1Id` on the `player` table. All the data in the column will be lost.
  - You are about to drop the column `ability2Id` on the `player` table. All the data in the column will be lost.
  - You are about to drop the column `ability3Id` on the `player` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `player` DROP FOREIGN KEY `AbilityToPlayer1FKey`;

-- DropForeignKey
ALTER TABLE `player` DROP FOREIGN KEY `AbilityToPlayer2FKey`;

-- DropForeignKey
ALTER TABLE `player` DROP FOREIGN KEY `AbilityToPlayer3FKey`;

-- AlterTable
ALTER TABLE `player` DROP COLUMN `ability1Id`,
    DROP COLUMN `ability2Id`,
    DROP COLUMN `ability3Id`;

-- CreateTable
CREATE TABLE `_PlayerToAbilityChoices` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PlayerToAbilityChoices_AB_unique`(`A`, `B`),
    INDEX `_PlayerToAbilityChoices_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_PlayerToAbilityChoices` ADD CONSTRAINT `_PlayerToAbilityChoices_A_fkey` FOREIGN KEY (`A`) REFERENCES `Ability`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PlayerToAbilityChoices` ADD CONSTRAINT `_PlayerToAbilityChoices_B_fkey` FOREIGN KEY (`B`) REFERENCES `Player`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
