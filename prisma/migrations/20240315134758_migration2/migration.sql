/*
  Warnings:

  - You are about to drop the `Grille_tariffiaire` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `estValide` on table `Avis` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `date_presation` to the `Contact` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Grille_tariffiaire" DROP CONSTRAINT "Grille_tariffiaire_id_voiture_fkey";

-- AlterTable
ALTER TABLE "Avis" ALTER COLUMN "estValide" SET NOT NULL,
ALTER COLUMN "estRgpd" DROP NOT NULL,
ALTER COLUMN "estCondition" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "date_presation" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "estCondition" DROP NOT NULL,
ALTER COLUMN "estRgpd" DROP NOT NULL;

-- DropTable
DROP TABLE "Grille_tariffiaire";

-- CreateTable
CREATE TABLE "GrilleTarifiaire" (
    "id" SERIAL NOT NULL,
    "temps" TEXT NOT NULL,
    "prix" TEXT NOT NULL,
    "id_voiture" INTEGER NOT NULL,

    CONSTRAINT "GrilleTarifiaire_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GrilleTarifiaire" ADD CONSTRAINT "GrilleTarifiaire_id_voiture_fkey" FOREIGN KEY ("id_voiture") REFERENCES "Voiture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
