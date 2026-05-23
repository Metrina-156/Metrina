'use client';

import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Calendar, ChevronDown, Loader2, ShoppingBag, Zap, User, Globe, PenTool, MoreHorizontal } from 'lucide-react';
import styles from './InquiryForm.module.css';

// Form validation schema per step
const formSchema = z.object({
  selectedPackage: z.enum(['STARTER', 'GROWTH', 'CUSTOM'], {
    message: "Please select a package",
  }),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  businessType: z.string().min(1, "Please select a business type"),
  projectGoal: z.string().min(10, "Please explain your project goal in at least 10 characters"),
  keyFeatures: z.array(z.string()).optional(),
  launchDate: z.string().refine((val) => {
    const selected = new Date(val);
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 14);
    return selected >= minDate;
  }, {
    message: "Launch date must be at least 14 days from today",
  }),
  budgetFlexibility: z.enum(['Fixed', 'Flexible'], {
    message: "Please select budget flexibility",
  }),
  referralSource: z.string().min(1, "Please select how you heard about us"),
  agreedToContact: z.boolean().refine(val => val === true, {
    message: "You must agree to be contacted",
  }),
});

type FormData = z.infer<typeof formSchema>;

interface InquiryFormProps {
  initialPackage?: string;
}

export default function InquiryForm({ initialPackage }: InquiryFormProps) {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(0); // -1 for back, 1 for forward
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    defaultValues: {
      selectedPackage: (initialPackage as any) || undefined,
      phone: '+91 ',
      keyFeatures: [],
      budgetFlexibility: 'Flexible',
      agreedToContact: false,
    },
  });

  // Watch fields to validate step progression
  const watchedPackage = watch('selectedPackage');
  const watchedName = watch('name');
  const watchedEmail = watch('email');
  const watchedBusinessType = watch('businessType');
  const watchedProjectGoal = watch('projectGoal');
  const watchedKeyFeatures = watch('keyFeatures');
  const watchedLaunchDate = watch('launchDate');
  const watchedBudgetFlex = watch('budgetFlexibility');
  const watchedReferral = watch('referralSource');
  const watchedAgreed = watch('agreedToContact');

  // Pre-select package from query parameters
  useEffect(() => {
    if (initialPackage && ['STARTER', 'GROWTH', 'CUSTOM'].includes(initialPackage.toUpperCase())) {
      setValue('selectedPackage', initialPackage.toUpperCase() as any, { shouldValidate: true });
    }
  }, [initialPackage, setValue]);

  // Handle manual steps validation
  const validateStep = async (currentStep: number) => {
    let fieldsToValidate: Array<keyof FormData> = [];
    if (currentStep === 1) fieldsToValidate = ['selectedPackage'];
    if (currentStep === 2) fieldsToValidate = ['name', 'email'];
    if (currentStep === 3) fieldsToValidate = ['businessType', 'projectGoal', 'keyFeatures'];
    if (currentStep === 4) fieldsToValidate = ['launchDate', 'budgetFlexibility', 'referralSource'];
    if (currentStep === 5) fieldsToValidate = ['agreedToContact'];

    return await trigger(fieldsToValidate);
  };

  const nextStep = async () => {
    const isStepValid = await validateStep(step);
    if (isStepValid && step < 5) {
      setDirection(1);
      setStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setDirection(-1);
      setStep(prev => prev - 1);
    }
  };

  const isNextDisabled = () => {
    if (step === 1) return !watchedPackage;
    if (step === 2) return !watchedName || !watchedEmail || !!errors.name || !!errors.email;
    if (step === 3) return !watchedBusinessType || !watchedProjectGoal || !!errors.projectGoal;
    if (step === 4) return !watchedLaunchDate || !watchedBudgetFlex || !watchedReferral || !!errors.launchDate;
    if (step === 5) return !watchedAgreed;
    return false;
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const apiEndpoint = '/api/inquiry';
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const resData = await response.json();
      if (!response.ok) {
        throw new Error(resData.error || 'Failed to submit inquiry. Please try again.');
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setSubmitError(err.message || 'An error occurred during submission.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Motion variants for slide transition
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 350, damping: 30 },
        opacity: { duration: 0.25 },
      },
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 50 : -50,
      opacity: 0,
      transition: {
        x: { type: 'spring' as const, stiffness: 350, damping: 30 },
        opacity: { duration: 0.2 },
      },
    }),
  };

  // Pre-calculated minimum date for datepicker (today + 14 days)
  const getMinDateString = () => {
    const d = new Date();
    d.setDate(d.getDate() + 14);
    return d.toISOString().split('T')[0];
  };

  if (isSubmitted) {
    return (
      <div className={styles.successCard}>
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className={styles.successIconWrapper}
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
          >
            <Check size={36} strokeWidth={2} />
          </motion.div>
        </motion.div>

        <h1 className={`${styles.successTitle} serif`}>
          Inquiry Received
        </h1>
        <p className={styles.successDesc}>
          We have received your custom scoping request. Expect a tailored response from our design desk within 24 hours.
        </p>
      </div>
    );
  }

  const packages = [
    { id: 'STARTER', name: 'STARTER', price: '₹15,000', desc: 'Single custom editorial page. Quick deployment.' },
    { id: 'GROWTH', name: 'GROWTH', price: '₹40,000', desc: 'Up to 5 custom modules, CMS system, integrated SEO.' },
    { id: 'CUSTOM', name: 'CUSTOM', price: "LET'S TALK", desc: 'Bespoke high-impact architecture built to scope.' },
  ];

  const businessTypes = [
    { label: 'E-Commerce', icon: <ShoppingBag size={20} /> },
    { label: 'SaaS / App', icon: <Zap size={20} /> },
    { label: 'Portfolio', icon: <User size={20} /> },
    { label: 'Brand', icon: <Globe size={20} /> },
    { label: 'Blog', icon: <PenTool size={20} /> },
    { label: 'Other', icon: <MoreHorizontal size={20} /> },
  ];

  const featuresList = [
    'Contact Form', 'Blog', 'Payment Gateway', 'CMS', 'SEO Optimization', 'Animations', 'Multilingual', 'Custom Dashboard'
  ];

  const referralSources = ['Google', 'Instagram', 'Referral', 'LinkedIn', 'Other'];

  return (
    <div className={styles.formCard}>
      {/* Step Progress Header */}
      <div className={styles.stepIndicator}>
        <span className={styles.stepNum}>
          Step <span className={styles.stepText}>{step}</span> of 5
        </span>
      </div>
      <div className={styles.progressTrack}>
        <div
          className={styles.progressBar}
          style={{ width: `${(step / 5) * 100}%` }}
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="min-h-[45vh] flex flex-col justify-between">
        <div className="relative overflow-visible">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={step}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full"
            >
              {/* STEP 1: Package Selection */}
              {step === 1 && (
                <div>
                  <h2 className={`${styles.stepTitle} serif`}>
                    Select Your Plan
                  </h2>
                  <div className={styles.packageGrid}>
                    {packages.map((pkg) => (
                      <button
                        type="button"
                        key={pkg.id}
                        onClick={() => setValue('selectedPackage', pkg.id as any, { shouldValidate: true })}
                        className={`${styles.packageCard} ${watchedPackage === pkg.id ? styles.packageCardSelected : ''}`}
                      >
                        <div className={styles.packageHeader}>
                          <span className={styles.packageName}>
                            {pkg.name}
                          </span>
                          {watchedPackage === pkg.id && (
                            <span className={styles.packageCheck}>
                              <Check size={10} strokeWidth={3.5} />
                            </span>
                          )}
                        </div>
                        <p className={styles.packageDesc}>
                          {pkg.desc}
                        </p>
                        <div className={styles.packageFooter}>
                          <span className={styles.packageLabel}>
                            Starting at
                          </span>
                          <span className={`${styles.packagePrice} serif`}>
                            {pkg.price}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                  {errors.selectedPackage && (
                    <p className={`${styles.errorMsg} text-center`}>{errors.selectedPackage.message}</p>
                  )}
                </div>
              )}

              {/* STEP 2: About You */}
              {step === 2 && (
                <div>
                  <h2 className={`${styles.stepTitle} serif`}>
                    About You
                  </h2>
                  <div className={styles.formGrid}>
                    <div className={styles.inputGroup}>
                      <label className={`${styles.inputLabel} ${styles.inputLabelRequired}`}>
                        Full Name
                      </label>
                      <div className="relative w-full">
                        <input
                          type="text"
                          placeholder="John Doe"
                          {...register('name')}
                          className={styles.textInput}
                        />
                        <span className={styles.focusLine} />
                      </div>
                      {errors.name && <p className={styles.errorMsg}>{errors.name.message}</p>}
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={`${styles.inputLabel} ${styles.inputLabelRequired}`}>
                        Email Address
                      </label>
                      <div className="relative w-full">
                        <input
                          type="email"
                          placeholder="john@example.com"
                          {...register('email')}
                          className={styles.textInput}
                        />
                        <span className={styles.focusLine} />
                      </div>
                      {errors.email && <p className={styles.errorMsg}>{errors.email.message}</p>}
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel}>
                        Phone Number
                      </label>
                      <div className="relative w-full">
                        <input
                          type="text"
                          placeholder="+91 99999 99999"
                          {...register('phone')}
                          className={styles.textInput}
                        />
                        <span className={styles.focusLine} />
                      </div>
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={styles.inputLabel}>
                        Company / Brand Name
                      </label>
                      <div className="relative w-full">
                        <input
                          type="text"
                          placeholder="e.g. Acme Corp"
                          {...register('company')}
                          className={styles.textInput}
                        />
                        <span className={styles.focusLine} />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Your Project */}
              {step === 3 && (
                <div className="space-y-8">
                  <h2 className={`${styles.stepTitle} serif`}>
                    Your Project
                  </h2>

                  <div className={styles.inputGroup}>
                    <label className={`${styles.inputLabel} ${styles.inputLabelRequired}`}>
                      Business Type
                    </label>
                    <div className={styles.businessTypeGrid}>
                      {businessTypes.map((type) => (
                        <button
                          type="button"
                          key={type.label}
                          onClick={() => setValue('businessType', type.label, { shouldValidate: true })}
                          className={`${styles.businessTypeCard} ${watchedBusinessType === type.label ? styles.businessTypeCardSelected : ''}`}
                        >
                          <span className={styles.businessTypeIcon}>
                            {type.icon}
                          </span>
                          <span className={styles.businessTypeText}>
                            {type.label}
                          </span>
                        </button>
                      ))}
                    </div>
                    {errors.businessType && <p className={styles.errorMsg}>{errors.businessType.message}</p>}
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={`${styles.inputLabel} ${styles.inputLabelRequired}`}>
                      Project Goal
                    </label>
                    <div className="relative w-full">
                      <textarea
                        rows={4}
                        placeholder="Describe what you want to achieve with this website..."
                        {...register('projectGoal')}
                        className={styles.textareaInput}
                      />
                      <span className={styles.focusLine} />
                    </div>
                    {errors.projectGoal && <p className={styles.errorMsg}>{errors.projectGoal.message}</p>}
                  </div>

                  <div className={styles.inputGroup}>
                    <label className={styles.inputLabel}>
                      Key Features Needed
                    </label>
                    <div className={styles.pillsContainer}>
                      {featuresList.map((feature) => {
                        const isSelected = watchedKeyFeatures?.includes(feature);
                        return (
                          <button
                            type="button"
                            key={feature}
                            onClick={() => {
                              const nextVal = isSelected
                                ? watchedKeyFeatures?.filter(f => f !== feature)
                                : [...(watchedKeyFeatures || []), feature];
                              setValue('keyFeatures', nextVal, { shouldValidate: true });
                            }}
                            className={`${styles.featurePill} ${isSelected ? styles.featurePillSelected : ''}`}
                          >
                            {feature}
                          </button>
                        );
                      })}
                    </div>
                    {errors.keyFeatures && <p className={styles.errorMsg}>{errors.keyFeatures.message}</p>}
                  </div>
                </div>
              )}

              {/* STEP 4: Timeline & Budget */}
              {step === 4 && (
                <div>
                  <h2 className={`${styles.stepTitle} serif`}>
                    Timeline & Budget
                  </h2>
                  <div className={styles.formGrid}>
                    <div className={styles.inputGroup}>
                      <label className={`${styles.inputLabel} ${styles.inputLabelRequired}`}>
                        Estimated Launch Date
                      </label>
                      <div className="relative w-full">
                        <input
                          type="date"
                          min={getMinDateString()}
                          {...register('launchDate')}
                          className={styles.textInput}
                        />
                        <span className={styles.focusLine} />
                      </div>
                      <span className={`${styles.packageLabel} mt-1`} style={{ fontSize: '0.55rem' }}>
                        Min: 14 days scoping buffer
                      </span>
                      {errors.launchDate && <p className={styles.errorMsg}>{errors.launchDate.message}</p>}
                    </div>

                    <div className={styles.inputGroup}>
                      <label className={`${styles.inputLabel} ${styles.inputLabelRequired}`}>
                        Budget Flexibility
                      </label>
                      <div className={styles.radioGroup}>
                        <label className={`${styles.radioLabel} ${watchedBudgetFlex === 'Fixed' ? styles.radioSelected : ''}`}>
                          <input
                            type="radio"
                            value="Fixed"
                            {...register('budgetFlexibility')}
                            className={styles.hiddenInput}
                          />
                          <span className={styles.customRadio}>
                            <span className={styles.radioInnerDot} />
                          </span>
                          <span className={styles.radioText}>Fixed — Strict budget</span>
                        </label>
                        <label className={`${styles.radioLabel} ${watchedBudgetFlex === 'Flexible' ? styles.radioSelected : ''}`}>
                          <input
                            type="radio"
                            value="Flexible"
                            {...register('budgetFlexibility')}
                            className={styles.hiddenInput}
                          />
                          <span className={styles.customRadio}>
                            <span className={styles.radioInnerDot} />
                          </span>
                          <span className={styles.radioText}>Flexible — Open to discuss</span>
                        </label>
                      </div>
                      {errors.budgetFlexibility && <p className={styles.errorMsg}>{errors.budgetFlexibility.message}</p>}
                    </div>

                    <div className={`${styles.inputGroup} ${styles.fieldSpan2}`}>
                      <label className={`${styles.inputLabel} ${styles.inputLabelRequired}`}>
                        How did you hear about us?
                      </label>
                      <div className={styles.selectWrapper}>
                        <select
                          {...register('referralSource')}
                          className={styles.selectInput}
                          defaultValue=""
                        >
                          <option value="" disabled>Select reference</option>
                          {referralSources.map((source) => (
                            <option key={source} value={source}>
                              {source}
                            </option>
                          ))}
                        </select>
                        <span className={styles.focusLine} />
                        <span className={styles.selectArrow}>
                          <ChevronDown size={16} />
                        </span>
                      </div>
                      {errors.referralSource && <p className={styles.errorMsg}>{errors.referralSource.message}</p>}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: Review & Submit */}
              {step === 5 && (
                <div className="space-y-6">
                  <h2 className={`${styles.stepTitle} serif`}>
                    Review Details
                  </h2>

                  <div className={styles.reviewContainer}>
                    <div className={styles.reviewRow}>
                      <span className={styles.reviewLabel}>Package</span>
                      <span className={`${styles.reviewVal} ${styles.reviewValAccent}`}>{watchedPackage}</span>
                    </div>
                    <div className={styles.reviewRow}>
                      <span className={styles.reviewLabel}>Contact Details</span>
                      <div className={styles.reviewVal}>
                        <p style={{ fontWeight: 700 }}>{watchedName}</p>
                        <p style={{ opacity: 0.8 }}>{watchedEmail}</p>
                        {watch('phone') && <p style={{ opacity: 0.8 }}>{watch('phone')}</p>}
                        {watch('company') && <p style={{ opacity: 0.8 }}>Brand: {watch('company')}</p>}
                      </div>
                    </div>
                    <div className={styles.reviewRow}>
                      <span className={styles.reviewLabel}>Project Type</span>
                      <span className={styles.reviewVal}>{watchedBusinessType}</span>
                    </div>
                    <div className={styles.reviewRow}>
                      <span className={styles.reviewLabel}>Goal</span>
                      <p className={styles.reviewVal} style={{ whiteSpace: 'pre-wrap', fontWeight: 300 }}>{watchedProjectGoal}</p>
                    </div>
                    <div className={styles.reviewRow}>
                      <span className={styles.reviewLabel}>Key Features</span>
                      <p className={styles.reviewVal}>{watchedKeyFeatures?.join(', ')}</p>
                    </div>
                    <div className={styles.reviewRow}>
                      <span className={styles.reviewLabel}>Timeline</span>
                      <div className={styles.reviewVal}>
                        <p style={{ fontWeight: 700 }}>Launch: {watchedLaunchDate}</p>
                        <p style={{ opacity: 0.8 }}>Flexibility: {watchedBudgetFlex}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        {...register('agreedToContact')}
                        className={styles.hiddenInput}
                      />
                      <span className={styles.customCheckbox}>
                        {watchedAgreed && <Check size={12} strokeWidth={3} />}
                      </span>
                      <span className={`${styles.checkboxText} ${styles.checkboxTextRequired}`}>
                        I agree to be contacted by Metrina regarding my inquiry.
                      </span>
                    </label>
                    {errors.agreedToContact && (
                      <p className={styles.errorMsg}>{errors.agreedToContact.message}</p>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {submitError && (
          <div className={`${styles.errorBanner} mt-6`}>
            {submitError}
          </div>
        )}

        {/* Buttons Controls */}
        <div className={styles.buttonGroup}>
          <button
            type="button"
            onClick={prevStep}
            disabled={step === 1 || isSubmitting}
            className={styles.btnBack}
          >
            <ArrowLeft size={12} /> BACK
          </button>

          {step < 5 ? (
            <button
              type="button"
              onClick={nextStep}
              disabled={isNextDisabled()}
              className={styles.btnNext}
            >
              NEXT <ArrowRight size={12} />
            </button>
          ) : (
            <button
              type="submit"
              disabled={isNextDisabled() || isSubmitting}
              className={styles.btnSubmit}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={12} className="animate-spin" /> SENDING...
                </>
              ) : (
                <>
                  SEND INQUIRY <ArrowRight size={12} />
                </>
              )}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
