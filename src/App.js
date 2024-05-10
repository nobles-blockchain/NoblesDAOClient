import CreateAccount from "./Components/CreateAccount/CreateAccount"
import HomePage from "./Components/Homepage/Homepage.js";
import LoginPage from "./Components/Login-Page/Login.js";
import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, redirect, Navigate  } from 'react-router-dom';
import {setUserIdCookie, getUserIdFromCookie, removeUserIdCookie} from './Components/Cookies/AuthServices.js';

function App() {
  function isLoggedIn(){
    console.log(getUserIdFromCookie())
    return getUserIdFromCookie() !== "null"
  }
    
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <Routes>
              {/* Define the route for creating an account */}
              <Route path="/" element={<Navigate to={isLoggedIn() ? "/home-page" : "/login"} />} />
              <Route path="/create-account" element={ <CreateAccount />} />
              <Route path="/home-page" element={isLoggedIn() ? <HomePage /> : <Navigate to={"/login"} />} />
              <Route path="/login" element={<LoginPage />} />
            </Routes>
          </header>
        </div>
      </Router>
    );
  }

export default App;