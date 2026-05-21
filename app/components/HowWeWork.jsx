'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './HowWeWork.module.css';

const HowWeWork = () => {
  const containerRef = useRef(null);
  const itemsRef = useRef([]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    itemsRef.current.forEach((item, index) => {
      if (!item) return;

      gsap.fromTo(item,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          delay: index * 0.15
        }
      );
    });
  }, { scope: containerRef });

  const steps = [
    {
      number: "01",
      title: "Discovery",
      description: "We start with a focused conversation to understand your brand, goals, and audience. No templates, no assumptions."
    },
    {
      number: "02",
      title: "Design",
      description: "A custom design crafted to reflect your identity — reviewed and refined with your feedback before a single line of code is written."
    },
    {
      number: "03",
      title: "Build",
      description: "Clean, performant code built with modern tools. Fully responsive, fast-loading, and built to scale."
    },
    {
      number: "04",
      title: "Launch",
      description: "We handle deployment, domain setup, and hosting — then hand you everything you need to move forward independently."
    }
  ];

  return (
    <section ref={containerRef} className={`${styles.section} section-padding`} aria-labelledby="how-we-work-title">
      <div className="container">
        <h2 id="how-we-work-title" className={`serif ${styles.title}`}>How We Work</h2>

        <div className={styles.stepsGrid}>
          {steps.map((step, i) => (
            <div
              key={i}
              className={styles.stepItem}
              ref={el => itemsRef.current[i] = el}
            >
              <div className={styles.headerRow}>
                <div className={styles.numberIndicator}>{step.number}</div>
                {i < steps.length - 1 && <div className={styles.connector} />}
              </div>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDesc}>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
