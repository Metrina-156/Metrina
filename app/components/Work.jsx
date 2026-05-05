'use client';

import React, { useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import styles from './Work.module.css';

const Work = () => {
  const projects = [
    { id: 1, title: "Lumina Studio", year: "2024", tag: "E-Commerce", desc: "A high-performance digital storefront for a boutique lighting brand. Built with Next.js and Three.js.", img: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop" },
    { id: 2, title: "Aether OS", year: "2023", tag: "System Design", desc: "A conceptual operating system interface focused on spatial computing and minimalism.", img: "https://images.unsplash.com/photo-1614332287897-cdc485fa562d?q=80&w=1000&auto=format&fit=crop" },
    { id: 3, title: "Vortex Labs", year: "2023", tag: "Web3", desc: "Data visualization platform for real-time blockchain analytics and node monitoring.", img: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1000&auto=format&fit=crop" }
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const handleMouseEnter = (index) => {
    if (window.innerWidth <= 768) return;
    setActiveIndex(index);
    gsap.to(`.project-content-${index}`, {
      height: 'auto',
      opacity: 1,
      duration: 1.5,
      ease: 'expo.out'
    });
  };

  const handleMouseLeave = (index) => {
    if (window.innerWidth <= 768) return;
    setActiveIndex(null);
    gsap.to(`.project-content-${index}`, {
      height: 0,
      opacity: 0,
      duration: 1.5,
      ease: 'expo.out'
    });
  };

  return (
    <section className={`${styles.section} section-padding`}>
      <div className="container">
        <h2 className={`serif ${styles.title}`}>Selected Works</h2>

        <div className={styles.accordionWrapper}>
          {projects.map((project, i) => (
            <div
              key={project.id}
              className={styles.projectRow}
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={() => handleMouseLeave(i)}
            >
              <div className={styles.projectHeader}>
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
                className={`project-content-${i} ${styles.projectContent}`}
                style={{
                  paddingBottom: activeIndex === i ? '4rem' : 0
                }}
              >
                <div className={styles.projectInfo}>
                  <p className={styles.projectDesc}>{project.desc}</p>
                  <a href="#" className={`${styles.exploreLink} interactive`}>EXPLORE PROJECT</a>
                </div>
                <div className={styles.projectVisual}>
                  <Image 
                    src={project.img} 
                    alt={project.title} 
                    fill 
                    style={{ objectFit: 'cover' }}
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
