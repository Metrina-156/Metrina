import React from 'react';
import styles from './Marquee.module.css';

const Marquee = () => {
  const items = ["STRATEGY", "DESIGN", "CODE", "DEPLOY"];
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        {[...Array(10)].map((_, i) => (
          <div key={i} className={styles.itemWrapper}>
            {items.map((item, j) => (
              <React.Fragment key={j}>
                <span className={styles.item}>{item}</span>
                <span className={styles.glyph}>✦</span>
              </React.Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
