import { prisma } from "~/prisma/db";

export default eventHandler(async (event) => {
  // Vérification de l'authentification de l'utilisateur
  await requireAuthSession(event);

  // Récupération et validation de l'ID de la voiture
  const id = parseInt(event.context.params!.id) as number;

  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      message: "Ceci n'est pas un identifiant valide",
    });
  }

  // Vérification de l'existence de la voiture avant suppression
  const car = await prisma.voiture.findUnique({
    where: {
      id: id,
    },
  });

  if (!car) {
    throw createError({
      statusCode: 404,
      message: 'Voiture non trouvée',
    });
  }

  // Tentative de suppression de la voiture
  try {
    await prisma.voiture.delete({
      where: {
        id: id,
      },
    });

    return {
      statusCode: 200,
      message: 'Voiture supprimée avec succès',
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: `Erreur lors de la suppression de la voiture: ${error}`,
    });
  }
});
