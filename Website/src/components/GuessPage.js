import React, { Component } from 'react';
import Timer from './Timer';
import '../App.css';

const GuessPage = ({username}) => {
  //To-Do: pull from the database if the user has answered correctly or not
    

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
        </div></div>
    )

  }

export default GuessPage;