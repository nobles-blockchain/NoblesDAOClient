import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Homepage.css';
import {setUserIdCookie, getUserIdFromCookie, removeUserIdCookie} from '../Cookies/AuthServices.js';
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';


function Homepage() {
  const [polls, setPolls] = useState([
    { id: 1, title: "Favorite Color Poll" },
    { id: 2, title: "Best Movie Poll" },
    { id: 3, title: "Weekend Plans Poll" }
  ]);

  const [elections, setElections] = useState([
    { id: 1, title: "Class President Election" },
    { id: 2, title: "Student Council Election" },
    { id: 3, title: "Club Officer Election" }
  ]);

  const navigate = useNavigate();

  const handleLogOut = () => {
    removeUserIdCookie();
    navigate('/login');

  };

  return (
    <div className="homepage">
      <header className="header">
        <h1 className="title">Welcome to Dawg Polls</h1>
      </header>
      <div className="create-your-own-section">
        <Link to="/create-poll">
          <button className="create-your-own-button">Create Your Own!</button>
        </Link>
      </div>
      <div className="content">
        <div className="polls-section">
          <h2 className="section-title">Current Polls</h2>
          <div className="buttons-container">
            {polls.map(poll => (
              <button key={poll.id} className="poll-button">{poll.title}</button>
            ))}
          </div>
        </div>
        <div className="elections-section">
          <h2 className="section-title">Current Elections</h2>
          <div className="buttons-container">
            {elections.map(election => (
              <button key={election.id} className="election-button">{election.title}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="about-section">
        <h2 className="section-title">About Us</h2>
        <p>Noble and Greenough School is a rigorous academic community dedicated to inspiring leadership for the public good. Through mentoring relationships, we motivate students to achieve their highest potential and to lead lives characterized by service to others.</p>
      </div>
      <div>
        <button onClick={handleLogOut}>Log Out</button>
      </div>
    </div>
  );
}

export default Homepage;


