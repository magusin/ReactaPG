-- AlterTable
ALTER TABLE `player` ADD COLUMN `dex` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `dmgMax` INTEGER NOT NULL DEFAULT 5,
    ADD COLUMN `dmgMin` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `hp` INTEGER NOT NULL DEFAULT 50,
    ADD COLUMN `hpMax` INTEGER NOT NULL DEFAULT 50;

-- CreateTable
CREATE TABLE `Fight` (
    `uuid` VARCHAR(191) NOT NULL,
    `player1_id` INTEGER NOT NULL,
    `player2_id` INTEGER NOT NULL,
    `winner_id` INTEGER NOT NULL,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FightEvent` (
    `uuid` VARCHAR(191) NOT NULL,
    `combat_uuid` VARCHAR(191) NOT NULL,
    `message` VARCHAR(191) NOT NULL,
    `turn` INTEGER NOT NULL,

    PRIMARY KEY (`uuid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `FightEvent` ADD CONSTRAINT `FightEvent_combat_uuid_fkey` FOREIGN KEY (`combat_uuid`) REFERENCES `Fight`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;
