'use client';

import React, { useState, useEffect } from 'react';
import styles from './Testimonials.module.css';

const Testimonials = () => {
  const quotes = [
    { text: "The architectural approach to the front-end was exactly what our brand needed. Alex is a true digital artisan.", author: "SOPHIA CHEN, CEO AT LUMINA" },
    { text: "Beyond just code, Alex understands the spatial relationship between design and user experience.", author: "MARCUS VANCE, CREATIVE DIRECTOR" },
    { text: "Technical mastery delivered with incredible precision. The performance gains were immediate.", author: "ELENA ROSSI, FOUNDER OF VORTEX" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className={`${styles.section} section-padding`}>
      <div className={`${styles.container} container`}>
        <div className={styles.content}>
          <p className={`${styles.quote} serif`}>
            "{quotes[currentIndex].text}"
          </p>
          <span className={styles.author}>
            {quotes[currentIndex].author}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
