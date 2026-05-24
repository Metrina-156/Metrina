'use client';

import React, { useState } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import styles from './Work.module.css';

const Work = () => {
  const projects = [
    { id: 1, title: "Ethelia Biologics", year: "2026", tag: "Brand Showcase", desc: "A bespoke digital identity built for a biotech startup redefining how medicine understands the individual.", img: "https://res.cloudinary.com/dlauksjfq/image/upload/v1778866507/Screenshot_2026-05-15_223118_vj0enw.png", link: "https://ethelia-biologics.onrender.com/" },
    { id: 2, title: "Pharmacogenics", year: "2026", tag: "B2B Saas", desc: "A pharmacogenomics research tool that lets you search and explore gene variants — showing genomic metadata, population frequency data, and drug interaction profiles to understand how specific genetic variations affect individual drug response.", img: "https://res.cloudinary.com/dlauksjfq/image/upload/v1778867279/Screenshot_134_xr8me9.png", link: "https://pharmacogenics.onrender.com/" },
    { id: 3, title: "Artesenal henna", year: "2026", tag: "E-Commerce", desc: "A fully responsive e-commerce platform designed for a henna brand, featuring product listings, a shopping cart, and a seamless checkout experience. Built with a warm, earthy aesthetic that reflects the artistry and cultural richness of henna. Focused on intuitive UX to convert browsers into buyers.", img: "https://res.cloudinary.com/dlauksjfq/image/upload/v1779603043/Screenshot_2026-05-24_112759_ctbcag.png", link: "https://henna-ecommerce.vercel.app/" }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const handleInteraction = (index, entering) => {
    if (window.innerWidth <= 768) return;
    setActiveIndex(entering ? index : null);

    gsap.to(`.project-content-${index}`, {
      height: entering ? 'auto' : 0,
      opacity: entering ? 1 : 0,
      duration: 1.2,
      ease: 'expo.out'
    });
  };

  return (
    <section id="work" className={`${styles.section} section-padding`} aria-labelledby="work-title">
      <div className="container">
        <h2 id="work-title" className={`serif ${styles.title}`}>Selected Works</h2>

        <div className={styles.accordionWrapper}>
          {projects.map((project, i) => (
            <div
              key={project.id}
              className={`${styles.projectRow} ${activeIndex === i ? styles.active : ''}`}
              onMouseEnter={() => handleInteraction(i, true)}
              onMouseLeave={() => handleInteraction(i, false)}
            >
              <div
                className={styles.projectHeader}
                role="button"
                tabIndex={0}
                onClick={() => {
                  if (window.innerWidth <= 768) return;
                  handleInteraction(i, activeIndex !== i);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    if (window.innerWidth <= 768) return;
                    handleInteraction(i, activeIndex !== i);
                  }
                }}
                aria-expanded={activeIndex === i}
                aria-controls={`project-content-${i}`}
              >
                <div className={styles.headerLeft}>
                  <span className={styles.projectNumber}>0{i + 1}</span>
                  <h3 className={`${styles.projectTitle} serif`}>{project.title}</h3>
                </div>
                <div className={styles.projectMeta}>
                  <span>{project.tag}</span>
                  <span>{project.year}</span>
                </div>
              </div>

              <div
                id={`project-content-${i}`}
                className={`project-content-${i} ${styles.projectContent}`}
                aria-hidden={activeIndex !== i}
              >
                <div className={styles.projectInfo}>
                  <p className={styles.projectDesc}>{project.desc}</p>
                  <a href={`${project.link}`} className={`${styles.exploreLink} interactive`}>
                    EXPLORE PROJECT
                    <span className={styles.arrow}>→</span>
                  </a>
                </div>
                <div className={styles.projectVisual}>
                  <Image
                    src={project.img}
                    alt={`Preview of ${project.title}`}
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'left' }}
                    className={styles.projectImage}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;
