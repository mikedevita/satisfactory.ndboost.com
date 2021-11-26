/*
  Warnings:

  - You are about to drop the column `EnableStatusCheck` on the `GameServer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `GameServer` DROP COLUMN `EnableStatusCheck`,
    ADD COLUMN `enableStatusCheck` BOOLEAN NOT NULL DEFAULT true;
