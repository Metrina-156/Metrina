'use client';

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Testimonials.module.css';

const reviews = [
  {
    quote: "Metrina didn't just write code — they reshaped how our entire platform breathes. Their spatial UX logic cut new user onboarding time by 40%, and the interface now feels effortlessly precise.",
    author: "Marcus Vance",
    role: "CTO",
    company: "Vortex Labs",
    result: "40% faster onboarding",
  },
  {
    quote: "Metrina brought genuine technical precision to our research portal. Load times dropped from over 4 seconds to well under 1 second. Exactly the kind of rigor biotech demands.",
    author: "Elena Rossi",
    role: "Head of Product",
    company: "Ethelia Biologics",
    result: "4s → <1s load time",
  },
  {
    quote: "Metrina transformed our most tangled enterprise workflows into an interface that feels intuitive and fast. User retention jumped 34% in the first quarter alone.",
    author: "David Park",
    role: "Director of UX",
    company: "Nexus Systems",
    result: "+34% user retention",
  },
  {
    quote: "We've scaled through three major pivots without a single rewrite. Metrina's focus on modularity and type safety has saved us hundreds of thousands in maintenance costs.",
    author: "Sarah Jenkins",
    role: "Founder & CEO",
    company: "Modulus",
    result: "Zero architectural debt",
  },
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  const headlineRef = useRef(null);
  const quoteRef = useRef(null);
  const authorRef = useRef(null);
  const resultRef = useRef(null);
  const progressRef = useRef(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const timelineRef = useRef(null);
  const intervalRef = useRef(null);

  // Morphs to a new review with GSAP
  const morphTo = useCallback((nextIndex) => {
    if (nextIndex === activeIndexRef.current) return;

    // Kill any existing animation to prevent conflicts and responsiveness lag
    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    // Update active index state and ref immediately for instant UI feedback
    activeIndexRef.current = nextIndex;
    setActiveIndex(nextIndex);

    const tl = gsap.timeline();
    timelineRef.current = tl;

    // 1. Reset progress bar scale immediately
    tl.set(progressRef.current, { scaleX: 0 });

    // 2. Animate out the current content
    tl.to([quoteRef.current, authorRef.current, resultRef.current], {
      opacity: 0,
      y: -12,
      duration: 0.25,
      ease: 'power2.in',
      stagger: 0.03,
    });

    // 3. Swap the content text
    tl.call(() => {
      const r = reviews[nextIndex];
      if (quoteRef.current) quoteRef.current.textContent = `"${r.quote}"`;
      if (authorRef.current) authorRef.current.textContent = `${r.author}, ${r.role} — ${r.company}`;
      if (resultRef.current) resultRef.current.textContent = r.result;
    });

    // 4. Animate in the new content
    tl.fromTo(
      [quoteRef.current, authorRef.current, resultRef.current],
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        ease: 'expo.out',
        stagger: 0.05,
      }
    );

    // 5. Animate progress bar filling for the next slide (5.2s duration matches slide cycle)
    tl.to(progressRef.current, {
      scaleX: 1,
      duration: 5.2,
      ease: 'none'
    }, '>-0.1');
  }, []);

  const startInterval = useCallback(() => {
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      const next = (activeIndexRef.current + 1) % reviews.length;
      morphTo(next);
    }, 6000);
  }, [morphTo]);

  const goTo = (i) => {
    if (i === activeIndexRef.current) return;
    morphTo(i);
    startInterval();
  };

  const handlePrev = () => {
    const prev = (activeIndexRef.current - 1 + reviews.length) % reviews.length;
    goTo(prev);
  };

  const handleNext = () => {
    const next = (activeIndexRef.current + 1) % reviews.length;
    goTo(next);
  };

  useEffect(() => {
    // Initialize progress bar animation for the first slide
    if (progressRef.current) {
      gsap.fromTo(progressRef.current, 
        { scaleX: 0 },
        { scaleX: 1, duration: 5.5, ease: 'none' }
      );
    }
    startInterval();
    return () => {
      clearInterval(intervalRef.current);
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
    };
  }, [startInterval]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Section entrance
    gsap.fromTo(
      headlineRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    );

    gsap.fromTo(
      [quoteRef.current, authorRef.current, resultRef.current],
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.1,
        delay: 0.3,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
          toggleActions: 'play none none none',
        },
      }
    );
  }, { scope: sectionRef });

  const firstReview = reviews[0];

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="testimonials-title"
    >
      <div className={styles.container}>
        {/* Section label + heading */}
        <div ref={headlineRef} className={styles.header}>
          <h2 id="testimonials-title" className={styles.title}>
            The work<br />speaks clearly.
          </h2>
        </div>

        {/* Featured quote panel */}
        <div className={styles.stage}>
          {/* Frosted glass panel — purposeful single use */}
          <div className={styles.glassPanel}>
            {/* Left navigation button (visible on mobile/tablet) */}
            <button
              className={styles.navButtonLeft}
              onClick={handlePrev}
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>

            <div className={styles.quoteGlyph} aria-hidden="true">&ldquo;</div>

            <blockquote className={styles.quoteBlock}>
              <p ref={quoteRef} className={styles.quoteText}>
                &quot;{firstReview.quote}&quot;
              </p>
            </blockquote>

            <div className={styles.quoteMeta}>
              <p ref={authorRef} className={styles.authorLine}>
                {firstReview.author}, {firstReview.role} — {firstReview.company}
              </p>
              <span ref={resultRef} className={styles.result}>
                {firstReview.result}
              </span>
            </div>

            {/* Right navigation button (visible on mobile/tablet) */}
            <button
              className={styles.navButtonRight}
              onClick={handleNext}
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>

            {/* Pagination dots (visible on mobile/tablet) */}
            <div className={styles.dotsIndicator} role="tablist" aria-label="Testimonial slides">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${activeIndex === i ? styles.dotActive : ''}`}
                  onClick={() => goTo(i)}
                  role="tab"
                  aria-selected={activeIndex === i}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            {/* Active progress bar */}
            <div className={styles.progressTrack} aria-hidden="true">
              <div ref={progressRef} className={styles.progressFill} />
            </div>
          </div>

          {/* Review selector (visible only on desktop) */}
          <nav className={styles.selector} aria-label="Select testimonial">
            {reviews.map((r, i) => (
              <button
                key={i}
                className={`${styles.selectorItem} ${activeIndex === i ? styles.selectorActive : ''}`}
                onClick={() => goTo(i)}
                aria-label={`Testimonial from ${r.author} at ${r.company}`}
                aria-current={activeIndex === i ? 'true' : undefined}
              >
                <span className={styles.selectorIndex}>0{i + 1}</span>
                <span className={styles.selectorCompany}>{r.company}</span>
                <span className={styles.selectorResult}>{r.result}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
