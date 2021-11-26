/*
  Warnings:

  - Made the column `name` on table `GameServer` required. This step will fail if there are existing NULL values in that column.
  - Made the column `ipAddress` on table `GameServer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `GameServer` MODIFY `name` VARCHAR(191) NOT NULL,
    MODIFY `ipAddress` VARCHAR(191) NOT NULL;
