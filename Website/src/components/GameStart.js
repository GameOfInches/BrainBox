import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import QuestionPage from './QuestionPage';


  
function GameStart() {
  //placeholder for username
  const username = "Player 1";
  const [isDisplayed, setIsDisplayed] = useState(false);

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
            {isDisplayed ? <QuestionPage username = {username} /> : <div className="welcome-text">WELCOME TO MEMOR.IO! . . .</div>}
            </div>
      );
}

export default GameStart;


