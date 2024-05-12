import CreateAccount from "./Components/CreateAccount/CreateAccount"
import HomePage from "./Components/Homepage/Homepage";
import LoginPage from "./Components/Login-Page/Login";
import CreatePoll from "./Components/CreatePoll/CreatePoll";
import VotingPage from "./Components/Voting_Page/votingpage.js";
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';
import {setUserIdCookie, getUserIdFromCookie, removeUserIdCookie} from './Components/Cookies/AuthServices.js';

function App() {
  const handleCreatePoll = (pollTitle) => {
    console.log(`Creating poll with title: ${pollTitle}`);
  };

  const handleCreateElection = (electionTitle) => {
    console.log(`Creating election with title: ${electionTitle}`);
  };

  function checkLogin() {
    return getUserIdFromCookie() !== "null";
  }

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to={checkLogin() ? "/home-page" : "/login"} />} />
          <Route path="/create-account" element={ <CreateAccount />} />
          <Route path="/home-page" element={checkLogin() ? <HomePage /> : <Navigate to={"/login"} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-poll" element={<CreatePoll onCreatePoll={handleCreatePoll} onCreateElection={handleCreateElection}/>} />
          <Route path='/Vote' element={<VotingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

//allow people to vote using buttons
