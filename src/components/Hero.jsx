import React, { useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import heroBg from '../assets/hero-bg.png';

const Hero = () => {
  const containerRef = useRef(null);

  return (
    <section ref={containerRef} className="hero" style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      backgroundImage: `url(${heroBg})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat'
    }}>
      {/* Subtle Overlay to ensure text readability */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(248, 246, 241, 0.4)', // Warm off-white overlay at 40%
        zIndex: 0
      }}></div>

      <div className="container" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        position: 'relative',
        zIndex: 2
      }}>
        <div className="hero-content" style={{ zIndex: 2, textAlign: 'center' }}>
          <h1 className="serif" style={{
            fontSize: 'clamp(30px, 12vw, 75px)',
            lineHeight: 1.2,
            textTransform: 'uppercase',
            display: 'flex',
            flexDirection: 'column',
            letterSpacing: '-0.02em',
            fontWeight: '450',
            wordSpacing: '15px',
            paddingTop: '50px'
          }}>
            <span>your  brand  deserves  a  Digital  Presence</span>
          </h1>

          <div className="role-container" style={{ marginTop: '2rem' }}>
            <p className="typewriter" style={{
              fontFamily: 'Magnolia Script',
              fontSize: 'clamp(1.2rem, 2vw, 2rem)',
              color: '#62a092ff',
              minHeight: '1.5em',
              letterSpacing: '0.1em',
              fontWeight: '500'
            }}>
              Crafting fast, beautiful websites that grow your business
            </p>
          </div>

          <button
            className="interactive hero-cta"
            onClick={() => {
              const el = document.getElementById('work');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              fontFamily: 'Montserrat',
              marginTop: '4rem',
              padding: '1.2rem 3.5rem',
              borderRadius: '20px',
              textTransform: 'uppercase',
              letterSpacing: '0.2em',
              fontSize: '1.1rem',
              fontWeight: '800',
              transition: 'all 0.4s var(--transition-smooth)',
              background: 'rgba(32, 231, 205, 0.82)',
              color: 'var(--text-color)',
              position: 'relative',
              zIndex: 1
            }}
          >
            View Work
          </button>
        </div>
      </div>

      {/* Scroll Arrow Indicator */}
      <div className="scroll-indicator" style={{
        position: 'absolute',
        bottom: '2rem',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 2,
        opacity: 0.5,
        color: 'var(--text-color)'
      }}>
        <ChevronDown size={32} strokeWidth={1} className="bounce-arrow" />
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .hero-cta:hover {
          background-color: #000000 !important;
          color: #ffffff !important;
          border-color: #000000 !important;
        }
        .bounce-arrow {
          animation: bounce 2s infinite;
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {transform: translateX(-50%) translateY(0);}
          40% {transform: translateX(-50%) translateY(-10px);}
          60% {transform: translateX(-50%) translateY(-5px);}
        }
        @media (max-width: 768px) {
          .hero-content h1 {
            word-spacing: 5px !important;
            padding-top: 20px !important;
            line-height: 1.1 !important;
          }
          .hero-content h1 span {
            margin-left: 0 !important;
          }
          .hero-cta {
            padding: 1rem 2.5rem !important;
            font-size: 0.9rem !important;
          }
        }
      `}} />
    </section >
  );
};

export default Hero;
