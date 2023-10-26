import React, { useState, useEffect } from 'react';
import '../App.css';

const QuestionPage = () => {
    const [timeLeft, setTimeLeft] = useState(10);
  
    useEffect(() => {
      // Start the timer countdown
      const countdownInterval = setInterval(() => {
        if (timeLeft > 0) {
          setTimeLeft(timeLeft - 1);
        } else {
          clearInterval(countdownInterval);
        }
      }, 1000);
  
      // Cleanup the interval on component unmount
      return () => {
        clearInterval(countdownInterval);
      };
    }, [timeLeft]);
  
    return (
      <div className="question-card">
        <div className="timer">
            <Timer initialTime={timer * 1000} /> {10000}
          </div>
        <div className="logo">
          <img src="planet.png" alt="Logo" />
        </div>
        <div className="title">Memorize the card...</div>
        <div className="image-container">
          <img src="card.jpg" alt="Card" />
        </div>
      </div>
    );
  };
  
  export default QuestionPage;