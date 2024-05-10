import CreateAccount from "./Components/CreateAccount/CreateAccount"
import Homepage from "./Components/Homepage/Homepage";
import LoginPage from "./Components/Login-Page/Login";
import CreatePoll from "./Components/CreatePoll/CreatePoll";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const handleCreatePoll = (pollTitle) => {
    console.log(`Creating poll with title: ${pollTitle}`);
  };

  const handleCreateElection = (electionTitle) => {
    console.log(`Creating election with title: ${electionTitle}`);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/home-page" element={<Homepage/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-poll" element={<CreatePoll onCreatePoll={handleCreatePoll} onCreateElection={handleCreateElection}/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
