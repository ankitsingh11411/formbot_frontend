import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './register.module.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        username,
        email,
        password,
      });
      navigate('/login');
    } catch (err) {
      setError(
        err.response?.data?.message || 'Registration failed. Try again.'
      );
    }
  };

  return (
    <div className={styles.regContainer}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ←
      </button>
      <img src="/triangle2.png" alt="Triangle" className={styles.triangle} />
      <img src="/Ellipse 2.png" alt="Circle" className={styles.circle} />
      <img src="/Ellipse 1.png" alt="Circle2" className={styles.circle2} />
      <div className={styles.formContainer}>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter a username"
              value={formData.username}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.field}>
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
          <button type="submit" className={styles.primaryButton}>
            Sign Up
          </button>
        </form>
        <div className={styles.divider}>
          <span>OR</span>
        </div>
        <button
          className={styles.googleButton}
          onClick={() => console.log('Google signup')}
        >
          <img
            src="/GoogleIcon.png"
            alt="Google Icon"
            className={styles.googleIcon}
          />
          Sign Up with Google
        </button>
        <p className={styles.text}>
          Already have an account?{' '}
          <span className={styles.link} onClick={() => navigate('/login')}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
