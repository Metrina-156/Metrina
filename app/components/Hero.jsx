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
    <section className={styles.hero}>
      <Image
        src="/hero-bg.png"
        alt="Bespoke Digital Background"
        fill
        priority
        quality={100}
        style={{ objectFit: 'cover', zIndex: -1 }}
      />
      
      {/* Subtle Overlay to ensure text readability */}
      <div className={styles.overlay}></div>

      <div className={styles.container}>
        <div className={styles.heroContent}>
          <h1 className={`${styles.title} serif`}>
            <span>your  brand  deserves  a  Digital  Presence</span>
          </h1>

          <div className={styles.roleContainer}>
            <p className={styles.typewriter}>
              Crafting fast, beautiful websites that grow your business
            </p>
          </div>

          <button
            className={`${styles.cta} interactive`}
            onClick={scrollToWork}
          >
            View Work
          </button>
        </div>
      </div>

      {/* Scroll Arrow Indicator */}
      <div className={styles.scrollIndicator}>
        <ChevronDown size={32} strokeWidth={1} className={styles.bounceArrow} />
      </div>
    </section>
  );
};

export default Hero;
