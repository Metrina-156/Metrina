'use client';

import React, { useState } from 'react';
import gsap from 'gsap';
import Image from 'next/image';
import styles from './Work.module.css';

const Work = () => {
  const projects = [
    { id: 1, title: "Lumina Studio", year: "2024", tag: "E-Commerce", desc: "A high-performance digital storefront for a boutique lighting brand. Built with Next.js and Three.js.", img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop" },
    { id: 2, title: "Aether OS", year: "2023", tag: "System Design", desc: "A conceptual operating system interface focused on spatial computing and minimalism.", img: "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?q=80&w=1000&auto=format&fit=crop" },
    { id: 3, title: "Vortex Labs", year: "2023", tag: "Web3", desc: "Data visualization platform for real-time blockchain analytics and node monitoring.", img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1000&auto=format&fit=crop" }
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
                  <a href="#" className={`${styles.exploreLink} interactive`}>
                    EXPLORE PROJECT
                    <span className={styles.arrow}>→</span>
                  </a>
                </div>
                <div className={styles.projectVisual}>
                  <Image 
                    src={project.img} 
                    alt={`Preview of ${project.title}`} 
                    fill 
                    style={{ objectFit: 'cover' }}
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
