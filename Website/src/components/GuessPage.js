import React, { Component } from 'react';
import Timer from './Timer';
import '../App.css';

const GuessPage = ({username}) => {

  fetchRandomQuestion = () => {
    // Implement your logic to fetch a random question and options.
    // Update the state with the question and options.
  };

  handleGuessAnswerClick = (selectedOption) => {
    // Implement your logic to handle the selected answer.
  };
  handleTimerCompletion = () => {
    this.setState({  });
  };

    return (
      <div className="answer-page">
        <div className="timer">
          <Timer initialTime={10 * 1000}  onCompletion={this.handleTimerCompletion}/> {10000}
        </div>
        <div className="logo">
          <img src="planet.png" alt="Logo" />
        </div>
        <div className="question" >Is this player going to guess correctly?</div>
        <div className="options">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => this.handleGuessAnswerClick(option)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  }

export default GuessPage;