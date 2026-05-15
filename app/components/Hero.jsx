'use client';

import React, { useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import styles from './Hero.module.css';

const Hero = () => {
  const container = useRef(null);
  const titleRef = useRef(null);
  const subtextRef = useRef(null);
  const ctaRef = useRef(null);
  const waveRef = useRef(null);
  const bgImgRef = useRef(null);

  const scrollToPricing = () => {
    if (window.lenis) {
      window.lenis.scrollTo('#pricing');
    } else {
      const el = document.getElementById('pricing');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: 'expo.out', duration: 1.5 } });

    tl.fromTo(container.current, { opacity: 0 }, { opacity: 1, duration: 1 })
      .fromTo(titleRef.current, { y: 60, opacity: 0 }, { y: 0, opacity: 1 }, "-=0.5")
      .fromTo(subtextRef.current, { y: 30, opacity: 0 }, { y: 0, opacity: 1 }, "-=1.2")
      .fromTo(ctaRef.current, { y: 20, opacity: 0 }, { y: 0, opacity: 1 }, "-=1.2")
      .fromTo(bgImgRef.current, { scale: 1.1, opacity: 0 }, { scale: 1, opacity: 0.15, duration: 2.5 }, "-=2.2")
      .fromTo(waveRef.current, { opacity: 0, scaleY: 0.5 }, { opacity: 0.6, scaleY: 1, duration: 2 }, "-=1.5");
    
    // Subtle parallax effect on mouse move
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 30;
      const yPos = (clientY / window.innerHeight - 0.5) * 30;

      if (bgImgRef.current) {
        gsap.to(bgImgRef.current, { x: xPos, y: yPos, duration: 3, ease: "power2.out" });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    // Subtle float for the wave
    gsap.to(waveRef.current, {
      y: 15,
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut"
    });

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, { scope: container });

  return (
    <section ref={container} className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.backgroundDesign}>
        {/* Large Editorial Background Imagery */}
        <div ref={bgImgRef} className={styles.heroBackground}>
          <Image 
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2000&auto=format&fit=crop" 
            alt="High-contrast architectural skyscraper facade" 
            fill
            priority
            className={styles.bgImg}
          />
        </div>

        {/* Minimalist Wave Background */}
        <div ref={waveRef} className={styles.waveContainer}>
          <svg viewBox="0 0 1440 320" preserveAspectRatio="none" className={styles.waveSvg}>
            <path 
              fill="#008080" 
              fillOpacity="0.03" 
              d="M0,192L48,197.3C96,203,192,213,288,192C384,171,480,117,576,112C672,107,768,149,864,165.3C960,181,1056,171,1152,149.3C1248,128,1344,96,1392,80L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
            <path 
              fill="#008080" 
              fillOpacity="0.05" 
              d="M0,256L48,229.3C96,203,192,149,288,154.7C384,160,480,224,576,218.7C672,213,768,139,864,128C960,117,1056,171,1152,197.3C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.heroContent}>
          <div className={styles.titleWrapper}>
            <h1 id="hero-title" ref={titleRef} className={`${styles.title} serif`}>
              Bespoke Digital <br />
              <span className={styles.italic}>Experiences</span>
            </h1>
          </div>

          <div className={styles.roleContainer}>
            <p ref={subtextRef} className={styles.subtitle}>
              Elite web development for high-end digital artisans. <br />
              Precision-crafted, architecturally sound, visually striking.
            </p>
          </div>

          <div ref={ctaRef}>
            <button
              className={`${styles.cta} interactive`}
              onClick={scrollToPricing}
              aria-label="View pricing"
            >
              Start Your Project
            </button>
          </div>
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
