import {prisma} from "~/prisma/db";

export default eventHandler(async (event) => {
  const { email, password } = await readBody(event);

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    throw createError({
      message: "Veuillez fournir un email valide!",
      statusCode: 400,
    });
  }

  const user = await prisma.utilisateur.findFirst({
    where: {
      email: email,
    },
  });

  if(user) {
    throw createError({
      message: "Cet email existe déjà!",
      statusCode: 400,
    });
  }

  const hashedPassword = await hash(password);

  await prisma.utilisateur.create({
    data: {
      email: email,
      password: hashedPassword,
    },
  });
  return {
    message: "Inscrit avec succès!",
  };
});
