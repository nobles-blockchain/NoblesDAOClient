import React, { useState } from 'react';
import "./votingpage.css";

function VotingPage() {
  const [selectedOption, setSelectedOption] = useState(""); // State variable to store selected option
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(-1); // State variable to store selected option index
  const array = ["Foghorn Leghorn", "Jebediah Handpump III", "Moe Lester", "P. Ness", "Mohammed", "D. Snuts"];

  function handleSubmit() {
    console.log("Final Option:", selectedOption);
  }

  function handleClick(index, option) {
    setSelectedOption(option); // Update selectedOption state
    setSelectedOptionIndex(index); // Update selectedOptionIndex state
    console.log("Selected Option:", selectedOption);
  }

  return (
    <div>
      <div className="title">
        <p style={{ fontSize: '50px'}}>Voting Page </p>
      </div>

      <div className="question">
        <p style={{ fontSize: '40px'}}>Question</p>
      </div>

      {array.map((option, index) => {
        return (
          <div key={index} className="button-container">
            <button 
              className={selectedOptionIndex === index ? "myButton selected" : "myButton"} 
              onClick={() => handleClick(index, option)}
            >
              <div className="buttonText">
                {option}
              </div>
            </button>
          </div>
        );
      })}
      
      <div className="submitButtonContainer">
        <div className="submitButton" onClick={handleSubmit}>
          <div className="submitButtonText">
            Submit Vote
          </div>
        </div>
      </div>
    </div>
  );
}

export default VotingPage;
