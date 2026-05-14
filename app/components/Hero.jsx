'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import styles from './Hero.module.css';

const Hero = () => {
  const scrollToWork = () => {
    if (window.lenis) {
      window.lenis.scrollTo('#work');
    } else {
      const el = document.getElementById('work');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <Image
        src="/hero-bg.png"
        alt=""
        fill
        priority
        quality={100}
        style={{ objectFit: 'cover', zIndex: 0 }}
      />
      
      <div className={styles.overlay}></div>

      <div className={styles.container}>
        <div className={styles.heroContent}>
          <h1 id="hero-title" className={`${styles.title} serif`}>
            Your brand deserves a Digital Presence
          </h1>

          <div className={styles.roleContainer}>
            <p className={styles.typewriter}>
              Crafting sophisticated digital experiences that scale
            </p>
          </div>

          <button
            className={`${styles.cta} interactive`}
            onClick={scrollToWork}
            aria-label="View my work"
          >
            View Work
          </button>
        </div>
      </div>

      <div className={styles.scrollIndicator} aria-hidden="true">
        <span className={styles.scrollText}>SCROLL</span>
        <ChevronDown size={24} strokeWidth={1} className={styles.bounceArrow} />
      </div>
    </section>
  );
};

export default Hero;
