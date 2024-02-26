-- CreateTable
CREATE TABLE "Avis" (
    "id" SERIAL NOT NULL,
    "prenom" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "estValide" BOOLEAN DEFAULT false,
    "estRgpd" BOOLEAN NOT NULL,
    "estCondition" BOOLEAN NOT NULL,

    CONSTRAINT "Avis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Voiture" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,
    "nom_image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "id_categorie" INTEGER NOT NULL,

    CONSTRAINT "Voiture_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Categorie" (
    "id" SERIAL NOT NULL,
    "nom" TEXT NOT NULL,

    CONSTRAINT "Categorie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Option" (
    "id" SERIAL NOT NULL,
    "intitule" TEXT NOT NULL,
    "prix" TEXT NOT NULL,
    "id_voiture" INTEGER NOT NULL,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Grille_tariffiaire" (
    "id" SERIAL NOT NULL,
    "temps" TEXT NOT NULL,
    "prix" TEXT NOT NULL,
    "id_voiture" INTEGER NOT NULL,

    CONSTRAINT "Grille_tariffiaire_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Utilisateur" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Utilisateur_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" SERIAL NOT NULL,
    "prenom" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "telephone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "type_prestation" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "estCondition" BOOLEAN NOT NULL,
    "estRgpd" BOOLEAN NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Voiture" ADD CONSTRAINT "Voiture_id_categorie_fkey" FOREIGN KEY ("id_categorie") REFERENCES "Categorie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_id_voiture_fkey" FOREIGN KEY ("id_voiture") REFERENCES "Voiture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Grille_tariffiaire" ADD CONSTRAINT "Grille_tariffiaire_id_voiture_fkey" FOREIGN KEY ("id_voiture") REFERENCES "Voiture"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
