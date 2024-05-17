import { Resend } from 'resend';

const resend = new Resend(process.env.NUXT_RESEND_API_KEY);

export default defineEventHandler(async () => {
  try {
    const mailList = await resend.contacts.list({
      audienceId: 'c354af32-5877-40e7-b903-2a19c70c1796',
    });
    return mailList.data?.data;
  } catch (error) {
    return { error };
  }
});
