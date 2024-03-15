import {prisma} from "~/prisma/db";

export default eventHandler(async (event) => {
  const id = parseInt(event.context.params!.id) as number
  
  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      message: 'Ceci n\'est pas un identifiant valide',
    })
  }

  const voiture = await prisma.voiture.findUnique({
    where: {
      id: id,
    },
  });

  if(!voiture) {
    throw createError({
      statusCode: 404,
      message: 'Voiture non trouvée',
    })
  }

  return voiture;
});
