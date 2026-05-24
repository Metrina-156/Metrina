'use client';

import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { Plus, Minus, ArrowUpRight } from 'lucide-react';
import styles from './About.module.css';

const About = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const prefersReduced = useReducedMotion();
  const [activeAccordion, setActiveAccordion] = useState(null);

  useGSAP(() => {
    if (prefersReduced) return;
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(imageRef.current,
      { yPercent: -12 },
      {
        yPercent: 12,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );
  }, { scope: containerRef, dependencies: [prefersReduced] });

  const accordionItems = [
    {
      id: 'integrity',
      num: '01',
      title: 'Architectural Integrity',
      description: 'We believe layout constraints generate creative tension. We design around grids and modular scale, building digital experiences that feel physically anchored and structurally balanced.',
    },
    {
      id: 'performance',
      num: '02',
      title: 'Elite Performance',
      description: 'Bespoke engineering means zero bloat. We optimize every script, image, and micro-interaction to maintain 60fps animations and perfect Core Web Vitals across all viewports.',
    },
    {
      id: 'luxury',
      num: '03',
      title: 'Unconventional Luxury',
      description: 'Avoiding cookie-cutter templates, we craft custom typography layouts, tactile hover transitions, and grainy-noise tactile styling to make your digital space stand out.',
    }
  ];

  const technicalSpecs = [
    { label: 'Studio Focus', value: 'Bespoke Development' },
    { label: 'Founding Year', value: '2026' },
    { label: 'Operational SLAs', value: '24/7 On-Call Support' },
    { label: 'Core Vibe', value: 'Architectural Luxury' },
  ];

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    <section ref={containerRef} className={styles.section} aria-labelledby="about-title">
      <div className={styles.gridContainer}>
        {/* Cell 1: Section Header */}
        <div className={`${styles.cell} ${styles.headerCell}`}>
          <h2 id="about-title" className={`${styles.title} serif`}>
            Architecting digital products with physical precision.
          </h2>
        </div>

        {/* Cell 2: Visual Parallax Frame */}
        <div className={`${styles.cell} ${styles.visualCell}`}>
          <div className={styles.imageWrapper}>
            <div ref={imageRef} className={styles.parallaxImage}>
              <Image
                src="/about-image.png"
                alt="Metrina team workspace"
                fill
                priority
                style={{ objectFit: 'cover' }}
              />
            </div>
            {/* Architectural HUD Overlay */}
            <div className={styles.hudOverlay} aria-hidden="true">
              <span className={styles.hudCoordinates}>LAT // 3.1390° N, 101.6869° E</span>
              <span className={styles.hudMetric}>FPS // 60.00</span>
            </div>
          </div>
        </div>

        {/* Cell 3: Statement & Specs */}
        <div className={`${styles.cell} ${styles.statementCell}`}>
          <p className={`${styles.philosophy} serif`}>
            Metrina is an elite boutique engineering studio specializing in high-performance digital systems. We design and build bespoke platforms that solve complex structural problems, leaving no detail to chance.
          </p>
          <div className={styles.specsGrid}>
            {technicalSpecs.map((spec, index) => (
              <div key={index} className={styles.specItem}>
                <span className={styles.specLabel}>{spec.label}</span>
                <span className={styles.specValue}>{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cell 4: Accordion */}
        <div className={`${styles.cell} ${styles.accordionCell}`}>
          <div className={styles.accordionHeaderWrapper}>
            <span className={styles.metaLabel}>STRATEGY</span>
            <h3 className={`${styles.accordionSectionTitle} serif`}>Core Pillars</h3>
          </div>
          <div className={styles.accordionContainer}>
            {accordionItems.map((item) => {
              const isOpen = activeAccordion === item.id;
              return (
                <div key={item.id} className={`${styles.accordionItem} ${isOpen ? styles.itemOpen : ''}`}>
                  <button
                    className={styles.accordionTrigger}
                    onClick={() => toggleAccordion(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`content-${item.id}`}
                    id={`trigger-${item.id}`}
                  >
                    <span className={styles.itemTitle}>{item.title}</span>
                    <span className={styles.itemIcon} aria-hidden="true">
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`content-${item.id}`}
                        role="region"
                        aria-labelledby={`trigger-${item.id}`}
                        initial={prefersReduced ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={prefersReduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                        className={styles.accordionContent}
                      >
                        <p className={styles.accordionText}>{item.description}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
