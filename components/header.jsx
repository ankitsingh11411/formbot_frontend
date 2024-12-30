import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './header.module.css';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [username, setUsername] = useState('');
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
    localStorage.removeItem('token');
    navigate('/login');
  };

  useEffect(() => {
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

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

        setUsername(response.data.name);
      } catch (error) {
        console.error('Error fetching user info:', error);
        setUsername('');
      }
    };

    fetchUser();
  }, [navigate]);

  return (
    <header className={styles.header}>
      <div className={styles.workspaceContainer}>
        <span className={styles.workspaceName} onClick={toggleDropdown}>
          {username ? `${username}'s workspace` : 'Loading...'}
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
