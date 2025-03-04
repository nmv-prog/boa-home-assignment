-- CreateTable
CREATE TABLE `cart_items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `productId` VARCHAR(255) NOT NULL,
    `productVariantId` VARCHAR(255) NOT NULL,
    `title` VARCHAR(255) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `userId` VARCHAR(255) NOT NULL,
    `shopId` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
