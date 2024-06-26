import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';
import { removeUserIdCookie, getUserIdFromCookie } from '../Cookies/AuthServices.js';
import Banner from '../Banner/Banner';

function Homepage() {
  const [polls, setPolls] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = getUserIdFromCookie();
    axios.get('https://nobles-dao-api-276edade8fdf.herokuapp.com/view_polls', {
      params: { userId },
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

  const handleLogOut = async () => {
    await removeUserIdCookie();
    navigate('/login');
  };

  const handlePollClick = (pollId) => {
    navigate(`/poll/${pollId}`);
  };

  const bannerButtons = [
    { label: 'Create Poll', link: '/create-poll' },
    { label: 'Log Out', onClick: handleLogOut }
  ];

  return (
    <div className="homepage">
      <Banner title="DawgPolls" buttons={bannerButtons} />
      <div className="content">
        <div className="polls-section">
          <h2 className="section-title">Current Polls</h2>
          <div className="buttons-container">
            {polls.map(poll => (
              <button 
                key={poll.id} 
                className="poll-button" 
                onClick={() => handlePollClick(poll.id)}
              >
                {poll.name}
              </button>
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
