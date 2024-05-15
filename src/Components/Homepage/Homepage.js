import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Homepage.css';
import { removeUserIdCookie } from '../Cookies/AuthServices.js';
import { useNavigate } from 'react-router-dom';
import noblesLogo from '../../assets/nobles-logo.png'; // Adjust the path as needed

const userId = "VOydpk8n29YGBpbBlXp8E7vWjO22"; // Constant userId

function Homepage() {
  const [polls, setPolls] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://nobles-dao-api-276edade8fdf.herokuapp.com/view_polls`, {
      params: {
        userId: userId,
      },
    })
    .then(response => {
      if (response.data.success) {
        setPolls(response.data.data);
      } else {
        console.error('Failed to fetch polls:', response.data.error);
      }
    })
    .catch(error => {
      console.error('Error fetching polls:', error);
    });
  }, []);

  const handleLogOut = () => {
    removeUserIdCookie();
    navigate('/login');
  };

  return (
    <div className="homepage">
      <div className="banner">
        <img src={noblesLogo} alt="Nobles Logo" />
        <div className="banner-title">DawgPolls</div>
        <div className="banner-buttons">
          <Link to="/create-poll">
            <button className="banner-button">Create Poll</button>
          </Link>
          <button className="banner-button" onClick={handleLogOut}>Log Out</button>
        </div>
      </div>
      <div className="content">
        <div className="polls-section">
          <h2 className="section-title">Current Polls</h2>
          <div className="buttons-container">
            {polls.map(poll => (
              <button key={poll.id} className="poll-button">{poll.name}</button>
            ))}
          </div>
        </div>
      </div>
      <div className="about-section">
        <h2 className="section-title">About Us</h2>
        <p>Noble and Greenough School is a rigorous academic community dedicated to inspiring leadership for the public good. Through mentoring relationships, we motivate students to achieve their highest potential and to lead lives characterized by service to others.</p>
      </div>
    </div>
  );
}

export default Homepage;
