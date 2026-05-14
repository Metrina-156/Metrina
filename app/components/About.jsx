'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import styles from './About.module.css';

const About = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(textRef.current, {
      y: -30,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className={`${styles.section} section-padding`} aria-labelledby="about-title">
      <div className={`${styles.container} container`}>
        <div className={styles.visual}>
          <div className={styles.imageWrapper}>
            <Image
              src="/about-image.png"
              alt="Our creative team at work"
              fill
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>

        <div className={styles.textContainer} ref={textRef}>
          <h2 id="about-title" className="serif" style={{ fontSize: '2.5rem', marginBottom: '2rem' }}>Our Philosophy</h2>
          <p className={`${styles.philosophy} serif`}>
            Metrina is a collective of engineers dedicated to bridging the gap between sophisticated technology and human-centric design.
            <br /><br />
            We build fully customized digital platforms that don't just exist—they perform, scale, and elevate your brand's presence in an ever-evolving market.
          </p>

          <div className={styles.stats}>
            <div className={styles.statPill}>
              Bespoke Design
            </div>
            <div className={styles.statPill}>
              Global Support
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
