import { prisma } from "~/prisma/db";

interface CategoryBody {
  nom: string;
}

export default eventHandler<{ body: CategoryBody }>(async (event) => {
  const { nom } = await readBody(event);
  if (!nom) {
    throw createError({
      message: "Le nom de la catégorie est obligatoire.",
      statusCode: 400,
    });
  }

  try {
    await prisma.categorie.create({
      data: {
        nom: nom,
      },
    });

    return {
      statusCode: 200,
      message: "Catégorie enregistrée avec succès.",
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: `Erreur lors de l'enregistrement de la catégorie: ${error}`,
    });
  }
});
