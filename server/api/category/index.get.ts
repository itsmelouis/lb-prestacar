import { prisma } from "~/prisma/db";

export default eventHandler(async (event) => {
  return await prisma.categorie.findMany();
});
