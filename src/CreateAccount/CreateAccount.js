import noblesshieldblue from './noblesshieldblue.png'; // Import the image file
import './CreateAccount.css';
import { useState } from 'react'; // Import useState hook for managing state

function CreateAccount() {
  // State variables to store username, password, and confirmation password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  // Function to handle username validation
  const handleUsernameChange = (value) => {
    setUsername(value);
    if (!/\d{2}$/.test(value)) {
      setUsernameError("Please enter your Nobles username (first intial, last name, graduation year)");
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
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission

    // Check if any validation errors exist
    if (usernameError || passwordError || confirmPasswordError) {
      return; // Exit function if any validation errors exist
    }

    // Continue with form submission logic
    console.log("Form submitted successfully");
    // Add your logic to submit the form data
  };

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
        <button type="submit">Submit</button>
      </form>
      <div className="logo-container">
        <img src={noblesshieldblue} alt="Nobles Shield Blue" className="nobles-shield-blue" />
      </div>
    </div>
  );
}

export default CreateAccount;
