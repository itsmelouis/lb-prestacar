import { prisma } from "~/prisma/db";

interface ContactBody {
  firstName: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  isCondition: boolean;
  isRgpd: boolean;
}

export default eventHandler<{ body: ContactBody }>(async (event) => {
  const { firstName, name, email, phone, message, isCondition, isRgpd } = await readBody(event);

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
  const phoneRegex = /^(0|\+33)[1-9]([-. ]?[0-9]{2}){4}$/;

  if (!emailRegex.test(email)) {
    throw createError({
      message: "L'email est invalide.",
      statusCode: 400,
    });
  }

  if(!phoneRegex.test(phone)) {
    throw createError({
      message: "Le numéro de téléphone est invalide.",
      statusCode: 400,
    });
  }


  //TODO: gérer le type de prestation puis modifier le schema prisma pour mettre à null l'email et le numéro de 
  // téléphone puis rajouter une vérif en mode un des deux moyens de contact doit être renseigné
  try {
    await prisma.contact.create({
      data: {
        prenom: firstName,
        nom: name,
        email: email,
        telephone: phone,
        type_prestation: "contact",
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
