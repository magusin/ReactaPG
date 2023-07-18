/*
  Warnings:

  - You are about to drop the column `combat_id` on the `fightevent` table. All the data in the column will be lost.
  - Added the required column `fight_id` to the `fightEvent` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `fightevent` DROP FOREIGN KEY `fightEvent_combat_id_fkey`;

-- AlterTable
ALTER TABLE `fightevent` DROP COLUMN `combat_id`,
    ADD COLUMN `fight_id` VARCHAR(191) NOT NULL;

-- AddForeignKey
ALTER TABLE `fightEvent` ADD CONSTRAINT `fightEvent_fight_id_fkey` FOREIGN KEY (`fight_id`) REFERENCES `fight`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;
