import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IInquiry extends Document {
  selectedPackage: 'STARTER' | 'GROWTH' | 'CUSTOM';
  name: string;
  email: string;
  phone?: string;
  company?: string;
  businessType?: string;
  projectGoal?: string;
  keyFeatures?: string[];
  launchDate?: Date;
  budgetFlexibility?: string;
  referralSource?: string;
  agreedToContact: boolean;
  createdAt: Date;
  status: 'new' | 'contacted' | 'closed';
}

const InquirySchema: Schema = new Schema({
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

const Inquiry: Model<IInquiry> = mongoose.models.Inquiry || mongoose.model<IInquiry>('Inquiry', InquirySchema);
export default Inquiry;
