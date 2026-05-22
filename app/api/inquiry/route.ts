import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Inquiry from '@/lib/models/Inquiry';
import { sendInquiryEmails } from '@/lib/services/mailer';

export async function POST(request: Request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const {
      selectedPackage,
      name,
      email,
      phone,
      company,
      businessType,
      projectGoal,
      keyFeatures,
      launchDate,
      budgetFlexibility,
      referralSource,
      agreedToContact,
    } = body;

    // Validation
    if (!name || !name.trim()) {
      return NextResponse.json({ error: 'Name is a required field.' }, { status: 400 });
    }
    if (!email || !email.trim()) {
      return NextResponse.json({ error: 'Email address is a required field.' }, { status: 400 });
    }
    if (!selectedPackage || !['STARTER', 'GROWTH', 'CUSTOM'].includes(selectedPackage)) {
      return NextResponse.json({ error: 'A valid selected package is required.' }, { status: 400 });
    }
    if (agreedToContact !== true) {
      return NextResponse.json({ error: 'You must agree to be contacted to submit an inquiry.' }, { status: 400 });
    }

    // Save to DB
    const newInquiry = new Inquiry({
      selectedPackage,
      name: name.trim(),
      email: email.trim(),
      phone: phone ? phone.trim() : undefined,
      company: company ? company.trim() : undefined,
      businessType,
      projectGoal,
      keyFeatures: keyFeatures || [],
      launchDate: launchDate ? new Date(launchDate) : undefined,
      budgetFlexibility,
      referralSource,
      agreedToContact,
      status: 'new',
    });

    const savedInquiry = await newInquiry.save();
    
    // Trigger emails (don't await if you want it non-blocking, but in serverless it's safer to await or use a queue)
    await sendInquiryEmails(savedInquiry);

    return NextResponse.json({
      success: true,
      message: 'Inquiry received successfully.',
      id: savedInquiry._id,
    }, { status: 200 });

  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to process inquiry.' }, { status: 500 });
  }
}
