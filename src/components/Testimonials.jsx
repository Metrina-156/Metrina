import React, { useState, useEffect } from 'react';

const Testimonials = () => {
  const quotes = [
    { text: "The architectural approach to the front-end was exactly what our brand needed. Alex is a true digital artisan.", author: "SOPHIA CHEN, CEO AT LUMINA" },
    { text: "Beyond just code, Alex understands the spatial relationship between design and user experience.", author: "MARCUS VANCE, CREATIVE DIRECTOR" },
    { text: "Technical mastery delivered with incredible precision. The performance gains were immediate.", author: "ELENA ROSSI, FOUNDER OF VORTEX" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="section-padding" style={{ textAlign: 'center', background: '#F0EEE9' }}>
      <div className="container" style={{
        maxWidth: '800px',
        backgroundColor: 'rgba(53, 181, 190, 0.6)',
        borderRadius: '30px',
        padding: '20px'
      }}>
        <div style={{ minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p className="serif" style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontStyle: 'italic',
            lineHeight: 1.2,
            marginBottom: '3rem',
            transition: 'opacity 0.5s ease',
          }}>
            "{quotes[currentIndex].text}"
          </p>
          <span style={{
            fontSize: '0.8rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            opacity: 0.5
          }}>
            {quotes[currentIndex].author}
          </span>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
