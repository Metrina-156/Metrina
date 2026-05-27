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

        <a href="/request-info" className={`${styles.ctaButton} interactive`}>
          Request info
        </a>

        <div className={styles.socials}>
          <a href="https://www.linkedin.com/company/metrina-tech/" className="interactive">LINKEDIN</a>
          <a href="https://x.com/metrina_tech" className="interactive">X / TWITTER</a>
          <a href="https://www.instagram.com/metrina.tech" className="interactive">INSTAGRAM</a>
          <a href="mailto:gopalan@metrina.tech" className="interactive">EMAIL</a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
