import CreateAccount from "./Components/CreateAccount/CreateAccount"
import HomePage from "./Components/Homepage/Homepage";
import LoginPage from "./Components/Login-Page/Login";
import CreatePoll from "./Components/CreatePoll/CreatePoll";
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';
import {setUserIdCookie, getUserIdFromCookie, removeUserIdCookie} from './Components/Cookies/AuthServices.js';

function App() {
  const handleCreatePoll = (pollTitle) => {
    console.log(`Creating poll with title: ${pollTitle}`);
  };

  const handleCreateElection = (electionTitle) => {
    console.log(`Creating election with title: ${electionTitle}`);
  };
  function isLoggedIn(){
    console.log(getUserIdFromCookie())
    return getUserIdFromCookie() !== "null"
  }

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to={isLoggedIn() ? "/home-page" : "/login"} />} />
          <Route path="/create-account" element={ <CreateAccount />} />
          <Route path="/home-page" element={isLoggedIn() ? <HomePage /> : <Navigate to={"/login"} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-poll" element={<CreatePoll onCreatePoll={handleCreatePoll} onCreateElection={handleCreateElection}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
