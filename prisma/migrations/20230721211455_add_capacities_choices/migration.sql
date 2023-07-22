-- AlterTable
ALTER TABLE `player` MODIFY `abilityRequired` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `_PlayerToCapacityChoices` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PlayerToCapacityChoices_AB_unique`(`A`, `B`),
    INDEX `_PlayerToCapacityChoices_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_PlayerToCapacityChoices` ADD CONSTRAINT `_PlayerToCapacityChoices_A_fkey` FOREIGN KEY (`A`) REFERENCES `Capacity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PlayerToCapacityChoices` ADD CONSTRAINT `_PlayerToCapacityChoices_B_fkey` FOREIGN KEY (`B`) REFERENCES `Player`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
