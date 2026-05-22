import { Resend } from 'resend';
import { getAgencyEmailTemplate } from '../templates/agencyEmail';
import { getClientEmailTemplate } from '../templates/clientEmail';

const resendApiKey = process.env.RESEND_API_KEY;

// Fallback to dry-run/mock mode if API key is not present
const resend = resendApiKey ? new Resend(resendApiKey) : null;

if (!resend) {
  console.warn('WARNING: RESEND_API_KEY is not defined. Email notifications will run in mock mode (logged to console).');
}

/**
 * Sends both agency notification and client confirmation emails.
 * @param {Object} inquiryData - The raw inquiry details.
 */
export async function sendInquiryEmails(inquiryData: any) {
  const agencyEmailEnv = process.env.AGENCY_EMAIL || 'hello@metrina.dev';
  // Support comma-separated list of emails
  const agencyRecipients = agencyEmailEnv.split(',').map(email => email.trim());
  
  const clientName = process.env.CLIENT_NAME || 'Metrina';
  
  // Use a verified sending domain or Resend sandbox default address
  const senderEmail = process.env.SENDER_EMAIL || 'onboarding@resend.dev';

  const agencyHtml = getAgencyEmailTemplate(inquiryData);
  const clientHtml = getClientEmailTemplate(inquiryData);

  try {
    if (resend) {
      // 1. Send Agency Notification
      const agencyResult = await resend.emails.send({
        from: `Metrina Portal <${senderEmail}>`,
        to: agencyRecipients,
        subject: `New [${inquiryData.selectedPackage}] Inquiry from ${inquiryData.name}`,
        html: agencyHtml,
      });

      if (agencyResult.error) {
        console.error('Resend error sending agency email:', agencyResult.error);
      } else {
        console.log(`Agency email sent successfully to: ${agencyRecipients.join(', ')}`);
      }

      // 2. Send Client Confirmation
      const clientResult = await resend.emails.send({
        from: `Metrina Onboarding <${senderEmail}>`,
        to: inquiryData.email,
        subject: `We've received your inquiry — Metrina`,
        html: clientHtml,
      });

      if (clientResult.error) {
        console.error('Resend error sending client confirmation email:', clientResult.error);
      } else {
        console.log(`Client email sent successfully.`);
      }
    } else {
      // Mock mode logging
      console.log('--- [MOCK EMAIL DRY-RUN] ---');
      console.log(`To Agency (${agencyRecipients.join(', ')}): Subject: New [${inquiryData.selectedPackage}] Inquiry from ${inquiryData.name}`);
      console.log(`To Client (${inquiryData.email}): Subject: We've received your inquiry — Metrina`);
      console.log('----------------------------');
    }
  } catch (error) {
    console.error('Failed to trigger email services:', error);
  }
}
