'use client';

import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './Testimonials.module.css';

const reviews = [
  {
    text: "Metrina’s architectural front‑end approach gave us far more than a beautiful brand presence. Our site now loads faster, converts better, and feels like a genuine experience—not just a page. They truly understand how form and function drive business results.",
    author: "SOPHIA CHEN",
    company: "LUMINA",
    rating: 5,
    initials: "SC",
    color: "oklch(65% 0.15 260)", // Deep Indigo/Blue
  },
  {
    text: "Metrina didn’t just write code—they reshaped how our entire platform breathes. Their spatial UX logic cut our new user onboarding time by 40%, and the interface now feels effortlessly precise. A true masterclass in design‑engineering synergy.",
    author: "MARCUS VANCE",
    company: "VORTEX LABS",
    rating: 5,
    initials: "MV",
    color: "oklch(60% 0.12 170)", // Teal/Sage
  },
  {
    text: "Metrina brought genuine technical precision to our research portal. Our load times dropped from over 4 seconds to well under 1 second, and the performance gains were immediate across the entire lab team. Exactly the kind of rigor biotech demands.",
    author: "ELENA ROSSI",
    company: "ETHELIA BIOLOGICS",
    rating: 5,
    initials: "ER",
    color: "oklch(60% 0.15 15)", // Warm Earth/Red
  },
  {
    text: "Metrina transformed our most tangled enterprise workflows into an interface that feels intuitive and fast. User retention jumped 34% in the first quarter alone. It has been a measurable game‑changer for our business.",
    author: "DAVID PARK",
    company: "NEXUS SYSTEMS",
    rating: 5,
    initials: "DP",
    color: "oklch(70% 0.1 80)", // Ochre/Gold
  },
  {
    text: "The level of detail is astounding. Metrina didn’t just build us a site—they constructed a complete digital identity with architectural rigor. Our brand consistency scores and user trust metrics both climbed sharply within weeks of launch.",
    author: "LIAM SMITH",
    company: "AETHER FORGE",
    rating: 5,
    initials: "LS",
    color: "oklch(55% 0.1 200)", // Muted Cyan/Blue
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1]
    }
  }
};

const StarRating = ({ rating }) => {
  return (
    <div className={styles.stars}>
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          fill={i < rating ? "currentColor" : "none"}
          className={i < rating ? styles.starFilled : styles.starEmpty}
        />
      ))}
    </div>
  );
};

const Testimonials = () => {
  return (
    <section className={`${styles.section} section-padding`} aria-labelledby="reviews-title">
      <div className={`${styles.container} container`}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        >
          <span className={styles.label}>Success Stories</span>
          <h2 id="reviews-title" className={`serif ${styles.title}`}>What Our User Says...</h2>
          <div className={styles.headerLine} />
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
              <div className={styles.cardHeader}>
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
              </div>

              <div className={styles.cardBody}>
                <div className={styles.quoteWrapper}>
                  <Quote className={styles.quoteIcon} size={20} strokeWidth={1} />
                  <p className={styles.reviewText}>{review.text}</p>
                </div>
              </div>

              <div className={styles.cardFooter}>
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
