import noblesshieldblue from './noblesshieldblue.png';
import './CreateAccount.css';
import { useState } from 'react';
import axios from 'axios';

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
    if (value.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
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
      const response = await axios.post('http://localhost:3001/create_account', {
        email: username,
        password: password
      });

      console.log("User ID:", response.data.userId);
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setSubmitted(true);
      setErrorMessage(''); // Clear any previous error message
    } catch (error) {
      console.error("Error creating account:", error);
      if (error.response.data.error === "EMAIL_EXISTS") {
        setErrorMessage("This email is already in use."); // Set error message from backend
      } else {
        setErrorMessage("An error occurred while creating your account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const redirectToLoginPage = () => {
    console.log("Redirecting to login page...");
  };

  return (
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
            <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Submit'}</button>
          </form>
          <div className="logo-container">
            <img src={noblesshieldblue} alt="Nobles Shield Blue" className="nobles-shield-blue" />
          </div>
        </div>
      ) : (
        <div>
          <h1>Account Created</h1>
          <button onClick={redirectToLoginPage}>Go to Log In</button>
        </div>
      )}
    </div>
  );
}

export default CreateAccount;
