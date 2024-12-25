import React from 'react';
import styles from './LandingPage.module.css';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleCreateFormbotClick = () => {
    navigate('/register');
  };

  return (
    <div className={styles.landing_container}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <img src="/fbotlogo.png" alt="FormBot Logo" />
          FormBot
        </div>
        <div className={styles.header_buttons}>
          <button className={styles.btn} onClick={handleLoginClick}>
            Sign in
          </button>
          <button
            className={`${styles.btn} ${styles.btn_primary}`}
            onClick={handleCreateFormbotClick}
          >
            Create a FormBot
          </button>
        </div>
      </header>

      <main className={styles.main_content}>
        <div className={styles.hero}>
          <div className={styles.herotexts}>
            <h1>Build advanced chatbots visually</h1>
            <p>
              Typebot gives you powerful tools to create unique chat
              experiences. Embed them anywhere on your web/mobile apps and start
              collecting results like magic.
            </p>
            <button
              className={`${styles.btn} ${styles.btn_large}`}
              onClick={handleCreateFormbotClick}
            >
              Create a FormBot for free
            </button>
          </div>
        </div>

        <div className={styles.chatbot_preview}>
          <img src="/formpreview.png" alt="Chatbot Preview" />
        </div>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footer_content}>
          <div></div>
          <div className={styles.logohead}>
            <h2>
              <img
                src="/fbotlogo.png"
                alt="FormBot Logo"
                className={styles.logo_image}
              />
              FormBot
            </h2>
            Made with ♥ by{' '}
            <a
              href="http://example.com"
              target="_blank"
              rel="noopener noreferrer"
            >
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
