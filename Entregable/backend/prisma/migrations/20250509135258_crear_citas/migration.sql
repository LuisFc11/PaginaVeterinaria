/*
  Warnings:

  - You are about to drop the column `createdAt` on the `cita` table. All the data in the column will be lost.
  - You are about to drop the column `nombre` on the `cita` table. All the data in the column will be lost.
  - You are about to drop the column `servicio` on the `cita` table. All the data in the column will be lost.
  - You are about to drop the column `telefono` on the `cita` table. All the data in the column will be lost.
  - You are about to drop the column `creadoEn` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `usuario` table. All the data in the column will be lost.
  - You are about to drop the `lugar` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[correo]` on the table `Usuario` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `estado` to the `Cita` table without a default value. This is not possible if the table is not empty.
  - Added the required column `servicioId` to the `Cita` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usuarioId` to the `Cita` table without a default value. This is not possible if the table is not empty.
  - Added the required column `apellido` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `correo` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Usuario_email_key` ON `usuario`;

-- AlterTable
ALTER TABLE `cita` DROP COLUMN `createdAt`,
    DROP COLUMN `nombre`,
    DROP COLUMN `servicio`,
    DROP COLUMN `telefono`,
    ADD COLUMN `estado` VARCHAR(191) NOT NULL,
    ADD COLUMN `servicioId` INTEGER NOT NULL,
    ADD COLUMN `usuarioId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `usuario` DROP COLUMN `creadoEn`,
    DROP COLUMN `email`,
    DROP COLUMN `password`,
    ADD COLUMN `apellido` VARCHAR(191) NOT NULL,
    ADD COLUMN `correo` VARCHAR(191) NOT NULL,
    ADD COLUMN `fecha_registro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- DropTable
DROP TABLE `lugar`;

-- CreateTable
CREATE TABLE `Servicio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `descripcion` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Usuario_correo_key` ON `Usuario`(`correo`);

-- AddForeignKey
ALTER TABLE `Cita` ADD CONSTRAINT `Cita_usuarioId_fkey` FOREIGN KEY (`usuarioId`) REFERENCES `Usuario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cita` ADD CONSTRAINT `Cita_servicioId_fkey` FOREIGN KEY (`servicioId`) REFERENCES `Servicio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
