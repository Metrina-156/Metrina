'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check } from 'lucide-react';
import Link from 'next/link';
import styles from './Pricing.module.css';

const Pricing = () => {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      gsap.fromTo(card,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.65,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 70%',
            toggleActions: 'play none none none'
          },
          delay: index * 0.08
        }
      );
    });
  }, { scope: containerRef });

  const tiers = [
    {
      name: "STARTER",
      price: "₹15,000",
      priceSuffix: "Starting at",
      bestFor: "Small businesses and individuals who need a strong online presence fast.",
      includes: [
        "Single page custom website",
        "Domain registration",
        "Hosting setup (1 year)",
        "Mobile responsive design",
        "Basic contact form",
        "1 round of revisions",
        "Lightning fast performance"
      ],
      cta: "Get Started →",
      link: "#contact"
    },
    {
      name: "GROWTH",
      price: "₹40,000",
      priceSuffix: "Starting at",
      isPopular: true,
      bestFor: "Growing brands that need more pages, content control, and search visibility.",
      includes: [
        "Up to 5 custom pages",
        "CMS integration (manage content)",
        "On-page SEO setup",
        "Domain + Hosting (1 year)",
        "Mobile responsive design",
        "2 rounds of revisions",
        "Priority email support"
      ],
      cta: "Get Started →",
      link: "#contact"
    },
    {
      name: "CUSTOM",
      price: "Let's Talk",
      priceSuffix: "",
      bestFor: "Bespoke digital products and high-impact platforms for brands that refuse to be constrained by standard templates.",
      includes: [
        "Full discovery and scoping session",
        "Custom architecture and design",
        "Web app / API integrations",
        "Ongoing support options",
        "Timeline tailored to project",
        "Pricing tailored to scope"
      ],
      cta: "Start a Conversation →",
      link: "#contact"
    }
  ];

  const handleScroll = (e, target) => {
    e.preventDefault();
    if (window.lenis) {
      window.lenis.scrollTo(target);
    } else {
      const el = document.querySelector(target);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="pricing" ref={containerRef} className={`${styles.section} section-padding`} aria-labelledby="pricing-title">
      <div className="container">
        <div className={styles.header}>
          <h2 id="pricing-title" className={`serif ${styles.title}`}>Investment</h2>
          <p className={styles.subtitle}>
            Straightforward pricing. Uncompromising quality. No hidden fees.
          </p>
        </div>

        <div className={styles.pricingGrid}>
          {tiers.map((tier, i) => (
            <div
              key={i}
              className={`${styles.card} ${tier.isPopular ? styles.popular : ''}`}
              ref={el => cardsRef.current[i] = el}
            >
              {tier.isPopular && <div className={styles.badge}>MOST POPULAR</div>}

              <div className={styles.cardHeader}>
                <span className={styles.tierName}>{tier.name}</span>
                <div className={styles.priceContainer}>
                  {tier.priceSuffix && <span className={styles.priceSuffix}>{tier.priceSuffix}</span>}
                  <span className={styles.price}>{tier.price}</span>
                </div>
                <p className={styles.bestFor}>{tier.bestFor}</p>
              </div>

              <ul className={styles.featureList}>
                {tier.includes.map((feature, idx) => (
                  <li key={idx} className={styles.featureItem}>
                    <div className={styles.checkWrapper}>
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/get-started?package=${tier.name}`}
                className={`${styles.cta} interactive`}
              >
                {tier.cta}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
