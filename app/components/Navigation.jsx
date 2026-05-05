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

  return (
    <>
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
        backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.75)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(10px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(0,0,0,0.05)' : 'none'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem' }}>
          <div className="nav-logo" style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => scrollToSection(null)}>
            <Image src="/vite.png" alt="Logo" width={45} height={45} style={{ height: '45px', width: 'auto' }} />
          </div>

          <div className="nav-name" style={{ mixBlendMode: 'difference' }}>
            <span
              className="serif interactive"
              onClick={() => scrollToSection(null)}
              style={{
                fontFamily: 'var(--font-heading)',
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

        <div className="desktop-nav" style={{
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

        <div className="mobile-nav-toggle" style={{ mixBlendMode: 'difference' }}>
          <button onClick={toggleMenu} className="interactive" style={{ color: 'white' }}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      <div style={{
        position: 'fixed',
        top: isScrolled ? '60px' : '85px',
        left: '4vw',
        right: '4vw',
        backgroundColor: 'rgba(248, 246, 241, 0.98)',
        backdropFilter: 'blur(20px)',
        zIndex: 998,
        display: isMenuOpen ? 'flex' : 'none',
        flexDirection: 'column',
        padding: '2.5rem 2rem',
        gap: '2rem',
        borderRadius: '20px',
        border: '1px solid rgba(0,0,0,0.08)',
        boxShadow: '0 30px 60px rgba(0,0,0,0.12)',
        transition: 'all 0.4s var(--transition-smooth)',
        opacity: isMenuOpen ? 1 : 0,
        transform: isMenuOpen ? 'translateY(0)' : 'translateY(-10px)'
      }}>
        <button onClick={() => scrollToSection('work')} className="serif interactive" style={{ fontSize: '1.4rem', color: '#1A1A1A', fontWeight: '700', textAlign: 'left', letterSpacing: '0.05em', background: 'transparent' }}>WORK</button>
        <button onClick={() => scrollToSection('about')} className="serif interactive" style={{ fontSize: '1.4rem', color: '#1A1A1A', fontWeight: '700', textAlign: 'left', letterSpacing: '0.05em', background: 'transparent' }}>ABOUT</button>
        <button onClick={() => scrollToSection('contact')} className="serif interactive" style={{ fontSize: '1.4rem', color: '#1A1A1A', fontWeight: '700', textAlign: 'left', letterSpacing: '0.05em', background: 'transparent' }}>CONTACT</button>
      </div>
    </>
  );
};

export default Navigation;
