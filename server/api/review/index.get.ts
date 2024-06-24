import { prisma } from "~/prisma/db";

export default eventHandler(async (event) => {
  return await prisma.avis.findMany({
    take: 3,
    where: { estValide: true },
  });
});
