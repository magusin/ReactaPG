/*
  Warnings:

  - Added the required column `name` to the `Capacity` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Spell` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Spell` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `capacity` ADD COLUMN `defIncrease` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `dexterityIncrease` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `dmgMaxIncrease` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `dmgMinIncrease` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `healthIncrease` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `speedIncrease` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `strengthIncrease` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `spell` ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;
