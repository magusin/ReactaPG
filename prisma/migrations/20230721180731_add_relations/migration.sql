-- AlterTable
ALTER TABLE `player` ADD COLUMN `abilityRequired` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `capacitiesRequired` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `spellsRequired` BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE `Capacity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Spell` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PlayerToSpell` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PlayerToSpell_AB_unique`(`A`, `B`),
    INDEX `_PlayerToSpell_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `_PlayerToCapacity` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_PlayerToCapacity_AB_unique`(`A`, `B`),
    INDEX `_PlayerToCapacity_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_PlayerToSpell` ADD CONSTRAINT `_PlayerToSpell_A_fkey` FOREIGN KEY (`A`) REFERENCES `Player`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PlayerToSpell` ADD CONSTRAINT `_PlayerToSpell_B_fkey` FOREIGN KEY (`B`) REFERENCES `Spell`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PlayerToCapacity` ADD CONSTRAINT `_PlayerToCapacity_A_fkey` FOREIGN KEY (`A`) REFERENCES `Capacity`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_PlayerToCapacity` ADD CONSTRAINT `_PlayerToCapacity_B_fkey` FOREIGN KEY (`B`) REFERENCES `Player`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
