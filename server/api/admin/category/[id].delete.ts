import { prisma } from "~/prisma/db";

export default eventHandler(async (event) => {
  // Vérification de l'authentification de l'utilisateur
  await requireAuthSession(event);

  // Récupération et validation de l'ID de la catégorie
  const id = parseInt(event.context.params!.id) as number;

  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      message: "Ceci n'est pas un identifiant valide",
    });
  }

  // Vérification de l'existence de la catégorie avant suppression
  const category = await prisma.categorie.findUnique({
    where: {
      id: id,
    },
  });

  if (!category) {
    throw createError({
      statusCode: 404,
      message: 'Catégorie non trouvée',
    });
  }

  // Tentative de suppression de la catégorie
  try {
    await prisma.categorie.delete({
      where: {
        id: id,
      },
    });

    return {
      statusCode: 200,
      message: 'Catégorie supprimée avec succès',
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: `Erreur lors de la suppression de la catégorie: ${error}`,
    });
  }
});
