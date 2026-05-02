import React from 'react';

const Marquee = () => {
  const items = ["STRATEGY", "DESIGN", "CODE", "DEPLOY"];
  
  return (
    <div className="marquee-wrapper" style={{
      background: '#EAE8E3',
      padding: '2rem 0',
      overflow: 'hidden',
      display: 'flex',
      whiteSpace: 'nowrap',
      borderTop: '1px solid rgba(0,0,0,0.05)',
      borderBottom: '1px solid rgba(0,0,0,0.05)'
    }}>
      <div className="marquee-content" style={{
        display: 'flex',
        animation: 'scroll 20s linear infinite'
      }}>
        {[...Array(10)].map((_, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
            {items.map((item, j) => (
              <React.Fragment key={j}>
                <span style={{ 
                  fontSize: '1.2rem', 
                  fontWeight: '700', 
                  letterSpacing: '0.2em',
                  margin: '0 2rem'
                }}>{item}</span>
                <span style={{ fontSize: '1.5rem', opacity: 0.3 }}>✦</span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}} />
    </div>
  );
};

export default Marquee;
