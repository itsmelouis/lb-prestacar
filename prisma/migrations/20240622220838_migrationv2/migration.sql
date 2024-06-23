/*
  Warnings:

  - You are about to drop the column `id_voiture` on the `GrilleTarifiaire` table. All the data in the column will be lost.
  - You are about to drop the column `id_voiture` on the `Option` table. All the data in the column will be lost.
  - You are about to drop the column `id_categorie` on the `Voiture` table. All the data in the column will be lost.
  - Added the required column `voitureId` to the `GrilleTarifiaire` table without a default value. This is not possible if the table is not empty.
  - Added the required column `voitureId` to the `Option` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GrilleTarifiaire" DROP CONSTRAINT "GrilleTarifiaire_id_voiture_fkey";

-- DropForeignKey
ALTER TABLE "Option" DROP CONSTRAINT "Option_id_voiture_fkey";

-- DropForeignKey
ALTER TABLE "Voiture" DROP CONSTRAINT "Voiture_id_categorie_fkey";

-- AlterTable
ALTER TABLE "GrilleTarifiaire" DROP COLUMN "id_voiture",
ADD COLUMN     "voitureId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Option" DROP COLUMN "id_voiture",
ADD COLUMN     "voitureId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Voiture" DROP COLUMN "id_categorie";

-- CreateTable
CREATE TABLE "VoitureCategorie" (
    "voitureId" INTEGER NOT NULL,
    "categorieId" INTEGER NOT NULL,

    CONSTRAINT "VoitureCategorie_pkey" PRIMARY KEY ("voitureId","categorieId")
);

-- AddForeignKey
ALTER TABLE "VoitureCategorie" ADD CONSTRAINT "VoitureCategorie_voitureId_fkey" FOREIGN KEY ("voitureId") REFERENCES "Voiture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoitureCategorie" ADD CONSTRAINT "VoitureCategorie_categorieId_fkey" FOREIGN KEY ("categorieId") REFERENCES "Categorie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_voitureId_fkey" FOREIGN KEY ("voitureId") REFERENCES "Voiture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GrilleTarifiaire" ADD CONSTRAINT "GrilleTarifiaire_voitureId_fkey" FOREIGN KEY ("voitureId") REFERENCES "Voiture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
