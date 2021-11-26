/*
  Warnings:

  - You are about to alter the column `queryPort` on the `GameServer` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `beaconPort` on the `GameServer` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.
  - You are about to alter the column `gamePort` on the `GameServer` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Int`.

*/
-- AlterTable
ALTER TABLE `GameServer` MODIFY `queryPort` INTEGER NOT NULL DEFAULT 15777,
    MODIFY `beaconPort` INTEGER NOT NULL DEFAULT 15001,
    MODIFY `gamePort` INTEGER NOT NULL DEFAULT 7000;
