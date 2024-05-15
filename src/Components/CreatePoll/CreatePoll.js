import React, { useState } from 'react';

function CreatePollElectionPage({ onCreatePoll, onCreateElection }) {
  const [newPollTitle, setNewPollTitle] = useState('');
  const [newElectionTitle, setNewElectionTitle] = useState('');
  const [pollError, setPollError] = useState('');
  const [electionError, setElectionError] = useState('');
  const [showPollOptions, setShowPollOptions] = useState(false);
  const [showElectionOptions, setShowElectionOptions] = useState(false);
  const [pollOptions, setPollOptions] = useState(['', '']); // Two initial empty poll options
  const [electionOptions, setElectionOptions] = useState(['', '']); // Two initial empty election options

  const handleCreatePoll = () => {
    if (newPollTitle.trim() === '') {
      setPollError('Please enter a poll title.');
    } else {
      setPollError('');
      setShowPollOptions(true); // Show poll options after creating the poll
      setShowElectionOptions(false); // Hide election options
    }
  };

  const handleCreateElection = () => {
    if (newElectionTitle.trim() === '') {
      setElectionError('Please enter an election title.');
    } else {
      setElectionError('');
      setShowElectionOptions(true); // Show election options after creating the election
      setShowPollOptions(false); // Hide poll options
    }
  };

  const handlePollOptionChange = (index, value) => {
    const newOptions = [...pollOptions];
    newOptions[index] = value;
    setPollOptions(newOptions);
  };

  const handleElectionOptionChange = (index, value) => {
    const newOptions = [...electionOptions];
    newOptions[index] = value;
    setElectionOptions(newOptions);
  };

  const deletePollOption = (index) => {
    // Ensure that the first two options cannot be deleted
    if (index > 1) {
      const newOptions = pollOptions.filter((_, i) => i !== index);
      setPollOptions(newOptions);
    }
  };

  const deleteElectionOption = (index) => {
    // Ensure that the first two options cannot be deleted
    if (index > 1) {
      const newOptions = electionOptions.filter((_, i) => i !== index);
      setElectionOptions(newOptions);
    }
  };

  const addPollOption = () => {
    setPollOptions([...pollOptions, '']);
  };

  const addElectionOption = () => {
    setElectionOptions([...electionOptions, '']);
  };

  const handleSubmitPoll = () => {
    const validOptions = pollOptions.filter(option => option.trim() !== '');
    if (newPollTitle.trim() === '' || validOptions.length === 0) {
      setPollError('Please enter a poll title and at least one option.');
      return;
    }
    setPollError('');
    onCreatePoll({ title: newPollTitle, options: validOptions });
    setNewPollTitle('');
    setPollOptions(['', '']); // Reset options
    setShowPollOptions(false); // Hide options after submitting
  };

  const handleSubmitElection = () => {
    const validOptions = electionOptions.filter(option => option.trim() !== '');
    if (newElectionTitle.trim() === '' || validOptions.length === 0) {
      setElectionError('Please enter an election title and at least one option.');
      return;
    }
    setElectionError('');
    onCreateElection({ title: newElectionTitle, options: validOptions });
    setNewElectionTitle('');
    setElectionOptions(['', '']); // Reset options
    setShowElectionOptions(false); // Hide options after submitting
  };

  const handleBack = () => {
    setShowPollOptions(false);
    setShowElectionOptions(false);
  };

  const handleNavigateHome = () => {
    window.location.href = 'http://localhost:3000/Home-page';
  };

  return (
    <div className="create-poll-election-page">
      <h1>Create Poll or Election</h1>
      <div className="navigate-home-section">
        <button className="navigate-home-button" onClick={handleNavigateHome}>Go to Home Page</button>
      </div>
      {!showPollOptions && !showElectionOptions && (
        <>
          <div>
            <label htmlFor="newPollTitle">Enter Poll Title:</label>
            <input
              id="newPollTitle"
              type="text"
              value={newPollTitle}
              onChange={(e) => setNewPollTitle(e.target.value)}
            />
            <button onClick={handleCreatePoll}>Create Poll</button>
            {pollError && <p style={{ color: 'red' }}>{pollError}</p>}
          </div>
          <div>
            <label htmlFor="newElectionTitle">Enter Election Title:</label>
            <input
              id="newElectionTitle"
              type="text"
              value={newElectionTitle}
              onChange={(e) => setNewElectionTitle(e.target.value)}
            />
            <button onClick={handleCreateElection}>Create Election</button>
            {electionError && <p style={{ color: 'red' }}>{electionError}</p>}
          </div>
        </>
      )}

      {(showPollOptions || showElectionOptions) && (
        <>
          <button onClick={handleBack} style={{ cursor: 'pointer', marginBottom: '10px' }}>← Back</button>
          {showPollOptions && (
            <div className="poll-options">
              <h2>Enter Poll Options</h2>
              {pollOptions.map((option, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                  <label htmlFor={`poll-option-${index}`}>Option {String.fromCharCode(65 + index)}:</label>
                  <input
                    id={`poll-option-${index}`}
                    type="text"
                    value={option}
                    onChange={(e) => handlePollOptionChange(index, e.target.value)}
                  />
                  {index > 1 && (
                    <button onClick={() => deletePollOption(index)} style={{ marginLeft: '8px', color: 'red', cursor: 'pointer' }}>X</button>
                  )}
                </div>
              ))}
              <button onClick={addPollOption}>Add Option</button>
              <button onClick={handleSubmitPoll}>Submit Poll</button>
            </div>
          )}

          {showElectionOptions && (
            <div className="election-options">
              <h2>Enter Election Options</h2>
              {electionOptions.map((option, index) => (
                <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
                  <label htmlFor={`election-option-${index}`}>Option {String.fromCharCode(65 + index)}:</label>
                  <input
                    id={`election-option-${index}`}
                    type="text"
                    value={option}
                    onChange={(e) => handleElectionOptionChange(index, e.target.value)}
                  />
                  {index > 1 && (
                    <button onClick={() => deleteElectionOption(index)} style={{ marginLeft: '8px', color: 'red', cursor: 'pointer' }}>X</button>
                  )}
                </div>
              ))}
              <button onClick={addElectionOption}>Add Option</button>
              <button onClick={handleSubmitElection}>Submit Election</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default CreatePollElectionPage;


