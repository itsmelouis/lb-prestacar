// ~/api/voiture/[id].js
import { prisma } from "~/prisma/db";
import cloudinary from "~/config/cloudinary";

export default eventHandler(async (event) => {
  const id = parseInt(event.context.params!.id) as number;

  if (!Number.isInteger(id)) {
    throw createError({
      statusCode: 400,
      message: "Ceci n'est pas un identifiant valide",
    });
  }

  const voiture = await prisma.voiture.findUnique({
    where: {
      id: id,
    },
    include: {
      Options: true,
      GrillesTarifiaires: true,
    },
  });

  if (!voiture) {
    throw createError({
      statusCode: 404,
      message: "Voiture non trouvée",
    });
  }

  // Récupérer les assets de Cloudinary
  const folderPath = voiture.nom_image; // Assurez-vous que `nom_image` contient le chemin du dossier
  let publicIds: any[] = [];

  try {
    let nextCursor = null;
    do {
      const result = await cloudinary.api.resources({
        type: "upload",
        prefix: folderPath,
        max_results: 100,
        next_cursor: nextCursor,
      });
      //@ts-ignore
      publicIds = publicIds.concat(result.resources.map(resource => resource.public_id));
      nextCursor = result.next_cursor;
    } while (nextCursor);
  } catch (error) {
    console.error("Erreur lors de la récupération des assets de Cloudinary:", error);
    throw createError({
      statusCode: 500,
      message: "Erreur lors de la récupération des assets de Cloudinary",
    });
  }

  return {
    ...voiture,
    cloudinaryAssets: publicIds,
  };
});
