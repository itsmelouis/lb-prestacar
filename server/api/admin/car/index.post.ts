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
  idCategory: number[];
  options: OptionsBody[];
  prices: PricesBody[];
}

export default eventHandler<{ body: CarBody }>(async (event) => {
  await requireAuthSession(event);
  const { name, pictureName, description, idCategory, options, prices } = await readBody(event);

  if (!name || !pictureName || !description || !options.length || !prices.length) {
    throw createError({
      message: "Tous les champs sont obligatoires.",
      statusCode: 400,
    });
  }

  // const category = await prisma.categorie.findUnique({
  //   where: {
  //     id: idCategory,
  //   },
  // });

  // if (!category) {
  //   throw createError({
  //     message: "La catégorie n'existe pas.",
  //     statusCode: 400,
  //   });
  // }

  const categoriesData = idCategory.map(id => ({
    categorieId: id,
  }));


  const voiture = await prisma.voiture.create({
    data: {
      nom: name,
      nom_image: pictureName,
      description: description,
      Categories: {
        createMany: {
          data: categoriesData,
          skipDuplicates: true,
        },
      },
    },
  });

  if (!voiture) {
    throw createError({
      message: "Une erreur est survenue lors de la création de la voiture.",
      statusCode: 500,
    });
  }

  // Créer les options en utilisant createMany
  const optionsData = options.map(option => ({
    intitule: option.name,
    prix: option.price,
    voitureId: voiture.id,
  }));

  await prisma.option.createMany({
    data: optionsData,
    skipDuplicates: true,
  });

  // Créer les grilles tarifaires en utilisant createMany
  const pricesData = prices.map(price => ({
    temps: price.duration,
    prix: price.price,
    voitureId: voiture.id,
  }));

  await prisma.grilleTarifiaire.createMany({
    data: pricesData,
    skipDuplicates: true,
  });

  return voiture;
});
