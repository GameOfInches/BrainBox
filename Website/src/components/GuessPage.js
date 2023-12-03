import React, { Component } from 'react';
import Timer from './Timer';
import '../App.css';

const apiUrl = 'http://localhost:8080/api';
const options = ["Yes", "No"]
const GuessPage = ({username}) => {

  const [answerChosen, setAnswerChosen] = useState(false);
  const [answerIsCorrect, setAnswerIsCorrect] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10);
  const [timeOut, setTimeOut] = useState(false);

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


const checkIfCorrect = async (questionNumber, lobbyId) => {
        const getEndpoint = `${apiUrl}/get`;
          const response = await fetch(`${getEndpoint}?action=getAnsweredCorrectly&gameid=${lobbyId}&question=${questionNumber}`);
          if (response.ok) {
            try {
              const data = await response.json();
              if (data.length > 0) {
                 if (data === 'True') {
                             setAnswerIsCorrect(true);
                             addPointsToGuesser(40);
                         } else {
                             setAnswerIsCorrect(false);
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

      const handleGuessAnswerClick = (option) => {
        // Implement your logic to handle the selected answer.
        console.log("Answer clicked")
        setAnswerChosen(true)
      };

      useEffect(() => {
    if (timeOut){
      console.log("time out")
    }
    else if (answerChosen){
      console.log("answer chosen")
      handleScoreUpdate(username, score)
      checkIfCorrect(questionNumber, lobbyId)
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



    return (
      <div className="answer-page">
        <div className="timer">
          <Timer initialTime={10 * 1000}  onCompletion={this.handleTimerCompletion}/> {10000}
        </div>
        <div className="logo">
          <img src="planet.png" alt="Logo" />
        </div>
        <div className="question" >Is this player going to guess correctly?</div>
        {timeOut ? <div> Time's up! </div>  
          : answerIsCorrect ? <div>Answer is correct!</div>
          : !answerIsCorrect && answerChosen ? <div>Answer is incorrect!</div>
          :  <div className="options">
            {options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleGuessAnswerClick(option)}
              >
                {option}
              </button>
            ))}
          </div>}
        </div>
    )
  }

export default GuessPage;