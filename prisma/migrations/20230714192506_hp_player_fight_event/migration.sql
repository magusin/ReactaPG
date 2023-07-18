/*
  Warnings:

  - Added the required column `hpPlayer1` to the `FightEvent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hpPlayer2` to the `FightEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `fightevent` ADD COLUMN `hpPlayer1` INTEGER NOT NULL,
    ADD COLUMN `hpPlayer2` INTEGER NOT NULL;
