-- CreateTable
CREATE TABLE `Ability` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `strengthIncrease` INTEGER NOT NULL DEFAULT 0,
    `dexterityIncrease` INTEGER NOT NULL DEFAULT 0,
    `healthIncrease` INTEGER NOT NULL DEFAULT 0,
    `speedIncrease` INTEGER NOT NULL DEFAULT 0,
    `image` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
