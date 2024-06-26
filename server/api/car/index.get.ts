import { prisma } from "~/prisma/db";

export default eventHandler(async (event) => {
  return await prisma.voiture.findMany({
    include: {
      GrillesTarifiaires: true,
      Options: true,
      Categories: true,
    }
  });
});
