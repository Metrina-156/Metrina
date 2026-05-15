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
      <div className={styles.backgroundDesign}>
        {/* Visible Texture Layer */}
        <div className={styles.textureLayer}>
          <Image
            src="https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=2000&auto=format&fit=crop"
            alt="Web Design and Development Workspace"
            fill
            style={{
              objectFit: 'cover',
              opacity: 0.15,
              filter: 'grayscale(0.4) contrast(1.1) brightness(0.95) sepia(0.1) hue-rotate(220deg)'
            }}
          />
        </div>



        {/* Technical Circle/Wireframe */}
        <div className={styles.wireframeContainer}>
          <svg width="100%" height="100%" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="400" cy="400" r="399" stroke="var(--accent-color)" strokeOpacity="0.2" strokeWidth="1" strokeDasharray="10 10" />
            <circle cx="400" cy="400" r="300" stroke="var(--accent-color)" strokeOpacity="0.15" strokeWidth="1" />
            <circle cx="400" cy="400" r="200" stroke="var(--accent-color)" strokeOpacity="0.08" strokeWidth="1" strokeDasharray="5 5" />
            <path d="M400 0V800M0 400H800" stroke="var(--accent-color)" strokeOpacity="0.08" strokeWidth="1" />
            <rect x="200" y="200" width="400" height="400" stroke="var(--accent-color)" strokeOpacity="0.06" strokeWidth="1" transform="rotate(45 400 400)" />
          </svg>
        </div>

        {/* Floating Auras */}
        <div className={styles.auraPrimary} />
        <div className={styles.auraSecondary} />
      </div>

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
