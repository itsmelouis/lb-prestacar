import { prisma } from "~/prisma/db";
import { Resend } from 'resend';

const resend = new Resend(process.env.NUXT_RESEND_API_KEY);

interface ContactBody {
  firstName: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  isCondition: boolean;
  typePrestation: string;
  isRgpd: boolean;
  serviceDate: Date;
  vehicle: string
}

export default eventHandler<{ body: ContactBody }>(async (event) => {
  const { firstName, name, email, phone, message, isCondition, isRgpd, serviceDate, vehicle, typePrestation } = await readBody(event);
  // Vérification des champs obligatoires
  if (!firstName) {
    throw createError({
      message: "Le prénom est obligatoire.",
      statusCode: 400,
    });
  }

  if (!name) {
    console.log('nom pas là', name);
    throw createError({
      message: "Le nom est obligatoire.",
      statusCode: 400,
    });
  }

  if (!message || message.length < 50) {
    console.log('message pas là', message);
    throw createError({
      message: "Le message est obligatoire et doit dépasser 50 caractères.",
      statusCode: 400,
    });
  }

  if (!isCondition) {
    console.log('condition pas là', isCondition);
    throw createError({
      message: "Vous devez accepter les conditions d'utilisation générales de Prestacar.",
      statusCode: 400,
    });
  }

  // Vérifications de validité
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  if (email && !emailRegex.test(email)) {
    console.log('email pas valide', email);
    throw createError({
      message: "L'email est invalide.",
      statusCode: 400,
    });
  }

  // Vérification que l'email ou le téléphone soit renseigné
  if (!email) {
    console.log('email pas là', email);
    throw createError({
      message: "L'email est obligatoire.",
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
  
  // Enregistrement dans la base de données
  try {
    await prisma.contact.create({
      data: {
        prenom: firstName,
        nom: name,
        email: email,
        telephone: phone ? phone : null, // Permet de stocker null si le téléphone n'est pas renseigné
        type_prestation: typePrestation, // Gestion du type de prestation
        message: message,
        estCondition: isCondition,
        estRgpd: isRgpd,
        date_presation: serviceDate,
        vehicule: vehicle,
      },
    });

    return {
      statusCode: 200,
      message: "Demande de devis enregistré avec succès !",
    };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: `Erreur lors de l'enregistrement de l'avis: ${error}`,
    });
  }
});
