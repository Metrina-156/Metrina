'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Loader2 } from 'lucide-react';
import styles from './RequestInfoForm.module.css';

// ── Schema ──────────────────────────────────────────────────────────────────
const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(7, 'Please enter a valid phone number'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type FormData = z.infer<typeof schema>;

// ── Component ────────────────────────────────────────────────────────────────
export default function RequestInfoForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues: {
      phone: '+91 ',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const response = await fetch('/api/request-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const res = await response.json();
      if (!response.ok) {
        throw new Error(res.error || 'Something went wrong. Please try again.');
      }
      setIsSubmitted(true);
    } catch (err: any) {
      setSubmitError(err.message || 'An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Success state ──────────────────────────────────────────────────────────
  if (isSubmitted) {
    return (
      <div className={styles.card}>
        <motion.div
          className={styles.successWrapper}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <motion.div
            className={styles.successRing}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 15 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
            >
              <Check size={32} strokeWidth={1.8} />
            </motion.div>
          </motion.div>

          <h1 className={`${styles.successTitle} serif`}>
            Message Sent
          </h1>
          <p className={styles.successDesc}>
            We&apos;ve received your message and will be in touch within a few hours. Check your inbox for a confirmation.
          </p>

          <Link href="/" className={styles.returnLink}>
            Return home <ArrowRight size={13} />
          </Link>
        </motion.div>
      </div>
    );
  }

  // ── Form ───────────────────────────────────────────────────────────────────
  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Header */}
      <p className={styles.eyebrow}>Request Info</p>
      <h1 className={`${styles.formTitle} serif`}>
        Let&apos;s talk.
      </h1>
      <p className={styles.formSubtitle}>
        Have a question about our services, process, or pricing? Drop us a message and we&apos;ll get back to you shortly.
      </p>

      <div className={styles.divider} />

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles.fieldStack}>

          {/* Name + Email side-by-side */}
          <div className={styles.inlineRow}>
            {/* Full Name */}
            <div className={styles.inputGroup}>
              <label
                htmlFor="ri-name"
                className={`${styles.inputLabel} ${styles.inputLabelRequired}`}
              >
                Full Name
              </label>
              <div className={styles.inputWrapper}>
                <input
                  id="ri-name"
                  type="text"
                  placeholder="John Doe"
                  autoComplete="name"
                  {...register('name')}
                  className={styles.textInput}
                />
                <span className={styles.focusLine} />
              </div>
              <AnimatePresence>
                {errors.name && (
                  <motion.p
                    className={styles.errorMsg}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    {errors.name.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Email */}
            <div className={styles.inputGroup}>
              <label
                htmlFor="ri-email"
                className={`${styles.inputLabel} ${styles.inputLabelRequired}`}
              >
                Email Address
              </label>
              <div className={styles.inputWrapper}>
                <input
                  id="ri-email"
                  type="email"
                  placeholder="john@example.com"
                  autoComplete="email"
                  {...register('email')}
                  className={styles.textInput}
                />
                <span className={styles.focusLine} />
              </div>
              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    className={styles.errorMsg}
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    {errors.email.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Phone */}
          <div className={styles.inputGroup}>
            <label
              htmlFor="ri-phone"
              className={`${styles.inputLabel} ${styles.inputLabelRequired}`}
            >
              Phone Number
            </label>
            <div className={styles.inputWrapper}>
              <input
                id="ri-phone"
                type="tel"
                placeholder="+91 99999 99999"
                autoComplete="tel"
                {...register('phone')}
                className={styles.textInput}
              />
              <span className={styles.focusLine} />
            </div>
            <AnimatePresence>
              {errors.phone && (
                <motion.p
                  className={styles.errorMsg}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {errors.phone.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* Message */}
          <div className={styles.inputGroup}>
            <label
              htmlFor="ri-message"
              className={`${styles.inputLabel} ${styles.inputLabelRequired}`}
            >
              Your Message
            </label>
            <div className={styles.inputWrapper}>
              <textarea
                id="ri-message"
                rows={5}
                placeholder="Tell us what you'd like to know — pricing, process, timeline, or anything else..."
                {...register('message')}
                className={styles.textareaInput}
              />
              <span className={styles.focusLine} />
            </div>
            <AnimatePresence>
              {errors.message && (
                <motion.p
                  className={styles.errorMsg}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  {errors.message.message}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Error Banner */}
        <AnimatePresence>
          {submitError && (
            <motion.div
              className={styles.errorBanner}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              {submitError}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Submit */}
        <button
          type="submit"
          id="request-info-submit"
          disabled={!isValid || isSubmitting}
          className={styles.submitBtn}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Sending...
            </>
          ) : (
            <>
              Send Message
              <ArrowRight size={14} />
            </>
          )}
        </button>

        <p className={styles.footerNote}>
          We typically respond within a few hours &nbsp;•&nbsp; hello@metrina.dev
        </p>
      </form>
    </motion.div>
  );
}
