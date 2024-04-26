import { Resend } from 'resend';
import { defineEventHandler } from 'h3';

const resend = new Resend(process.env.NUXT_RESEND_API_KEY);

export default defineEventHandler(async () => {
  try {
    // Récupération de tous les contacts
    const response = await resend.contacts.list({ audienceId: 'c354af32-5877-40e7-b903-2a19c70c1796' });
    const contacts = response.data?.data;

    // Filtrage pour ne garder que les contacts abonnés
    const subscribedContacts = contacts?.filter(contact => !contact.unsubscribed) ?? [];

    // Fonction pour envoyer des emails en lot
    const sendEmailBatch = async (batch: { from: string; to: string[]; subject: string; html: string; }[]) => {
      await resend.batch.send(batch);
    };

    // Boucle pour envoyer 100 emails toutes les 2 minutes
    for (let i = 0; i < subscribedContacts.length; i += 100) {
      const batch = subscribedContacts.slice(i, i + 100).map(contact => ({
        from: 'LB Prestacar <contact@lb-prestacar.com>',
        to: [contact.email],
        subject: 'Votre Sujet Ici',
        html: '<h1>Votre Message Ici</h1> ' + i,
      }));

      // Utilisation de setTimeout pour déclencher l'envoi toutes les 2 minutes
      setTimeout(() => sendEmailBatch(batch), 120000 * (i / 100));
    }
  } catch (error) {
    console.error('Erreur lors de l\'envoi des emails:', error);
  }
});