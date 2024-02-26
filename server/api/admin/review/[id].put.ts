import { prisma } from "~/prisma/db";

export default eventHandler(async (event) => {
  await requireAuthSession(event);

  const id = parseInt(event.context.params!.id) as number

  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      message: 'Ceci n\'est pas un identifiant valide',
    })
  }

  const review = await prisma.avis.findUnique({
    where: {
      id: id,
    },
  });

  if(!review) {
    throw createError({
      statusCode: 404,
      message: 'Avis non trouvé',
    })
  }

  if(review?.estValide) {
    throw createError({
      statusCode: 400,
      message: 'Cet avis est déjà validé',
    })
  }

  try {
    await prisma.avis.update({
      where: {
        id: id,
      },
      data: {
        estValide: true,
      },
    })

    return {
      statusCode: 200,
      message: 'Avis validé avec succès',
    }
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: `Erreur lors de la validation de l\'avis: ${error}`,
    })
  }
});
