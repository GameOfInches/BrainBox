import React, {useState, useEffect } from 'react';
import Timer from './Timer';
import '../App.css';
import GameStart from './GameStart';

const AnswerPage= ({lobbyId, username, roundNumber, setRoundNumber, toNewRound, setToNewRound}) => {
  const [timeLeft, setTimeLeft] = useState(10);
  const [timeOut, setTimeOut] = useState(false);
  const [answerChosen, setAnswerChosen] = useState(false);
  const [answerIsCorrect, setAnswerIsCorrect] = useState(false);
  const apiUrl = 'http://localhost:8080/api';



  //placeholder for score
  const score = 0

  //placeholder for question
  const questionText = " "

  //placeholder for correct answer
  //placeholder for answer options
  const options = [" "]


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


  function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
      end = new Date().getTime();
   }
 }
  
  useEffect(() => {
    if (timeOut){
      console.log("time out")
    }
    if (answerChosen){
      console.log("answer chosen")
      handleScoreUpdate(username, score)
      //TO-DO: logic to check if answer is correct
      setAnswerIsCorrect(true)
    }
    return () => {
      if (answerIsCorrect){
          score += 100
          handleScoreUpdate(username, score)
      }
      setRoundNumber(roundNumber + 1)
      setToNewRound(true)
      wait(2000);
    };
  }, [timeOut, answerChosen]);

  
    const handleAnswerClick = (option) => {
      // Implement your logic to handle the selected answer.
      console.log("Answer clicked")
      setAnswerChosen(true)
    };

    const handleScoreUpdate = (player, newScore) => {
        const insertEndpoint = `${apiUrl}/score?action=scoreUpdate&user=${player}&score=${newScore}&gameid=${lobbyId}`;

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

    const fetchQuestion = () => {
            const getEndpoint = `${apiUrl}/get?action=getQuestion&gameid=${lobbyId}`;

        try {
                const response = await fetch(getEndpoint);
                if (response.ok) {
                  try {
                    const data = await response.json();
                    if (data.length > 0) {
                      const questionId = data[0];
                      const questionTitle = data[1];
                      const questionAnswerA = data[2];
                      const questionAnswerB = data[3];
                      const questionAnswerC = data[4];
                      const questionAnswerD = data[5];
                      const questionCorrectAnswer = data[6];
                      const questionNumber = data[7];
                      const questionType = data[8];
                      const questionDuration = data[9];

                    }
                  } catch (error) {
                    console.error(error);
                    alert('Invalid JSON response.');
                  }
                } else {
                  alert('Invalid or empty response.');
                }
        }
    }

    const checkIfCorrect = (question) => {
      const getEndpoint = `${apiUrl}/getCorrectAnswer?action=getCorrectAnswer&gameid=${lobbyId}&question=${question}`;

      try {
        const response = fetch(getEndpoint);

        if (response.ok) {
          try {
            const data = response.text();

            // Check if data is not undefined
            if (typeof data !== 'undefined' && data !== null) {
              const correctAnswer = data;

              if (correctAnswer === answerChosen) {
                handleScoreUpdate(username, 100);
              } else {
                // Handle incorrect answer case
                console.log('Incorrect answer');
              }
            } else {
              // Handle case where data is undefined or null
              console.log('Invalid data response.');
            }
          } catch (error) {
            // Handle errors in parsing the response text
            console.error(error);
            alert('Invalid response text.');
          }
        } else {
          // Handle non-OK response status
          console.log('Invalid or empty response.');
          alert('Invalid or empty response.');
        }
      } catch (error) {
        // Handle fetch error (e.g., network issues)
        console.error(error);
        alert('Error fetching data.');
      }
    };



    
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
            <h2>{questionText}</h2>
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
