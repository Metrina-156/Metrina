import React, { useEffect, useState } from 'react';
import SmoothScroll from './components/SmoothScroll';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import About from './components/About';
import SkillsOrbit from './components/SkillsOrbit';
import Work from './components/Work';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import gsap from 'gsap';
import viteLogo from './assets/vite.png';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    if (!id) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <SmoothScroll>
      <CustomCursor />

      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        padding: isScrolled ? '1rem 4vw' : '2rem 4vw',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 1000,
        transition: 'all 0.5s var(--transition-smooth)',
        background: '#FFF5B4',
        backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.75)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(0,0,0,0.05)' : 'none'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          {/* Logo Section - Fixed Colors */}
          <div className="nav-logo" style={{ display: 'flex', alignItems: 'center' }}>
            <img src={viteLogo} alt="Logo" style={{ height: '45px', width: 'auto', margin: 0, padding: 0, border: 0 }} />
          </div>

          {/* Name Section - Home Button */}
          <div className="nav-name" style={{ mixBlendMode: 'difference' }}>
            <span
              className="serif interactive"
              onClick={() => scrollToSection(null)}
              style={{
                fontFamily: 'Quintessential',
                fontSize: '1.5rem',
                fontWeight: '800',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#09f7bcff',
                lineHeight: 1,
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >METRINA</span>
          </div>
        </div>

        <div style={{
          display: 'flex',
          gap: '2rem',
          fontSize: '0.8rem',
          letterSpacing: '0.15em',
          fontWeight: '600',
          mixBlendMode: 'difference'
        }}>
          <button onClick={() => scrollToSection('work')} className="interactive nav-link">WORK</button>
          <button onClick={() => scrollToSection('about')} className="interactive nav-link">ABOUT</button>
          <button onClick={() => scrollToSection('contact')} className="interactive nav-link">CONTACT</button>
        </div>
      </nav>


      <main>
        <div id="home"><Hero /></div>
        <Marquee />
        <div id="about"><About /></div>
        <SkillsOrbit />
        <div id="work"><Work /></div>
        <Testimonials />
        <div id="contact"><Contact /></div>
      </main>


      <footer style={{
        padding: '2rem 4vw',
        borderTop: '1px solid rgba(0,0,0,0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '0.7rem',
        opacity: 0.4
      }}>
        <span>© 2026 METRINA</span>
        <span>DESIGNED BY METRINA</span>
      </footer>

    </SmoothScroll>
  );
}

export default App;
