import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './header.module.css';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setIsDarkMode(savedTheme === 'dark');
    document.body.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      document.body.setAttribute('data-theme', newMode ? 'dark' : 'light');
      return newMode;
    });
  };

  const handleSettingsClick = () => navigate('/settings');

  const handleLogoutClick = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (!event.target.closest(`.${styles.workspaceContainer}`)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleOutsideClick);
    return () => document.removeEventListener('click', handleOutsideClick);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        const response = await axios.get('http://localhost:5000/api/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsername(response.data.name || 'Guest');
      } catch (error) {
        console.error('Error fetching user info:', error);
        setUsername('Guest');
      }
    };
    fetchUser();
  }, [navigate]);

  return (
    <header className={styles.header}>
      <div className={styles.workspaceContainer}>
        <span
          className={styles.workspaceName}
          onClick={toggleDropdown}
          aria-label="Workspace Options"
        >
          {username ? `${username}'s workspace` : 'Loading...'}
          <span className={styles.arrow}>{isDropdownOpen ? '▲' : '▼'}</span>
        </span>
        {isDropdownOpen && (
          <div className={styles.dropdown}>
            <div
              className={styles.option}
              onClick={handleSettingsClick}
              role="button"
            >
              Settings
            </div>
            <div
              className={`${styles.option} ${styles.logout}`}
              onClick={handleLogoutClick}
              role="button"
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
