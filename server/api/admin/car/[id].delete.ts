import { prisma } from "~/prisma/db";

export default eventHandler(async (event) => {
  await requireAuthSession(event);

  const id = parseInt(event.context.params!.id) as number;

  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      message: "Ceci n'est pas un identifiant valide",
    });
  }

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