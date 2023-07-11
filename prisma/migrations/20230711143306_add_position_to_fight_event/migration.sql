/*
  Warnings:

  - The primary key for the `fightevent` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `combat_uuid` on the `fightevent` table. All the data in the column will be lost.
  - You are about to drop the column `turn` on the `fightevent` table. All the data in the column will be lost.
  - You are about to drop the column `uuid` on the `fightevent` table. All the data in the column will be lost.
  - Added the required column `combat_id` to the `fightEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id` to the `fightEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `fightEvent` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `fightevent` DROP FOREIGN KEY `FightEvent_combat_uuid_fkey`;

-- AlterTable
ALTER TABLE `fightevent` DROP PRIMARY KEY,
    DROP COLUMN `combat_uuid`,
    DROP COLUMN `turn`,
    DROP COLUMN `uuid`,
    ADD COLUMN `combat_id` VARCHAR(191) NOT NULL,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `position` INTEGER NOT NULL,
    ADD COLUMN `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `fightEvent` ADD CONSTRAINT `fightEvent_combat_id_fkey` FOREIGN KEY (`combat_id`) REFERENCES `fight`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;
