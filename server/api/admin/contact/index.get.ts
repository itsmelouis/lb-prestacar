import { prisma } from "~/prisma/db";

export default defineEventHandler(async (event) => {
  await requireAuthSession(event);
  return await prisma.contact.findMany();
})
