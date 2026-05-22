import express from 'express';
import Inquiry from '../models/Inquiry.js';
import { sendInquiryEmails } from '../services/mailer.js';

const router = express.Router();

// POST /api/inquiry
router.post('/', async (req, res) => {
  try {
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
    } = req.body;

    // Server-side validation
    if (!name || !name.trim()) {
      return res.status(400).json({ error: 'Name is a required field.' });
    }
    if (!email || !email.trim()) {
      return res.status(400).json({ error: 'Email address is a required field.' });
    }
    if (!selectedPackage || !['STARTER', 'GROWTH', 'CUSTOM'].includes(selectedPackage)) {
      return res.status(400).json({ error: 'A valid selected package is required.' });
    }
    if (agreedToContact !== true) {
      return res.status(400).json({ error: 'You must agree to be contacted to submit an inquiry.' });
    }

    // Save submission to MongoDB
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
    console.log(`Successfully saved inquiry with ID: ${savedInquiry._id}`);

    // Trigger Resend email service asynchronously (non-blocking)
    sendInquiryEmails(savedInquiry);

    // Return response
    return res.status(200).json({
      success: true,
      message: 'Inquiry received successfully.',
      id: savedInquiry._id,
    });
  } catch (error) {
    console.error('Error handling inquiry submission:', error);
    return res.status(500).json({ error: 'Failed to process inquiry due to server error.' });
  }
});

// GET /api/inquiry (Optional helper route to view submissions during local testing)
router.get('/scoping-sessions-list', async (req, res) => {
  try {
    // Basic auth check can be added if needed; simple check for development
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    return res.status(200).json(inquiries);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch inquiries.' });
  }
});

export default router;
