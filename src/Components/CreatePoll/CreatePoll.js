import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getUserIdFromCookie } from '../Cookies/AuthServices.js';
import Banner from '../Banner/Banner';
import './CreatePoll.css';

function CreatePoll() {
  const [newPollTitle, setNewPollTitle] = useState('');
  const [pollError, setPollError] = useState('');
  const [pollOptions, setPollOptions] = useState(['', '']); // Two initial empty poll options
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handlePollOptionChange = (index, value) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const deletePollOption = (index) => {
    // Ensure that the first two options cannot be deleted
    if (index > 1) {
      const newOptions = pollOptions.filter((_, i) => i !== index);
      setPollOptions(newOptions);
    }
  };

  const addPollOption = () => {
    if (pollOptions.length < 10) {
      setPollOptions([...pollOptions, '']);
    } else {
      setPollError('You can add a maximum of 10 options.');
      setTimeout(() => {
        setPollError('');
      }, 3000); // Clear the error after 3 seconds
    }
  };

  const createPoll = async (userId, name, options) => {
    try {
      const response = await axios.post('https://nobles-dao-api-276edade8fdf.herokuapp.com/create_poll', { userId, name, options });
      if (response.data.success) {
        setIsSuccess(true);
      } else {
        throw new Error(response.data.error || 'UNKNOWN_ERROR');
      }
    } catch (error) {
      setPollError(`Error creating poll: ${error.message}`);
      setTimeout(() => {
        setPollError('');
      }, 3000); // Clear the error after 3 seconds
    } finally {
      setIsSubmitting(false); // Re-enable the submit button
    }
  };

  const handleSubmitPoll = () => {
    const userId = getUserIdFromCookie(); // Get userId from cookies
    const validOptions = pollOptions.filter(option => option.trim() !== '');
    if (newPollTitle.trim() === '' || validOptions.length === 0 || validOptions.length !== pollOptions.length) {
      setPollError('Please enter a poll title and ensure all options are filled.');
      setTimeout(() => {
        setPollError('');
      }, 3000); // Clear the error after 3 seconds
      return;
    }
    setPollError('');
    console.log('valid poll');
    setIsSubmitting(true); // Disable the submit button
    createPoll(userId, newPollTitle, validOptions);
  };

  const handleBack = () => {
    navigate('/home-page');
  };

  return (
    <div className="create-poll-page">
      <Banner 
        title="Create Poll" 
        buttons={[{ label: 'Back', onClick: handleBack }]}
      />
      {isSuccess ? (
        <div className="success-container">
          <h2>Poll Created Successfully!</h2>
          <button onClick={handleBack} className="btn-back">Go to Home</button>
        </div>
      ) : (
        <div className="form-container">
          <div className="title-container">
            <label htmlFor="newPollTitle" className="title-label">Enter Poll Title</label>
            <input
              id="newPollTitle"
              type="text"
              value={newPollTitle}
              onChange={(e) => setNewPollTitle(e.target.value)}
              className="title-input"
            />
          </div>
          {pollOptions.map((option, index) => (
            <div key={index} className="option-row">
              <label htmlFor={`poll-option-${index}`}>{index + 1}:</label>
              <div className="input-container">
                <input
                  id={`poll-option-${index}`}
                  type="text"
                  value={option}
                  onChange={(e) => handlePollOptionChange(index, e.target.value)}
                  className="option-input"
                />
                {index > 1 && (
                  <button onClick={() => deletePollOption(index)} className="btn-delete">✕</button>
                )}
              </div>
            </div>
          ))}
          <button onClick={addPollOption} className="btn-add-text">Add Option</button>
          <button 
            onClick={handleSubmitPoll} 
            className="btn-submit" 
            disabled={isSubmitting} // Disable the button when submitting
          >
            {isSubmitting ? 'Submitting...' : 'Submit Poll'}
          </button>
          {pollError && <p className="error">{pollError}</p>}
        </div>
      )}
    </div>
  );
}

export default CreatePoll;
