import { prisma } from "~/prisma/db";

export default eventHandler(async (event) => {
  await requireAuthSession(event);

  return await prisma.avis.findMany({
  });
});
