import { prisma } from "~/prisma/db";
import { Resend } from 'resend';

const resend = new Resend(process.env.NUXT_RESEND_API_KEY);

export default eventHandler(async (event) => {
  await requireAuthSession(event);

  const email = (event.context.params!.email) as string;

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  

  if (!emailRegex.test(email)) {
    throw createError({
      statusCode: 400,
      message: "Ceci n'est pas un email valide",
    });
  }
  
  try {
    await resend.contacts.remove({
      email: email,
      audienceId: 'c354af32-5877-40e7-b903-2a19c70c1796',
    });
  } catch (error) {
    console.error(error);
  }
  
  const emails = await prisma.contact.findFirst({
    where: {
      email: email,
    },
  });
  console.log(emails);

  if (!emails) {
    throw createError({
      statusCode: 404,
      message: 'Email non trouvé',
    });
  }

  try {
    await prisma.contact.delete({
      where: {
        id: emails.id,
      },
    });

    return {
      statusCode: 200,
      message: 'Contact supprimé avec succès',
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: `Erreur lors de la suppression du contact : ${error}`,
    });
  }
});
