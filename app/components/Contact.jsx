import React from 'react';
import styles from './Contact.module.css';

const Contact = () => {
  return (
    <section className={`${styles.section} section-padding`}>
      <div className="container">
        <div className={styles.availability}>
          <div className={styles.pulseDot}></div>
          <span className={styles.availabilityText}>AVAILABLE FOR Q3 2026</span>
        </div>

        <h2 className={`${styles.title} serif`}>
          Let&apos;s build something.
        </h2>

        <a href="mailto:hello@metrina.dev" className={`${styles.email} interactive`}>
          hello@metrina.dev
        </a>

        <div className={styles.socials}>
          <a href="#" className="interactive">LINKEDIN</a>
          <a href="#" className="interactive">GITHUB</a>
          <a href="#" className="interactive">X / TWITTER</a>
          <a href="#" className="interactive">DRIBBBLE</a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
