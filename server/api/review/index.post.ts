import { prisma } from "~/prisma/db";
import { Resend } from 'resend';

const resend = new Resend(process.env.NUXT_RESEND_API_KEY);

interface ReviewBody {
  firstName: string;
  name: string;
  email: string;
  message: string;
  isCondition: boolean;
  isRgpd: boolean;
}

export default eventHandler<{ body: ReviewBody }>(async (event) => {
  const { firstName, name, email, message, isCondition, isRgpd } = await readBody(event);

  if (!firstName) {
    throw createError({
      message: "Le prénom est obligatoire.",
      statusCode: 400,
    });
  }

  if (!name) {
    throw createError({
      message: "Le nom est obligatoire.",
      statusCode: 400,
    });
  }

  if (!email) {
    throw createError({
      message: "L'email est obligatoire.",
      statusCode: 400,
    });
  }

  if (!message || message.length < 50) {
    throw createError({
      message: "Le message est obligatoire et doit dépasser 50 caractères.",
      statusCode: 400,
    });
  }

  if (!isCondition) {
    throw createError({
      message: "Vous devez accepter les conditions d'utilisation générales de Prestacar.",
      statusCode: 400,
    });
  }

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  if (!emailRegex.test(email)) {
    throw createError({
      message: "L'email est invalide.",
      statusCode: 400,
    });
  }

  // Ajout du contact à Resend
  try {
    await resend.contacts.create({
      email: email,
      firstName: firstName,
      lastName: name,
      unsubscribed: !isRgpd,
      audienceId: 'c354af32-5877-40e7-b903-2a19c70c1796',
    });
  } catch (resendError) {
    console.error('Erreur lors de l\'ajout du contact à Resend:', resendError);
  }

  try {
    await prisma.avis.create({
      data: {
        prenom: firstName,
        nom: name,
        email: email,
        message: message,
        estCondition: isCondition,
        estRgpd: isRgpd,
      },
    });

    return {
      statusCode: 200,
      message: "Avis enregistré avec succès",
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: `Erreur lors de l'enregistrement de l'avis: ${error}`,
    });
  }
});
