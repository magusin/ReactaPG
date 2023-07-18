-- DropForeignKey
ALTER TABLE `fightevent` DROP FOREIGN KEY `fightEvent_fight_id_fkey`;

-- AddForeignKey
ALTER TABLE `Fight` ADD CONSTRAINT `Fight_player2_id_fkey` FOREIGN KEY (`player2_id`) REFERENCES `Player`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Fight` ADD CONSTRAINT `Fight_player1_id_fkey` FOREIGN KEY (`player1_id`) REFERENCES `Player`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FightEvent` ADD CONSTRAINT `FightEvent_fight_id_fkey` FOREIGN KEY (`fight_id`) REFERENCES `Fight`(`uuid`) ON DELETE RESTRICT ON UPDATE CASCADE;
