import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import aboutImage from '../assets/about-image.png';

const About = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    gsap.to(textRef.current, {
      y: -50,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  }, []);

  return (
    <section ref={containerRef} className="section-padding" style={{ position: 'relative' }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.2fr',
        gap: '8vw',
        alignItems: 'center'
      }}>
        <div className="about-visual">
          <div style={{
            width: '100%',
            aspectRatio: '10/5',
            background: '#EAE8E3',
            clipPath: 'path("M20,50 C20,20 50,10 80,30 C110,50 90,90 50,90 C10,90 20,70 20,50 Z")',
            backgroundColor: '#ddd', /* Placeholder for photo */
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.8rem',
            color: '#888',
            transform: 'scale(5)' /* SVG path scale adjustment */
          }}>
            {/* Organic blob SVG clip-path placeholder */}
            <svg width="0" height="0">
              <defs>
                <clipPath id="blob" clipPathUnits="objectBoundingBox">
                  <path d="M0.8,0.3C0.9,0.5,0.8,0.8,0.6,0.9C0.4,1,0.1,0.9,0,0.7C-0.1,0.5,0.1,0.2,0.3,0.1C0.5,0,0.7,0.1,0.8,0.3Z" />
                </clipPath>
              </defs>
            </svg>
            <div style={{
              width: '100%',
              height: '100%',
              background: 'linear-gradient(45deg, #eee, #ccc)',
              clipPath: 'url(#blob)',
              transform: 'scale(10)'
            }}></div>
          </div>

          {/* Re-writing visual to be more robust */}
          <div style={{
            width: '100%',
            maxWidth: '400px',
            aspectRatio: '0.8',
            backgroundColor: '#e5e5e5',
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            overflow: 'hidden'
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              background: `url(${aboutImage}) center/cover`
            }}></div>
          </div>
        </div>

        <div className="about-text" ref={textRef}>
          <p className="serif" style={{
            fontSize: 'clamp(24px, 2.5vw, 32px)',
            lineHeight: 1.4,
            marginBottom: '3rem'
          }}>
            I believe that digital products should be as much a piece of architecture as they are a piece of code. My philosophy is rooted in the intersection of structural discipline and creative fluidly.
          </p>

          <div className="stats about-stats" style={{ display: 'flex', gap: '2rem' }}>
            <div className="stat-pill" style={{
              padding: '0.8rem 1.5rem',
              border: '1px solid rgba(0,0,0,0.1)',
              borderRadius: '100px',
              fontSize: '0.9rem'
            }}>
              <strong>8+</strong> Years Experience
            </div>
            <div className="stat-pill" style={{
              padding: '0.8rem 1.5rem',
              border: '1px solid rgba(0,0,0,0.1)',
              borderRadius: '100px',
              fontSize: '0.9rem'
            }}>
              <strong>50+</strong> Projects Shipped
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        @media (max-width: 768px) {
          .container {
            grid-template-columns: 1fr !important;
          }
          .about-visual {
            order: 2;
            margin-top: 3rem;
          }
          .about-stats {
            flex-direction: column;
            gap: 1rem !important;
          }
          .stat-pill {
            width: fit-content;
          }
        }
      `}} />
    </section>
  );
};

export default About;
