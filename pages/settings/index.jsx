import React from 'react';
import styles from './settings.module.css';

const Settings = () => {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>Settings</h1>
      </div>
      <div className={styles.form}>
        <div className={styles.inputGroup}>
          <span className={styles.iconUser}></span>
          <input type="text" placeholder="Name" className={styles.input} />
        </div>
        <div className={styles.inputGroup}>
          <span className={styles.iconLock}></span>
          <input
            type="email"
            placeholder="Update Email"
            className={styles.input}
          />
          <span className={styles.iconEye}></span>
        </div>
        <div className={styles.inputGroup}>
          <span className={styles.iconLock}></span>
          <input
            type="password"
            placeholder="Old Password"
            className={styles.input}
          />
          <span className={styles.iconEye}></span>
        </div>
        <div className={styles.inputGroup}>
          <span className={styles.iconLock}></span>
          <input
            type="password"
            placeholder="New Password"
            className={styles.input}
          />
          <span className={styles.iconEye}></span>
        </div>
        <button className={styles.updateButton}>Update</button>
      </div>
      <button className={styles.logoutButton}>
        <span className={styles.iconLogout}></span>
        Log out
      </button>
    </div>
  );
};

export default Settings;
