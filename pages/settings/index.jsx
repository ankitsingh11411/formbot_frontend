import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './settings.module.css';

const Settings = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();
  const handleUpdate = async () => {
    if (!name && !email && !oldPassword && !newPassword) {
      alert('Please fill out at least one field to update.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const body = { name, email, oldPassword, newPassword };

      const response = await axios.put(
        'http://localhost:5000/api/auth/update',
        body,
        config
      );
      if (response.data.message) {
        alert(response.data.message);
      } else {
        alert('Update successful!');
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        alert('An unexpected error occurred');
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1>Settings</h1>
      </div>
      <div className={styles.form}>
        <div className={styles.inputGroup}>
          <span className={styles.iconUser}></span>
          <input
            type="text"
            placeholder="Name"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <span className={styles.iconLock}></span>
          <input
            type="email"
            placeholder="Update Email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <span className={styles.iconLock}></span>
          <input
            type="password"
            placeholder="Old Password"
            className={styles.input}
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div className={styles.inputGroup}>
          <span className={styles.iconLock}></span>
          <input
            type="password"
            placeholder="New Password"
            className={styles.input}
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <button className={styles.updateButton} onClick={handleUpdate}>
          Update
        </button>
      </div>
      <div className={styles.logoutdiv}>
        <button className={styles.logoutButton} onClick={handleLogout}>
          <span className={styles.iconLogout}></span>
          Log out
        </button>
      </div>
    </div>
  );
};

export default Settings;
