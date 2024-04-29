import noblesshieldblue from './noblesshieldblue.png'; // Import the image file
import './CreateAccount.css';
import { useState } from 'react'; // Import useState hook for managing state
import axios from 'axios'; // Import Axios for making HTTP requests

function CreateAccount() {
  // State variables to store username, password, and confirmation password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [loading, setLoading] = useState(false); // State variable for loading state
  const [submitted, setSubmitted] = useState(false); // State variable for form submission status

  // Function to handle username validation
  const handleUsernameChange = (value) => {
    setUsername(value);
    if (!/nobles\.edu$/.test(value)) {
      setUsernameError("Please enter your Nobles email address");
    } else {
      setUsernameError('');
    }
  };

  // Function to handle password validation
  const handlePasswordChange = (value) => {
    setPassword(value);
    if (value.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
    } else {
      setPasswordError('');
    }
  };

  // Function to handle confirmation password validation
  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
    if (value !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError('');
    }
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission
    // Check if any validation errors exist
    if (usernameError || passwordError || confirmPasswordError) {
      return; // Exit function if any validation errors exist
    }
    try {
      setLoading(true); // Set loading state to true
      // Make a POST request to the backend API endpoint for creating an account
      const response = await axios.post('http://localhost:3001/create_account', {
        email: username, // Assuming username is the email address
        password: password
      });

      console.log("User ID:", response.data.userId);
      // Clear input boxes after successful submission
      setUsername('');
      setPassword('');
      setConfirmPassword('');
      setSubmitted(true); // Set form submission status to true
      // Add any additional logic you need here, such as redirecting the user to another page
    } catch (error) {
      console.error("Error creating account:", error);
      // Handle error appropriately, such as displaying an error message to the user
    } finally {
      setLoading(false); // Reset loading state to false after submission attempt
    }
  };

  // Function to handle redirecting to the login page
  const redirectToLoginPage = () => {
    // Logic to redirect to the login page
    console.log("Redirecting to login page...");
  };

  // Render the form if submission hasn't been made, otherwise render the button
  if (!submitted) {
    return (
      <div className="container">
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
              onChange={(e) => handleUsernameChange(e.target.value)} // Validate username as user types
            />
            {usernameError && <p className="error-message">{usernameError}</p>} {/* Display username error message */}
          </div>
          <div className="form-group">
            <label htmlFor="password">Create a password:</label>
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
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm password:</label>
            <input 
              type="password" 
              id="confirmPassword" 
              name="confirmPassword" 
              placeholder="Confirm your password" 
              value={confirmPassword}
              onChange={(e) => handleConfirmPasswordChange(e.target.value)} // Validate confirmation password as user types
            />
            {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>} {/* Display confirmation password error message */}
          </div>
          <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Submit'}</button>
        </form>
        <div className="logo-container">
          <img src={noblesshieldblue} alt="Nobles Shield Blue" className="nobles-shield-blue" />
        </div>
      </div>
    );
  } else {
    // Render the button to redirect to the login page
    return (
      <div className="container">
        <h1>Account Created</h1>
        <button onClick={redirectToLoginPage}>Go to Log In</button>
      </div>
    );
  }
}

export default CreateAccount;
