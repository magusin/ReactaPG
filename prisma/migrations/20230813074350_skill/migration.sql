/*
  Warnings:

  - You are about to drop the column `spellsRequired` on the `player` table. All the data in the column will be lost.
  - You are about to drop the `_playertospell` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `spell` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_playertospell` DROP FOREIGN KEY `_PlayerToSpell_A_fkey`;

-- DropForeignKey
ALTER TABLE `_playertospell` DROP FOREIGN KEY `_PlayerToSpell_B_fkey`;

-- AlterTable
ALTER TABLE `player` DROP COLUMN `spellsRequired`,
    ADD COLUMN `skillsRequired` BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE `_playertospell`;

-- DropTable
DROP TABLE `spell`;

-- CreateTable
CREATE TABLE `SkillChoice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `playerId` INTEGER NOT NULL,
    `skillId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Skill` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PlayerToSkill` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PlayerToSkill_AB_unique`(`A`, `B`),
    INDEX `_PlayerToSkill_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SkillChoice` ADD CONSTRAINT `SkillChoice_playerId_fkey` FOREIGN KEY (`playerId`) REFERENCES `Player`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SkillChoice` ADD CONSTRAINT `SkillChoice_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `Skill`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PlayerToSkill` ADD CONSTRAINT `_PlayerToSkill_A_fkey` FOREIGN KEY (`A`) REFERENCES `Player`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PlayerToSkill` ADD CONSTRAINT `_PlayerToSkill_B_fkey` FOREIGN KEY (`B`) REFERENCES `Skill`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
