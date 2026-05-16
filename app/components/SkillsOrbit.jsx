'use client';

import React, { useState, useEffect, useMemo } from 'react';
import styles from './SkillsOrbit.module.css';

const SkillsOrbit = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const generatedParticles = Array.from({ length: 60 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const radius = 0.6 + Math.random() * 0.8;
      return {
        id: i,
        tx: (Math.random() - 0.5) * 150,
        ty: (Math.random() - 0.5) * 150,
        tz: (Math.random() - 0.5) * 500,
        dur: Math.random() * 10 + 10,
        delay: Math.random() * -20,
        top: 50 + Math.sin(angle) * (50 * radius),
        left: 50 + Math.cos(angle) * (50 * radius),
        size: Math.random() * 3 + 1,
      };
    });
    setParticles(generatedParticles);
  }, []);

  const primarySkills = [
    { name: "React", icon: "⚛️" },
    { name: "Three.js", icon: "🧊" },
    { name: "GSAP", icon: "🪄" },
    { name: "Node.js", icon: "🟢" },
    { name: "TypeScript", icon: "TS" },
    { name: "CSS 3D", icon: "📐" }
  ];

  const secondarySkills = [
    "Vite", "Next.js", "GraphQL", "Framer Motion", "WebGL", "SQL", "Docker", "AWS", "Python", "Tailwind"
  ];

  return (
    <section className={`inverted ${styles.section} section-padding`} aria-labelledby="skills-title">
      <div className="container">
        <h2 id="skills-title" className={`serif ${styles.title}`}>Core Arsenal</h2>

        <div className={styles.orbitContainer}>
          <div className={styles.particlesContainer} aria-hidden="true">
            {particles.map((p) => (
              <div
                key={`particle-${p.id}`}
                className={styles.particle}
                style={{
                  '--tx': `${p.tx}px`,
                  '--ty': `${p.ty}px`,
                  '--tz': `${p.tz}px`,
                  '--anim-dur': `${p.dur}s`,
                  '--anim-delay': `${p.delay}s`,
                  top: `${p.top}%`,
                  left: `${p.left}%`,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                }}
              />
            ))}
          </div>

          <div className={styles.tooltip} aria-live="polite">
            <span className={styles.tooltipText}>{hoveredSkill || ""}</span>
          </div>

          <div className={styles.orbitRing}>
            <div className={styles.ringVisual}></div>

            {primarySkills.map((skill, i) => (
              <button
                key={i}
                className={`${styles.orbitItem} interactive`}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                onFocus={() => setHoveredSkill(skill.name)}
                onBlur={() => setHoveredSkill(null)}
                aria-label={skill.name}
                style={{
                  '--anim-delay': `-${(i * 20) / primarySkills.length}s`
                }}
              >
                <span className={`${styles.skillIcon} ${skill.name === 'TypeScript' ? styles.tsIcon : ''}`} aria-hidden="true">
                  {skill.icon}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.secondarySkills}>
          {secondarySkills.map((skill, i) => (
            <span key={i} className={styles.secondarySkill}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsOrbit;
