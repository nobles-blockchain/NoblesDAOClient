import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Banner.css';
import noblesLogo from '../../assets/nobles-logo.png'; // Adjust the path as needed
import { getUserIdFromCookie } from '../Cookies/AuthServices.js';

function Banner({ title, buttons }) {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    const userId = getUserIdFromCookie();
    if (userId) {
      navigate('/home-page');
    } else {
      navigate('/login');
    }
  };

  return (
    <div className="banner">
      <img src={noblesLogo} alt="Nobles Logo" onClick={handleLogoClick} className="banner-logo" />
      <div className="banner-title">{title}</div>
      <div className="banner-buttons">
        {buttons.map((button, index) => (
          <React.Fragment key={index}>
            {button.link ? (
              <Link to={button.link}>
                <button className="banner-button">{button.label}</button>
              </Link>
            ) : (
              <button className="banner-button" onClick={button.onClick}>
                {button.label}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

export default Banner;
