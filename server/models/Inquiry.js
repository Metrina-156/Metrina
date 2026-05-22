import mongoose from 'mongoose';

const InquirySchema = new mongoose.Schema({
  selectedPackage: {
    type: String,
    enum: ['STARTER', 'GROWTH', 'CUSTOM'],
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  company: {
    type: String,
  },
  businessType: {
    type: String,
  },
  projectGoal: {
    type: String,
  },
  keyFeatures: {
    type: [String],
    default: [],
  },
  launchDate: {
    type: Date,
  },
  budgetFlexibility: {
    type: String,
  },
  referralSource: {
    type: String,
  },
  agreedToContact: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'closed'],
    default: 'new',
  },
});

const Inquiry = mongoose.model('Inquiry', InquirySchema);
export default Inquiry;
