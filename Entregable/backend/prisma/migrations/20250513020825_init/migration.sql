/*
  Warnings:

  - You are about to drop the column `estado` on the `cita` table. All the data in the column will be lost.
  - You are about to drop the column `servicioId` on the `cita` table. All the data in the column will be lost.
  - You are about to drop the column `usuarioId` on the `cita` table. All the data in the column will be lost.
  - You are about to drop the `servicio` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `usuario` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `correo` to the `Cita` table without a default value. This is not possible if the table is not empty.
  - Added the required column `especie` to the `Cita` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hora` to the `Cita` table without a default value. This is not possible if the table is not empty.
  - Added the required column `motivo` to the `Cita` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombreDuenio` to the `Cita` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombreMascota` to the `Cita` table without a default value. This is not possible if the table is not empty.
  - Added the required column `raza` to the `Cita` table without a default value. This is not possible if the table is not empty.
  - Added the required column `telefono` to the `Cita` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `cita` DROP FOREIGN KEY `Cita_servicioId_fkey`;

-- DropForeignKey
ALTER TABLE `cita` DROP FOREIGN KEY `Cita_usuarioId_fkey`;

-- DropIndex
DROP INDEX `Cita_servicioId_fkey` ON `cita`;

-- DropIndex
DROP INDEX `Cita_usuarioId_fkey` ON `cita`;

-- AlterTable
ALTER TABLE `cita` DROP COLUMN `estado`,
    DROP COLUMN `servicioId`,
    DROP COLUMN `usuarioId`,
    ADD COLUMN `correo` VARCHAR(191) NOT NULL,
    ADD COLUMN `creadaEn` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `especie` VARCHAR(191) NOT NULL,
    ADD COLUMN `hora` VARCHAR(191) NOT NULL,
    ADD COLUMN `motivo` VARCHAR(191) NOT NULL,
    ADD COLUMN `nombreDuenio` VARCHAR(191) NOT NULL,
    ADD COLUMN `nombreMascota` VARCHAR(191) NOT NULL,
    ADD COLUMN `raza` VARCHAR(191) NOT NULL,
    ADD COLUMN `telefono` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `servicio`;

-- DropTable
DROP TABLE `usuario`;
