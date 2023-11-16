import React, {useState, useEffect } from 'react';
import Timer from './Timer';
import '../App.css';
import GameStart from './GameStart';

const AnswerPage= ({lobbyId, username, roundNumber, setRoundNumber, toNewRound, setToNewRound}) => {
  const [timeLeft, setTimeLeft] = useState(10);
  const [timeOut, setTimeOut] = useState(false);
  const [answerChosen, setAnswerChosen] = useState(false);
  const [answerIsCorrect, setAnswerIsCorrect] = useState(false);

  //placeholder for score
  const score = 0

  //placeholder for question

  //placeholder for correct answer
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


  
  useEffect(() => {
    if (timeOut){
      console.log("time out")
    }
    if (answerChosen){
      console.log("answer chosen")
      //TO-DO: logic to check if answer is correct
      setAnswerIsCorrect(true)
    }
    return () => {
      if (answerIsCorrect){
          score += 100
          handleScoreUpdate(username, score);
      }
      setRoundNumber(roundNumber + 1)
      setToNewRound(true)
    };
  }, [timeOut, answerChosen]);

  
    const handleAnswerClick = (option) => {
      // Implement your logic to handle the selected answer.
      console.log("Answer clicked")
      setAnswerChosen(true)
    };
    /*
    handleTimerCompletion = () => {
      console.log("Timer completed")
    };
  */

    const handleScoreUpdate = (player, newScore) => {
        const apiUrl = 'http://localhost:8080/api';
        const insertEndpoint = `${apiUrl}/score`;

        fetch(insertEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'scoreUpdate',
                user: player,
                score: newScore,
                gameid: lobbyId
            }),
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
          <div className="">
            <Timer initialTime={10 * 1000} isPlaying={!answerChosen}/> 
          </div>
          <div>Score is: {score}</div>
          {timeOut ? <div> Time's up! </div> 
                 : answerIsCorrect ? <div>Answer is correct!</div>
                      : !answerIsCorrect && answerChosen ? <div>Answer is incorrect!</div>
                          : <></>}
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
                onClick={() => handleAnswerClick(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      );
    }
  
  export default AnswerPage;
