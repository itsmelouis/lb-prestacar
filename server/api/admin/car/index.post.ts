import { prisma } from "~/prisma/db";

interface OptionsBody {
  name: string;
  price: string;
}

interface PricesBody {
  duration: string;
  price: string;
}

interface CarBody {
  name: string;
  pictureName: string;
  description: string;
  idCategory: number;
  options: OptionsBody[];
  prices: PricesBody[];
}

export default eventHandler<{ body: CarBody }>(async (event) => {
  await requireAuthSession(event);
  const { name, pictureName, description, idCategory, options, prices } = await readBody(event);
  console.log(options);
  
  if (!name || !pictureName || !description || !options.length || !prices.length) {
    throw createError({
      message: "Tous les champs sont obligatoires.",
      statusCode: 400,
    });
  }

  const category = await prisma.categorie.findUnique({
    where: {
      id: idCategory,
    },
  });

  if (!category) {
    throw createError({
      message: "La catégorie n'existe pas.",
      statusCode: 400,
    });
  }

  const voiture = await prisma.voiture.create({
    data: {
      nom: name,
      nom_image: pictureName,
      description: description,
      id_categorie: idCategory
    },
  });
  
  if(!voiture) {
    throw createError({
      message: "Une erreur est survenue lors de la création de la voiture.",
      statusCode: 500,
    });
  }


  for (const option of options) {
    await prisma.option.create({
      data: {
        intitule: option.name,
        prix: option.price,
        id_voiture: voiture.id,
      },
    });
  }

  for (const price of prices) {
    await prisma.grilleTarifiaire.create({
      data: {
        temps: price.duration,
        prix: price.price,
        id_voiture: voiture.id,
      },
    });
  }

  return voiture;
});
