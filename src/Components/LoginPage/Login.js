import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { setUserIdCookie } from '../Cookies/AuthServices.js';
import { useNavigate } from 'react-router-dom';
import Banner from '../Banner/Banner';
import './Login.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  const navigate = useNavigate();

  const handleUsernameChange = (value) => {
    setUsername(value);
    setUsernameError(value ? '' : 'Please enter your username');
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    setPasswordError(value ? '' : 'Please enter your password');
  };

  const handleLoginSuccess = async (userId) => {
    await setUserIdCookie(userId);
    navigate('/home-page');
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username) {
      setUsernameError('Please enter your username');
      return;
    }

    if (!password) {
      setPasswordError('Please enter your password');
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('https://nobles-dao-api-276edade8fdf.herokuapp.com/login', {
        email: username,
        password: password,
      });
      const userId = response.data.userId;
      handleLoginSuccess(userId);
      setLoggedIn(true);
    } catch (error) {
      console.error('Error logging in:', error);
      setLoginError('Invalid username or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAccount = () => {
    navigate("/create-account");
  };

  const bannerButtons = [
    { label: 'Create Account', link: '/create-account' }
  ];

  if (!loggedIn) {
    return (
      <div className="login-page">
        <Banner title="Log In" buttons={bannerButtons} />
        <div className="container">
          <h1>Log In</h1>
          {loginError && <p className="error-message">{loginError}</p>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => handleUsernameChange(e.target.value)}
              />
              {usernameError && <p className="error-message">{usernameError}</p>}
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => handlePasswordChange(e.target.value)}
              />
              {passwordError && <p className="error-message">{passwordError}</p>}
            </div>
            <button type="submit" className="capsule-button">
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>
          <p className="create-account-text" onClick={handleCreateAccount}>
            Don't have an account? <span>Click to create one</span>
          </p>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default LoginPage;
