'use client';

import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import styles from './Testimonials.module.css';

const reviews = [
  {
    text: "The architectural approach to the front-end was exactly what our brand needed. Metrina team are true digital artisans who understand the balance of form and function.",
    author: "SOPHIA CHEN",
    company: "LUMINA",
    project: "Brand Reimagination",
    rating: 5
  },
  {
    text: "Beyond just code, they understand the spatial relationship between design and user experience. The delivery was precise and the communication was effortless.",
    author: "MARCUS VANCE",
    company: "VORTEX LABS",
    project: "Analytics Dashboard",
    rating: 5
  },
  {
    text: "Technical mastery delivered with incredible precision. The performance gains were immediate, and our conversion rate has seen a significant boost since the launch.",
    author: "ELENA ROSSI",
    company: "ETHELIA BIOLOGICS",
    project: "Ethelia Identity",
    rating: 5
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % reviews.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={`${styles.section} section-padding`} aria-labelledby="reviews-title">
      <div className={`${styles.container} container`}>
        <h2 id="reviews-title" className={`serif ${styles.title}`}>What our client says...</h2>

        <div className={styles.reviewWrapper}>
          <div className={styles.content}>
            <p className={`${styles.quote} serif`}>
              &quot;{reviews[currentIndex].text}&quot;
            </p>

            <div className={styles.meta}>
              <div className={styles.authorInfo}>
                <span className={styles.author}>{reviews[currentIndex].author}</span>
                <span className={styles.company}>{reviews[currentIndex].company}</span>
              </div>
              <div className={styles.projectBadge}>
                {reviews[currentIndex].project}
              </div>
            </div>
          </div>

          <div className={styles.pagination}>
            {reviews.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${currentIndex === i ? styles.active : ''} interactive`}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
