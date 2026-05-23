'use client';

import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './Testimonials.module.css';

const reviews = [
  {
    text: "Metrina’s architectural front‑end approach gave us far more than a beautiful brand presence. Our site now loads faster, converts better, and feels like a genuine experience—not just a page. They truly understand how form and function drive business results.",
    author: "Sophia Chen",
    company: "LUMINA",
    rating: 5,
    initials: "SC",
    color: "oklch(60% 0.15 250)", 
  },
  {
    text: "Metrina didn’t just write code—they reshaped how our entire platform breathes. Their spatial UX logic cut our new user onboarding time by 40%, and the interface now feels effortlessly precise.",
    author: "Marcus Vance",
    company: "VORTEX LABS",
    rating: 5,
    initials: "MV",
    color: "oklch(55% 0.2 160)",
  },
  {
    text: "Metrina brought genuine technical precision to our research portal. Our load times dropped from over 4 seconds to well under 1 second. Exactly the kind of rigor biotech demands.",
    author: "Elena Rossi",
    company: "ETHELIA BIOLOGICS",
    rating: 5,
    initials: "ER",
    color: "oklch(50% 0.18 20)",
  },
  {
    text: "Metrina transformed our most tangled enterprise workflows into an interface that feels intuitive and fast. User retention jumped 34% in the first quarter alone.",
    author: "David Park",
    company: "NEXUS SYSTEMS",
    rating: 5,
    initials: "DP",
    color: "oklch(65% 0.12 80)",
  },
  {
    text: "The level of detail is astounding. Metrina didn’t just build us a site—they constructed a complete digital identity with architectural rigor.",
    author: "Liam Smith",
    company: "AETHER FORGE",
    rating: 5,
    initials: "LS",
    color: "oklch(55% 0.15 200)",
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1] // Out-Expo for snap
    }
  }
};

const StarRating = ({ rating }) => {
  return (
    <div className={styles.stars}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={12}
          fill={i < rating ? "currentColor" : "none"}
          className={i < rating ? styles.starFilled : styles.starEmpty}
          strokeWidth={2}
        />
      ))}
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className={styles.section} aria-labelledby="reviews-title">
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.label}>Proven Precision</span>
          <h2 id="reviews-title" className={styles.title}>The Impact of Architectural Engineering.</h2>
        </motion.div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              className={styles.card}
              variants={itemVariants}
            >
              <div className={styles.cardBody}>
                <Quote className={styles.quoteIcon} size={24} strokeWidth={1.5} />
                <p className={styles.reviewText}>{review.text}</p>
              </div>

              <div className={styles.cardFooter}>
                <div className={styles.authorSection}>
                  <div
                    className={styles.avatar}
                    style={{ backgroundColor: review.color }}
                  >
                    {review.initials}
                  </div>
                  <div className={styles.meta}>
                    <span className={styles.authorName}>{review.author}</span>
                    <span className={styles.authorCompany}>{review.company}</span>
                  </div>
                </div>
                <StarRating rating={review.rating} />
              </div>
            </motion.div>
          ))}

        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
