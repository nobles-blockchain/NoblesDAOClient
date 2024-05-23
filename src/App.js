import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CreateAccount from "./Components/CreateAccount/CreateAccount";
import HomePage from "./Components/Homepage/Homepage";
import LoginPage from "./Components/LoginPage/Login";
import CreatePoll from "./Components/CreatePoll/CreatePoll";
import VotingPage from "./Components/Voting_Page/votingpage.js";
import PollPage from "./Components/PollPage/PollPage";
import { getUserIdFromCookie } from './Components/Cookies/AuthServices.js';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getUserIdFromCookie());

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to={isLoggedIn ? "/home-page" : "/login"} />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/home-page" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage onLogin={() => setIsLoggedIn(true)} />} />
          <Route path="/create-poll" element={isLoggedIn ? <CreatePoll /> : <Navigate to="/login" />} />
          <Route path="/vote" element={<VotingPage />} />
          <Route path="/poll/:pollId" element={isLoggedIn ? <PollPage /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
