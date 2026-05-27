import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getRequestInfoAgencyEmailTemplate } from '@/lib/templates/requestInfoAgencyEmail';
import { getRequestInfoClientEmailTemplate } from '@/lib/templates/requestInfoClientEmail';

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

if (!resend) {
  console.warn('WARNING: RESEND_API_KEY is not defined. Request Info emails will run in mock mode.');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    // — Validation —
    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Full name is required.' }, { status: 400 });
    }
    if (!email || !email.trim()) {
      return NextResponse.json({ error: 'Email address is required.' }, { status: 400 });
    }
    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json({ error: 'A valid email address is required.' }, { status: 400 });
    }
    if (!phone || !phone.trim()) {
      return NextResponse.json({ error: 'Phone number is required.' }, { status: 400 });
    }
    if (!message || !message.trim()) {
      return NextResponse.json({ error: 'Message is required.' }, { status: 400 });
    }

    const data = {
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      message: message.trim(),
    };

    const agencyEmailEnv = process.env.AGENCY_EMAIL || 'hello@metrina.dev';
    const agencyRecipients = agencyEmailEnv.split(',').map((e: string) => e.trim());
    const senderEmail = process.env.SENDER_EMAIL || 'onboarding@resend.dev';

    if (resend) {
      // 1. Notify agency
      const agencyResult = await resend.emails.send({
        from: `Metrina Portal <${senderEmail}>`,
        to: agencyRecipients,
        subject: `New Info Request from ${data.name}`,
        html: getRequestInfoAgencyEmailTemplate(data),
      });

      if (agencyResult.error) {
        console.error('Resend error (agency):', agencyResult.error);
      } else {
        console.log(`Request Info agency email sent to: ${agencyRecipients.join(', ')}`);
      }

      // 2. Confirm to visitor
      const clientResult = await resend.emails.send({
        from: `Metrina <${senderEmail}>`,
        to: data.email,
        subject: `We've received your message — Metrina`,
        html: getRequestInfoClientEmailTemplate(data),
      });

      if (clientResult.error) {
        console.error('Resend error (client):', clientResult.error);
      } else {
        console.log('Request Info client confirmation email sent.');
      }
    } else {
      // Mock / dry-run
      console.log('--- [MOCK EMAIL DRY-RUN] ---');
      console.log(`To Agency: New Info Request from ${data.name}`);
      console.log(`To Client (${data.email}): We've received your message — Metrina`);
      console.log('----------------------------');
    }

    return NextResponse.json({
      success: true,
      message: 'Your message has been received.',
    }, { status: 200 });

  } catch (error: any) {
    console.error('Request Info API Error:', error);
    return NextResponse.json({ error: 'Failed to send your message. Please try again.' }, { status: 500 });
  }
}
