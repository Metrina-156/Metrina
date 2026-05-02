import React, { useState, useMemo } from 'react';

const SkillsOrbit = () => {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const particles = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => {
      // Use polar coordinates to place particles outside a central elliptical radius
      const angle = Math.random() * Math.PI * 2;
      // Start from radius 0.6 (60% out from center) to 1.2 (120% out)
      const radius = 0.6 + Math.random() * 0.6;

      return {
        id: i,
        tx: (Math.random() - 0.5) * 150, // Reduced translation so they don't drift back into center
        ty: (Math.random() - 0.5) * 150,
        tz: (Math.random() - 0.5) * 800,
        dur: Math.random() * 15 + 10,
        delay: Math.random() * -20,
        top: 50 + Math.sin(angle) * (50 * radius),
        left: 50 + Math.cos(angle) * (50 * radius),
        size: Math.random() * 3 + 1,
      };
    });
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
    <section className="inverted section-padding" style={{
      overflow: 'hidden',
      textAlign: 'center',
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <div className="container">
        <h2 className="serif" style={{ fontSize: '3rem', marginBottom: '10vh' }}>Core Arsenal</h2>

        <div className="orbit-container" style={{
          position: 'relative',
          height: '600px',
          perspective: '1000px',
          marginBottom: '5vh',
          transformStyle: 'preserve-3d'
        }}>
          {/* 3D Particles Background */}
          <div className="particles-container" style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d',
            zIndex: -1
          }}>
            {particles.map((p) => (
              <div
                key={`particle-${p.id}`}
                className="particle"
                style={{
                  '--tx': `${p.tx}px`,
                  '--ty': `${p.ty}px`,
                  '--tz': `${p.tz}px`,
                  '--anim-dur': `${p.dur}s`,
                  '--anim-delay': `${p.delay}s`,
                  position: 'absolute',
                  top: `${p.top}%`,
                  left: `${p.left}%`,
                  width: `${p.size}px`,
                  height: `${p.size}px`,
                  backgroundColor: 'rgba(255,255,255,0.6)',
                  borderRadius: '50%',
                  boxShadow: '0 0 10px rgba(255,255,255,0.3)'
                }}
              />
            ))}
          </div>

          {/* Central Tooltip */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            opacity: hoveredSkill ? 1 : 0,
            transition: 'opacity 0.3s ease',
            pointerEvents: 'none'
          }}>
            <span style={{
              fontSize: '2rem',
              color: 'var(--accent-color)',
              fontWeight: '700'
            }}>{hoveredSkill}</span>
          </div>

          <div className="orbit-ring" style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d',
            transform: 'rotateX(75deg)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            {/* The Ring Visual */}
            <div style={{
              width: '500px',
              height: '500px',
              border: '1px dashed rgba(255,255,255,0.2)',
              borderRadius: '50%',
              position: 'absolute',
              pointerEvents: 'none'
            }}></div>

            {primarySkills.map((skill, i) => {
              const angle = (i / primarySkills.length) * Math.PI * 2;
              return (
                <div
                  key={i}
                  className="orbit-item"
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  style={{
                    position: 'absolute',
                    transformStyle: 'preserve-3d',
                    animation: 'orbitRotate 20s linear infinite',
                    animationDelay: `-${(i * 20) / primarySkills.length}s`
                  }}
                >
                  <div style={{
                    width: '70px',
                    height: '70px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2.0rem',
                    cursor: 'pointer',
                    transform: 'rotateX(-75deg)' /* Counteract ring tilt to keep icons flat */
                  }}>
                    {skill.icon}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Horizontal Chip Scroll */}
        <div className="secondary-skills" style={{
          marginTop: '5vh',
          display: 'flex',
          gap: '1rem',
          overflowX: 'auto',
          padding: '2rem 0',
          scrollbarWidth: 'none'
        }}>
          {secondarySkills.map((skill, i) => (
            <div key={i} style={{
              flex: '0 0 auto',
              padding: '0.6rem 1.2rem',
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '100px',
              fontSize: '0.8rem',
              color: 'rgba(255,255,255,0.6)'
            }}>
              {skill}
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .particle {
          animation: floatParticle var(--anim-dur) ease-in-out infinite alternate var(--anim-delay);
        }
        @keyframes floatParticle {
          0% { transform: translate3d(0, 0, 0); opacity: 0.1; }
          50% { opacity: 0.8; }
          100% { transform: translate3d(var(--tx), var(--ty), var(--tz)); opacity: 0.1; }
        }
        @keyframes orbitRotate {
          0% { transform: rotateZ(0deg) translateX(250px) rotateZ(0deg); }
          100% { transform: rotateZ(360deg) translateX(250px) rotateZ(-360deg); }
        }
        .orbit-container:hover .orbit-item {
          animation-play-state: paused;
        }
        .secondary-skills::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 768px) {
          .orbit-container {
            display: none;
          }
          .secondary-skills {
            flex-wrap: wrap;
            justify-content: center;
          }
        }
      `}} />
    </section>
  );
};

export default SkillsOrbit;
