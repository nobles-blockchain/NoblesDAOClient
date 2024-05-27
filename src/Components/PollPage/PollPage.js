import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserIdFromCookie } from '../Cookies/AuthServices.js';
import Banner from '../Banner/Banner';
import './PollPage.css';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts';

function PollPage() {
  const [poll, setPoll] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const { pollId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPoll = async () => {
      const userId = getUserIdFromCookie();
      try {
        const response = await axios.get('https://nobles-dao-api-276edade8fdf.herokuapp.com/fetch_poll', {
          params: { userId, pollId },
        });
        if (response.data.success) {
          setPoll(response.data.data);
        } else {
          throw new Error(response.data.error);
        }
      } catch (error) {
        setError(`Error fetching poll: ${error.message}`);
        setTimeout(() => {
          setError('');
        }, 3000); // Clear the error after 3 seconds
      }
    };

    fetchPoll();
  }, [pollId]);

  const handleBack = () => {
    navigate('/home-page');
  };

  const handleOptionClick = (index) => {
    setSelectedOption(index);
  };

  const handleSubmitVote = async () => {
    if (selectedOption === null) {
      setError('Please select an option to vote.');
      setTimeout(() => {
        setError('');
      }, 3000); // Clear the error after 3 seconds
      return;
    }

    setIsSubmitting(true);

    const userId = getUserIdFromCookie();
    try {
      const response = await axios.post('https://nobles-dao-api-276edade8fdf.herokuapp.com/vote', {
        userId,
        pollId: parseInt(pollId, 10),
        voteId: selectedOption,
      });
      if (response.data.success) {
        setSuccessMessage('Vote submitted successfully!');
        setPoll(response.data.data);
      } else {
        throw new Error(response.data.error);
      }
    } catch (error) {
      setError(`Error submitting vote: ${error.message}`);
      setTimeout(() => {
        setError('');
      }, 3000); // Clear the error after 3 seconds
    } finally {
      setIsSubmitting(false);
    }
  };

  if (error) {
    return <p className="error">{error}</p>;
  }

  const renderPollResults = (poll) => {
    const data = poll.choices.map(choice => ({
      name: choice.option,
      value: choice.votes}))
    const maxLabelLength = Math.max(...data.map(d => d.name.length));
    

    return (
      <div className="Graph-container">
        <div className="Graph">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data} layout='vertical' margin={{left: maxLabelLength * 8}} >
              <XAxis type="number" hide />
              <YAxis dataKey="name" type="category" tick={{ width: maxLabelLength * 6, fill: 'black'}} tickLine={false}  />
              <Bar dataKey="value" fill="#1345AA" label={{ position: 'center', fill: 'white'}}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  return (
    <div className="poll-page">
      <Banner 
        title={poll ? (poll.user_choice === null ? "Vote" : "Poll Results") : ""} 
        buttons={[{ label: 'Back', onClick: handleBack }]}
      />
      <div className="poll-content">
        {!poll ? (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            <h2 className="poll-title">{poll.name}</h2>
            {poll.user_choice === null ? (
              <div>
                <p>Please cast your vote:</p>
                {poll.choices.map((choice, index) => (
                  <button 
                    key={index} 
                    className={`vote-button ${selectedOption === index ? 'selected' : ''}`} 
                    onClick={() => handleOptionClick(index)}
                    disabled={isSubmitting}
                  >
                    {choice.option}
                  </button>
                ))}
                <button 
                  onClick={handleSubmitVote} 
                  className="submit-button" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Vote'}
                </button>
                {error && <p className="error">{error}</p>}
                {successMessage && (
                  <div className="success-message">
                    <p>{successMessage}</p>
                    <button onClick={() => navigate(`/page/${pollId}`)}>View Results</button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <p>Here are the results:</p>
                {renderPollResults(poll)}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default PollPage;
