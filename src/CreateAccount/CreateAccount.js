import noblesshieldblue from './noblesshieldblue.png'; // Import the image file
import './CreateAccount.css';
import { useState } from 'react'; // Import useState hook for managing state

function CreateAccount() {
  // State variables to store username, password, and confirmation password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission

    // Check if passwords match
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return; // Exit function if passwords don't match
    }

    // Check if username ends with 2 digits
    if (!/\d{2}$/.test(username)) {
      setErrorMessage("Please use your Nobles username");
      return; // Exit function if username doesn't meet the requirement
    }

    // Clear error message if both username format and passwords match
    setErrorMessage('');

    // Continue with form submission logic
    console.log("Form submitted successfully!");
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
            onChange={(e) => setUsername(e.target.value)} // Update username state
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Create a password:</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            placeholder="Enter your password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update password state
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm password:</label>
          <input 
            type="password" 
            id="confirmPassword" 
            name="confirmPassword" 
            placeholder="Confirm your password" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} // Update confirmation password state
          />
        </div>
        {errorMessage && <p className="error-message" style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message in red if validation fails */}
        <button type="submit">Submit</button>
      </form>
      <div className="logo-container">
        <img src={noblesshieldblue} alt="Nobles Shield Blue" className="nobles-shield-blue" />
      </div>
    </div>
  );
}

export default CreateAccount;
