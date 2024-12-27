import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './header.module.css';

const Header = ({ username }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      document.body.setAttribute('data-theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  const handleSettingsClick = () => {
    navigate('/settings');
  };

  const handleLogoutClick = () => {
    alert('Logged out');
    navigate('/login');
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <header className={styles.header}>
      <div className={styles.workspaceContainer}>
        <span className={styles.workspaceName} onClick={toggleDropdown}>
          {username}'s workspace
          <span className={styles.arrow}>{isDropdownOpen ? '▲' : '▼'}</span>
        </span>
        {isDropdownOpen && (
          <div className={styles.dropdown}>
            <div className={styles.option} onClick={handleSettingsClick}>
              Settings
            </div>
            <div
              className={`${styles.option} ${styles.logout}`}
              onClick={handleLogoutClick}
            >
              Log Out
            </div>
          </div>
        )}
      </div>
      <div className={styles.actions}>
        <div className={styles.themeToggle}>
          <span className={styles.label}>Light</span>
          <div className={styles.switch} onClick={toggleTheme}>
            <div
              className={`${styles.slider} ${
                isDarkMode ? styles.dark : styles.light
              }`}
            />
          </div>
          <span className={styles.label}>Dark</span>
        </div>
        <button className={styles.shareButton}>Share</button>
      </div>
    </header>
  );
};

export default Header;
