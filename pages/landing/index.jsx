import React from 'react';
import styles from './LandingPage.module.css';

const LandingPage = () => {
  return (
    <div className={styles.landing_container}>
      <header className={styles.header}>
        <div className={styles.logo}>FormBot</div>
        <div className={styles.header_buttons}>
          <button className={styles.btn}>Sign in</button>
          <button className={`${styles.btn} ${styles.btn_primary}`}>
            Create a FormBot
          </button>
        </div>
      </header>

      <main className={styles.main_content}>
        <div className={styles.hero}>
          <h1>Build advanced chatbots visually</h1>
          <p>
            Typebot gives you powerful tools to create unique chat experiences.
            Embed them anywhere on your web/mobile apps and start collecting
            results like magic.
          </p>
          <button className={`${styles.btn} ${styles.btn_large}`}>
            Create a FormBot for free
          </button>
        </div>

        <div className={styles.chatbot_preview}>
          <img src="/formpreview.png" alt="Chatbot Preview" />
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footer_content}>
          <div className={styles.logohead}>
            <h2>FormBot</h2>
            Made with ♥ by{' '}
            <a href="http://example.com" target="_blank">
              Cuvette
            </a>
          </div>

          <div className={styles.product}>
            <h2>Product</h2>
            <p>Status</p>
            <p>Documentation</p>
            <p>Roadmap</p>
            <p>Pricing</p>
          </div>

          <div className={styles.community}>
            <h2>Community</h2>
            <p>Discord</p>
            <p>Github Repository</p>
            <p>Twitter</p>
            <p>Linkedin</p>
            <p>OSS Friends</p>
          </div>

          <div className={styles.company}>
            <h2>Company</h2>
            <p>About</p>
            <p>Contact</p>
            <p>Terms of Service</p>
            <p>Privacy Policy</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
