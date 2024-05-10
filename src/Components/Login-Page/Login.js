import './Login.css';
import { useState } from 'react'; // Import useState hook for managing state
import axios from 'axios'; // Import Axios for making HTTP requests
import {setUserIdCookie, getUserIdFromCookie, removeUserIdCookie} from '../Cookies/AuthServices.js';
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';



function LoginPage({history}) {
  // State variables to store username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false); // State variable for loading state
  const [loggedIn, setLoggedIn] = useState(false); // State variable for login status

  // Function to handle username validation
  const handleUsernameChange = (value) => {
    setUsername(value);
    if (!value) {
      setUsernameError('Please enter your username');
    } else {
      setUsernameError('');
    }
  };

  // Function to handle password validation
  const handlePasswordChange = (value) => {
    setPassword(value);
    if (!value) {
      setPasswordError('Please enter your password');
    } else {
      setPasswordError('');
    }
  };
  const navigate = useNavigate();


  const handleLoginSuccess = (userId) => {
    setUserIdCookie(userId);
    navigate('/home-page');
  };
  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    // Check if username or password is empty
    if (!username || !password) {
      if (!username) {
        setUsernameError('Please enter your username');
      }
      if (!password) {
        setPasswordError('Please enter your password');
      }
      return;
    }
    try {
      setLoading(true); // Set loading state to true
      // Make a POST request to the backend API endpoint for logging in
      const response = await axios.post('http://localhost:3001/login', {
        email: {username},
        password: {password},
      });
      const userId= response.data.userId;
      console.log('User ID:', response.data.userId);
      // Handle successful login (e.g., store authentication token)
      handleLoginSuccess(userId);
      setLoggedIn(true);
    } catch (error) {
      console.error('Error logging in:', error);
      // Handle error appropriately, such as displaying an error message to the user
    } finally {
      setLoading(false); // Reset loading state to false after submission attempt
    }
  };

  const handleCreateAccount=() =>{
    navigate("/create-account");
  };

  // Render the login form if not logged in, otherwise render a success message
  if (!loggedIn) {
    return (
      <div className="container">
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => handleUsernameChange(e.target.value)} // Validate username as user types
            />
            {usernameError && <p className="error-message">{usernameError}</p>} {/* Display username error message */}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => handlePasswordChange(e.target.value)} // Validate password as user types
            />
            {passwordError && <p className="error-message">{passwordError}</p>} {/* Display password error message */}
          </div>
          <button type="submit" >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>
        <button onClick={handleCreateAccount}>Need an Account?</button>
      </div>
    );
  } else {
    // Render a success message or redirect to another page
    //navigate('/home-page');
  }
}

export default LoginPage;