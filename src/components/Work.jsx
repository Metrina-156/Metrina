import React, { useState } from 'react';
import gsap from 'gsap';

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
    <section className="section-padding">
      <div className="container">
        <h2 className="serif" style={{ fontSize: '3rem', marginBottom: '5vh' }}>Selected Works</h2>

        <div className="accordion-wrapper" style={{ borderTop: '1px solid rgba(0,0,0,0.1)' }}>
          {projects.map((project, i) => (
            <div
              key={project.id}
              className="project-row"
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={() => handleMouseLeave(i)}
              style={{
                borderBottom: '1px solid rgba(0,0,0,0.1)',
                cursor: 'pointer',
                overflow: 'hidden'
              }}
            >
              <div className="project-header" style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '2rem 0',
                transition: 'padding 0.3s ease'
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '2rem' }}>
                  <span style={{ fontSize: '0.8rem', opacity: 0.4 }}>0{i + 1}</span>
                  <h3 className="serif" style={{ fontSize: '2.5rem' }}>{project.title}</h3>
                </div>
                <div className="project-meta" style={{ display: 'flex', gap: '4rem', opacity: 0.6, fontSize: '0.9rem' }}>
                  <span>{project.tag}</span>
                  <span>{project.year}</span>
                </div>
              </div>

              <div
                className={`project-content-${i} project-expandable-content`}
                style={{
                  height: 0,
                  opacity: 0,
                  overflow: 'hidden',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1.5fr',
                  gap: '4vw',
                  paddingBottom: activeIndex === i ? '4rem' : 0
                }}
              >
                <div className="project-info" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <p style={{ fontSize: '1.1rem', marginBottom: '2rem', maxWidth: '400px' }}>{project.desc}</p>
                  <a href="#" className="interactive" style={{
                    alignSelf: 'flex-start',
                    borderBottom: '1px solid var(--accent-color)',
                    paddingBottom: '2px',
                    color: 'var(--accent-color)',
                    fontSize: '0.9rem',
                    fontWeight: '600'
                  }}>EXPLORE PROJECT</a>
                </div>
                <div className="project-visual" style={{
                  height: '400px',
                  background: `url(${project.img}) center/cover`,
                  borderRadius: '4px'
                }}></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .project-row:hover .project-header {
          padding: 3rem 0 1rem 0;
        }
        @media (max-width: 768px) {
          .project-expandable-content {
            height: auto !important;
            opacity: 1 !important;
            grid-template-columns: 1fr !important;
            padding-bottom: 3rem !important;
          }
          .project-visual {
            height: 250px !important;
            order: -1;
          }
          .project-meta {
            display: none !important;
          }
          .project-header h3 {
            font-size: 1.8rem !important;
          }
        }
      `}} />
    </section>
  );
};

export default Work;
