import { hash, useAuthSession } from "~/server/utils/session";
import { prisma } from "~/prisma/db";

export default eventHandler<{ body: { email: string, password: string } }>(async (event) => {
  const session = await useAuthSession(event);
  console.log(session);
  
  const { email, password } = await readBody(event);
  
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailRegex.test(email)) {
    throw createError({
      message: "Email invalide!",
      statusCode: 400,
    });
  }

  const user = await prisma.utilisateur.findFirst({
    where: {
      email: email
    }
  });
  if (!user) {
    throw createError({
      message: "L'email n'existe pas!",
      statusCode: 401,
    });
  }
  if (!user.email || user.password !== (await hash(password))) {
    throw createError({
      message: "Mot de passe incorrect!",
      statusCode: 401,
    });
  }
  await session.update({
      id: user.id,
      email: user.email,
  });
  return session;
});
