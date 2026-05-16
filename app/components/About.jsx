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
          <p className={`${styles.philosophy} serif`}>
            Metrina is a group of young and enthusiastic engineers developing real world application.
            <br /><br />
            We are here to build an fully customized website to satisy your needs and to boost your brands reach.
          </p>

          <div className={styles.stats}>
            <div className={styles.statPill}>
              revolutionized designs
            </div>
            <div className={styles.statPill}>
              providing 24/7 support
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
