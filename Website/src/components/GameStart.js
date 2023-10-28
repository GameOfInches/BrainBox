import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import QuestionPage from './QuestionPage';
import ResultsPage from './ResultsPage';

  
function GameStart() {
  //placeholder for username
  const username = "Player 1";
  const [isDisplayed, setIsDisplayed] = useState(false);
  //TO:DO import users and their scores from database

  const [turnOfPlayer, setTurnOfPlayer] = useState(1);
  const [numberOfRounds, setNumberOfRounds] = useState(5);
  const [roundNumber, setRoundNumber] = useState(1);

  useEffect(() => {
    setInterval(() => {
      setIsDisplayed(true);
    }, 1000);
  }, []);


    return (
      <div>
            <div className="logo"></div>
            <a href="index.html">
              <div className="home-button">
                <i className="fas fa-home"></i>
              </div>
            </a>
            {roundNumber >= 6 ? <ResultsPage /> : isDisplayed ? <QuestionPage username = {username} roundNumber = {roundNumber} setRoundNumber = {setRoundNumber} /> : <div className="welcome-text">WELCOME TO MEMOR.IO! . . .</div>}
            </div>
      );
}

export default GameStart;


