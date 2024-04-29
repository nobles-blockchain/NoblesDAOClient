import CreateAccount from "./Components/CreateAccount/CreateAccount"
import Homepage from "./Components/Homepage/Homepage";
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Define the route for creating an account */}
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/home-page" element={<Homepage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;