'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const scrollToSection = (id) => {
    if (window.lenis) {
      if (!id) {
        window.lenis.scrollTo(0);
      } else {
        window.lenis.scrollTo(`#${id}`);
      }
    } else {
      if (!id) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const navTheme = isScrolled ? {
    bg: 'rgba(15, 15, 15, 0.9)',
    text: 'var(--dark-text)',
    border: 'rgba(255,255,255,0.05)',
    logoColor: 'var(--accent-color)'
  } : {
    bg: 'transparent',
    text: 'var(--text-color)',
    border: 'transparent',
    logoColor: 'var(--text-color)'
  };

  return (
    <>
      <nav 
        aria-label="Main navigation"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          padding: isScrolled ? '1.2rem 6vw' : '2.5rem 6vw',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 1000,
          transition: 'all 0.6s var(--transition-smooth)',
          backgroundColor: navTheme.bg,
          backdropFilter: isScrolled ? 'blur(12px)' : 'none',
          borderBottom: `1px solid ${navTheme.border}`
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <button 
            className="interactive"
            aria-label="Go to home"
            onClick={() => scrollToSection(null)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}
          >
            <Image 
              src="/vite.png" 
              alt="" 
              width={38} 
              height={38} 
              style={{ height: '38px', width: 'auto' }} 
            />
            <span
              className="serif"
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.4rem',
                fontWeight: '800',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: navTheme.logoColor,
                lineHeight: 1,
                transition: 'color 0.4s var(--transition-smooth)'
              }}
            >
              METRINA
            </span>
          </button>
        </div>

        <div className="desktop-nav" style={{
          display: 'flex',
          gap: '3rem',
          alignItems: 'center'
        }}>
          <button onClick={() => scrollToSection('work')} className="interactive nav-link" style={{ color: navTheme.text }}>WORK</button>
          <button onClick={() => scrollToSection('about')} className="interactive nav-link" style={{ color: navTheme.text }}>ABOUT</button>
          <button onClick={() => scrollToSection('contact')} className="interactive nav-link" style={{ color: navTheme.text }}>CONTACT</button>
        </div>

        <div className="mobile-nav-toggle" style={{ display: 'none' }}>
          <button 
            onClick={toggleMenu} 
            className="interactive" 
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            style={{ color: navTheme.text }}
          >
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      <div 
        id="mobile-menu"
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'var(--dark-bg)',
          zIndex: 998,
          display: isMenuOpen ? 'flex' : 'none',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2.5rem',
          gap: '3rem',
          transition: 'opacity 0.4s var(--transition-smooth)',
          opacity: isMenuOpen ? 1 : 0,
          pointerEvents: isMenuOpen ? 'auto' : 'none'
        }}
      >
        <button onClick={() => scrollToSection('work')} className="serif interactive" style={{ fontSize: '3rem', color: 'var(--dark-text)', fontWeight: '400', letterSpacing: '0.05em' }}>WORK</button>
        <button onClick={() => scrollToSection('about')} className="serif interactive" style={{ fontSize: '3rem', color: 'var(--dark-text)', fontWeight: '400', letterSpacing: '0.05em' }}>ABOUT</button>
        <button onClick={() => scrollToSection('contact')} className="serif interactive" style={{ fontSize: '3rem', color: 'var(--dark-text)', fontWeight: '400', letterSpacing: '0.05em' }}>CONTACT</button>
      </div>
    </>
  );
};

export default Navigation;
