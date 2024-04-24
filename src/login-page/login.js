import React, { useState } from 'react';
import './login.css';

  function LoginPage(){
    const [currentSection, setCurrentSection] = useState(1);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSectionChange = (sectionNumber) => {
      setCurrentSection(sectionNumber);
    }

    const handleUserChange = (event) => {
      event.preventDefault();
      setUsername(event.target.value)
    }

    const handlePasswordChange = (event) => {
      event.preventDefault();
      setPassword(event.target.value)
    }


    function CreateAcc() {
      return (
      <div>
        <h2>Create Account</h2>
        <p>Pretend this is the create account page.</p>
        <button onClick={() => handleSectionChange(1)}>Go back to Login</button>
      </div>
        );
      };
  
    function LoginBoxes() {
      return (
       <div> 
        <div>
          <div>
            <h1>Log into DawgPolls!</h1>
          </div>
        <form onSubmit={() => handleSectionChange(2)}>
          <div>
            <label>Username:</label>
          </div>
          <div>
            <input
              name="username"
              value={username}
              onChange={(e) => setUsername()}
              onBlur={handleUserChange}
              required
            />
          </div>
          <div>
            <label>Password:</label>
          </div>
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword()}
              onBlur={handlePasswordChange}
              required
            />
          </div>
          <div>
          <button type="submit">Log In</button>
          </div>
        </form>
        </div>
        <button onClick={() => handleSectionChange(3)}>Need an Account?</button>
      </div>
    );
  };
  
  const LoginSuccess = () => {
    return (
      <div>
        <h2>Success!!!</h2>
        <p>You have been logged in</p>
        <button onClick={() => handleSectionChange(1)}>Go back to Login</button>
      </div>

    );
  };

  if (currentSection === 1) {
    return <LoginBoxes />;
  } else if (currentSection === 2) {
    return <LoginSuccess />;
  } else if (currentSection === 3) {
    return <CreateAcc />;
  }
  
  return <LoginBoxes />;
}

export default LoginPage;