import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Banner from '../Banner/Banner';
import './CreateAccount.css';

function CreateAccount() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const passwordCriteria = {
    length: password.length >= 8,
    capital: /[A-Z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const handleUsernameChange = (value) => {
    setUsername(value);
    if (!/nobles\.edu$/.test(value)) {
      setUsernameError("Please enter your Nobles email address");
    } else {
      setUsernameError('');
    }
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    const newPasswordCriteria = {
      length: value.length >= 8,
      capital: /[A-Z]/.test(value),
      number: /\d/.test(value),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(value),
    };
    const criteriaMet = Object.values(newPasswordCriteria).every(Boolean);
    if (!criteriaMet) {
      setPasswordError("Password does not meet all criteria");
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
    if (value !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (usernameError || passwordError || confirmPasswordError) {
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('https://nobles-dao-api-276edade8fdf.herokuapp.com/create_account', {
        email: username,
        password: password
      });

      console.log("User ID:", response.data.userId);
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setSubmitted(true);
      setErrorMessage(''); // Clear any previous error message
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      console.error("Error creating account:", error);
      if (error.response.data.error === "EMAIL_EXISTS") {
        setErrorMessage("This email is already in use."); // Set error message from backend
      } else {
        setErrorMessage("An error occurred while creating your account. Please try again.");
      }
    } finally {
      setLoading(false);
      //setTimeout(() => navigate('/login'), 2000);
    }
  };

  const redirectToLoginPage = () => {
    navigate('/login');
  };

  const bannerButtons = [
    { label: 'Log In', link: '/login' }
  ];

  return (
    <div className="create-account-page">
      <Banner title="Create Account" buttons={bannerButtons} />
      <div className="container">
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {!submitted ? (
          <div>
            <h1>Create Account</h1>
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
                <label htmlFor="password">Create a password:</label>
                <input 
                  type="password" 
                  id="password" 
                  name="password" 
                  placeholder="Enter your password" 
                  value={password}
                  onChange={(e) => handlePasswordChange(e.target.value)}
                />
                {passwordError && <p className="error-message">{passwordError}</p>}
                <ul className="password-criteria">
                  <li className={passwordCriteria.length ? 'valid' : 'invalid'}>
                    Contain at least 8 characters
                  </li>
                  <li className={passwordCriteria.capital ? 'valid' : 'invalid'}>
                    Contain both lower and uppercase letters
                  </li>
                  <li className={passwordCriteria.number ? 'valid' : 'invalid'}>
                    Contain at least one number
                  </li>
                  <li className={passwordCriteria.special ? 'valid' : 'invalid'}>
                    Contain at least one special character
                  </li>
                </ul>
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm password:</label>
                <input 
                  type="password" 
                  id="confirmPassword" 
                  name="confirmPassword" 
                  placeholder="Confirm your password" 
                  value={confirmPassword}
                  onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                />
                {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}
              </div>
              <button type="submit" className="capsule-button" disabled={loading}>
                {loading ? 'Loading...' : 'Submit'}
              </button>
            </form>
          </div>
        ) : (
          <div>
            <h1>Account Created, Redirecting to Login Page</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default CreateAccount;
