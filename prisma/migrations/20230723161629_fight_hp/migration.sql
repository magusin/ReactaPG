/*
  Warnings:

  - Added the required column `player1HP` to the `Fight` table without a default value. This is not possible if the table is not empty.
  - Added the required column `player2HP` to the `Fight` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `fight` ADD COLUMN `player1HP` INTEGER NOT NULL,
    ADD COLUMN `player2HP` INTEGER NOT NULL;
