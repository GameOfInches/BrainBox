import React, {useState, useEffect } from 'react';
import Timer from './Timer';
import '../App.css';

const AnswerPage= ({username}) => {
  const [timeLeft, setTimeLeft] = useState(10);
  const [timeOut, setTimeOut] = useState(false);
  //placeholder for answer options
  const options = ["Yes", "No"]

  useEffect(() => {
    // Start the timer countdown
    const countdownInterval = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
      } else {
        clearInterval(countdownInterval);
        setTimeOut(true);
      }
    }, 1000);

    // Cleanup the interval on component unmount
    return () => {
      clearInterval(countdownInterval);
     // handleTimerCompletion();
    };
  }, [timeLeft]);
    /*fetchRandomQuestion = () => {
      console.log("question fetched")
    };
  
    handleAnswerClick = (selectedOption) => {
      // Implement your logic to handle the selected answer.
      console.log("Answer clicked")
    };
    handleTimerCompletion = () => {
      console.log("Timer completed")
    };*/
  
      return (
        <div className="answer-page">
          <div className="">
            <Timer initialTime={10 * 1000}/> {10000}
          </div>
          <div className="logo">
            <img src="planet.png" alt="Logo" />
          </div>
          <div className="question">
            <h2>{"What?"}</h2>
          </div>
          <div className="options">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => this.handleAnswerClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      );
    }
  
  export default AnswerPage;