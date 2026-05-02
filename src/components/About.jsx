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
          {/* Robust photo visual */}
          <div style={{
            width: '100%',
            maxWidth: '400px',
            aspectRatio: '0.8',
            backgroundColor: '#e5e5e5',
            borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
            overflow: 'hidden',
            position: 'relative'
          }}>
            <div style={{
              width: '100%',
              height: '100%',
              background: `url(${aboutImage}) center/cover`,
              position: 'absolute',
              top: 0,
              left: 0
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
