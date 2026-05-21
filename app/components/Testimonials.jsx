'use client';

import React from 'react';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import styles from './Testimonials.module.css';

const reviews = [
  {
    text: "The architectural approach to the front-end was exactly what our brand needed. Metrina team are true digital artisans who understand form and function.",
    author: "SOPHIA CHEN",
    company: "LUMINA",
    rating: 5,
    initials: "SC",
    color: "oklch(65% 0.15 260)", // Deep Indigo/Blue
  },
  {
    text: "Beyond just code, they understand the spatial relationship between design and user experience. Precise and effortless.",
    author: "MARCUS VANCE",
    company: "VORTEX LABS",
    rating: 5,
    initials: "MV",
    color: "oklch(60% 0.12 170)", // Teal/Sage
  },
  {
    text: "Technical mastery delivered with incredible precision. Performance gains were immediate.",
    author: "ELENA ROSSI",
    company: "ETHELIA BIOLOGICS",
    rating: 5,
    initials: "ER",
    color: "oklch(60% 0.15 15)", // Warm Earth/Red
  },
  {
    text: "Their ability to translate complex requirements into intuitive interfaces is unmatched. A game-changer for our user retention.",
    author: "DAVID PARK",
    company: "NEXUS SYSTEMS",
    rating: 5,
    initials: "DP",
    color: "oklch(70% 0.1 80)", // Ochre/Gold
  },
  {
    text: "The level of detail in their work is astounding. They don't just build sites; they construct digital identities with architectural rigor.",
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
          <h2 id="reviews-title" className={`serif ${styles.title}`}>Digital <br /> Craftsmanship.</h2>
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
