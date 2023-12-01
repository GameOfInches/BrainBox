import React, { Component } from 'react';
import Timer from './Timer';
import '../App.css';

const apiUrl = 'http://localhost:8080/api';

const GuessPage = ({username}) => {
const checkIfCorrect = async (questionNumber, lobbyId) => {
        const getEndpoint = `${apiUrl}/get`;
          const response = await fetch(`${getEndpoint}?action=getAnsweredCorrectly&gameid=${lobbyId}&question=${questionNumber}`);
          if (response.ok) {
            try {
              const data = await response.json();
              if (data.length > 0) {
                 if (data === 'True') {
                             addPointsToGuesser(40);
                         } else {
                             alert('Incorrect. The other player did not answer their question correctly.');
                         }

              }
            } catch (error) {
              console.error(error);
              alert('Invalid JSON response.');
            }
          } else {
            alert('Could not check if answer was correct.');
          }
  }
  const addPointsToGuesser = (points) => {
          const apiUrl = 'http://localhost:8080/api';
          const insertEndpoint = `${apiUrl}/score?action=scoreUpdate&user=${encodeURIComponent(username)}&score=${encodeURIComponent(points)}&gameid=${encodeURIComponent(lobbyId)}`;

      fetch(insertEndpoint, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
      })
              .then((response) => {
                  if (response.ok) {
                      console.log('score added successfully for user:', player);
                  } else {
                      console.error('Failed to add score:', response.status);
                  }
              })
              .catch((error) => {
                  console.error('Error sending API request:', error);
              });

      }

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