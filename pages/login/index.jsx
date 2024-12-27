import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        {
          email,
          password,
        }
      );
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Try again.');
    }
  };

  return (
    <div className={styles.logcontainer}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ←
      </button>
      <img src="/triangle2.png" alt="Triangle" className={styles.triangle} />
      <img src="/Ellipse 2.png" alt="Circle" className={styles.circle} />
      <img src="/Ellipse 1.png" alt="Circle2" className={styles.circle2} />
      <div className={styles.formContainer}>
        {error && <p className={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className={styles.inputContainer}>
            <label htmlFor="email" className={styles.label}>
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <div className={styles.inputContainer}>
            <label htmlFor="password" className={styles.label}>
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <button type="submit" className={styles.primaryButton}>
            Log In
          </button>
        </form>
        <div className={styles.divider}>
          <span>OR</span>
        </div>
        <button
          className={styles.googleButton}
          onClick={() => console.log('Google login')}
        >
          <img
            src="/GoogleIcon.png"
            alt="Google Icon"
            className={styles.googleIcon}
          />
          Sign In with Google
        </button>
        <p className={styles.text}>
          Don’t have an account?{' '}
          <span className={styles.link} onClick={() => navigate('/register')}>
            Register now
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
