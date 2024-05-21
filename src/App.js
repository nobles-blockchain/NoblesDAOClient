import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CreateAccount from "./Components/CreateAccount/CreateAccount";
import HomePage from "./Components/Homepage/Homepage";
import LoginPage from "./Components/LoginPage/Login";
import CreatePoll from "./Components/CreatePoll/CreatePoll";
import VotingPage from "./Components/Voting_Page/votingpage.js";
import PollPage from "./Components/PollPage/PollPage";
import { getUserIdFromCookie } from './Components/Cookies/AuthServices.js';

function App() {
  const checkLogin = () => !!getUserIdFromCookie();

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Navigate to={checkLogin() ? "/home-page" : "/login"} />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/home-page" element={checkLogin() ? <HomePage /> : <Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-poll" element={checkLogin() ? <CreatePoll /> : <Navigate to="/login" />} />
          <Route path="/vote" element={<VotingPage />} />
          <Route path="/poll/:pollId" element={checkLogin() ? <PollPage /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
