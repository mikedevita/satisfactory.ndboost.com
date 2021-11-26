-- AlterTable
ALTER TABLE `GameServer` ADD COLUMN `responseTimeInMsec` VARCHAR(191) NULL,
    ADD COLUMN `serverState` VARCHAR(191) NULL,
    ADD COLUMN `serverVersion` VARCHAR(191) NULL;
