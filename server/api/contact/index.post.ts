import { prisma } from "~/prisma/db";

interface ContactBody {
  firstName: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  isCondition: boolean;
  isRgpd: boolean;
  serviceDate: Date;
}

export default eventHandler<{ body: ContactBody }>(async (event) => {
  const { firstName, name, email, phone, message, isCondition, isRgpd, serviceDate } = await readBody(event);

  // Vérification des champs obligatoires
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

  // Vérifications de validité
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const phoneRegex = /^(0|\+33)[1-9]([-. ]?[0-9]{2}){4}$/;

  if (email && !emailRegex.test(email)) {
    throw createError({
      message: "L'email est invalide.",
      statusCode: 400,
    });
  }

  if (phone && !phoneRegex.test(phone)) {
    throw createError({
      message: "Le numéro de téléphone est invalide.",
      statusCode: 400,
    });
  }

  // Vérification que l'email ou le téléphone soit renseigné
  if (!email && !phone) {
    throw createError({
      message: "Au moins un moyen de contact (téléphone ou email) doit être renseigné.",
      statusCode: 400,
    });
  }

  // Enregistrement dans la base de données
  try {
    await prisma.contact.create({
      data: {
        prenom: firstName,
        nom: name,
        email: email ? email : null, // Permet de stocker null si l'email n'est pas renseigné
        telephone: phone ? phone : null, // Permet de stocker null si le téléphone n'est pas renseigné
        type_prestation: "contact", // Gestion du type de prestation
        message: message,
        estCondition: isCondition,
        estRgpd: isRgpd,
        date_presation: serviceDate,
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
