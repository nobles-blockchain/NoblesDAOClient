import './Login.css';
import { useState } from 'react';
import axios from 'axios';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleUsernameChange = (value) => {
    setUsername(value);
    setUsernameError(value ? '' : 'Please enter your username');
  };

  const handlePasswordChange = (value) => {
    setPassword(value);
    setPasswordError(value ? '' : 'Please enter your password');
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
      const response = await axios.post('http://localhost:3001/login', {
        email: username,
        password: password,
      });

      console.log('User ID:', response.data.userId);
      setLoggedIn(true);
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Error logging in:', error);
      setLoginError('Invalid username or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!loggedIn) {
    return (
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
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
      </div>
    );
  } else {
    return (
      <div className="container">
        <h1>Welcome, {username}!</h1>
        <p>You have successfully logged in.</p>
      </div>
    );
  }
}

export default LoginPage;
