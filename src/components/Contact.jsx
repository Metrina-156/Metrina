import React from 'react';

const Contact = () => {
  return (
    <section className="section-padding contact-section" style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'center',
      textAlign: 'center',
      position: 'relative'
    }}>
      <div className="container">
        <div className="availability" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '0.8rem',
          marginBottom: '2rem'
        }}>
          <div className="pulse-dot" style={{
            width: '8px',
            height: '8px',
            background: '#00D1FF', /* Pulsing Cyan/Green */
            borderRadius: '50%',
            boxShadow: '0 0 0 rgba(0, 209, 255, 0.4)',
            animation: 'pulse 2s infinite'
          }}></div>
          <span style={{ fontSize: '0.8rem', letterSpacing: '0.1em', opacity: 0.6 }}>AVAILABLE FOR Q3 2026</span>
        </div>

        <h2 className="serif" style={{ fontSize: 'clamp(40px, 8vw, 100px)', marginBottom: '3rem' }}>
          Let's build something.
        </h2>

        <a href="mailto:hello@metrina.dev" className="interactive" style={{
          fontSize: 'clamp(24px, 3vw, 40px)',
          color: 'var(--accent-color)',
          fontWeight: '500',
          borderBottom: '2px solid var(--accent-color)'
        }}>
          hello@metrina.dev
        </a>

        <div className="socials contact-socials" style={{ 
          marginTop: '10vh', 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '3rem',
          opacity: 0.6,
          fontSize: '0.9rem'
        }}>
          <a href="#" className="interactive">LINKEDIN</a>
          <a href="#" className="interactive">GITHUB</a>
          <a href="#" className="interactive">X / TWITTER</a>
          <a href="#" className="interactive">DRIBBBLE</a>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0px rgba(0, 209, 255, 0.7); }
          70% { box-shadow: 0 0 0 10px rgba(0, 209, 255, 0); }
          100% { box-shadow: 0 0 0 0px rgba(0, 209, 255, 0); }
        }
        @media (max-width: 768px) {
          .contact-section {
            min-height: auto !important;
            padding: 80px 0 !important;
          }
          .contact-socials {
            margin-top: 60px !important;
            flex-wrap: wrap;
            gap: 1.5rem !important;
          }
        }
      `}} />
    </section>
  );
};

export default Contact;
