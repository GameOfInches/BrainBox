import React, {useState, useEffect } from 'react';
import Timer from './Timer';
import '../App.css';
import GameStart from './GameStart';

const AnswerPage= ({score, setScore, lobbyId, questionType, username, roundNumber, setRoundNumber, toNewRound, setToNewRound}) => {
  const [timeLeft, setTimeLeft] = useState(10);
  const [timeOut, setTimeOut] = useState(false);
  const [answerChosen, setAnswerChosen] = useState(5);
  const [answerIsCorrect, setAnswerIsCorrect] = useState(0);
  const apiUrl = 'http://localhost:8080/api';

//placeholders
const [fetchingComplete, setFetchingComplete] = useState(false)
const [questionText, setQuestionText] = useState("")
const [options, setOptions] = useState([])
const [correctAnswer, setCorrectAnswer] = useState(0)

useEffect(() => {
  if (questionType == "image"){
    setQuestionText("What is Ukraine the largest producer of?")
    setOptions(["Iron ore",	"Wheat",	"Grain",	"Sunflower seeds"])
    setCorrectAnswer(3)
  }
  else if (questionType == "audio"){
    setQuestionText("How did the authorities respond to the Dancing Plague of 1518?")
    setOptions(["They isolated and quarantined the affected individuals.",	"They banned all forms of dancing.",	"They imposed curfews to prevent dancing.",	"They encouraged more dancing, hoping it would cure the afflicted."])
    setCorrectAnswer(3)
  }
  else if (questionType == "video"){
    setQuestionText("What was one of Abraham Lincoln's remarkable skills?")
    setOptions(["He was a proficient musician.",	"He was a renowned painter.",	"He was a skilled wrestler.",	"He was a talented sculptor."])
    setCorrectAnswer(2)
  }
  return () => {
  };
}, [fetchingComplete]);
  


  useEffect(() => {
    // Start the timer countdown
    const countdownInterval = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1);
        if (!fetchingComplete){
          setFetchingComplete(true)
        }
      } else {
        clearInterval(countdownInterval);
        console.log("timeout")
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
    if (answerChosen != 5){
      console.log("answer chosen")
      console.log("correct answer" + correctAnswer)
      console.log("answer chosen" + answerChosen)
      if (answerChosen == correctAnswer){
        console.log("correct answer")
        setAnswerIsCorrect(2)
      }
      else{
        console.log("incorrect answer")
        setAnswerIsCorrect(1)
      }
    }
    return () => {
      
      if (answerIsCorrect){
          setScore(score + 100);
          //handleScoreUpdate(username, score)
      }
      setRoundNumber(roundNumber + 1)
      setToNewRound(true)
      wait(2000);
    };
  }, [timeOut, answerChosen]);

  
    const handleAnswerClick = (index) => {
      // Implement your logic to handle the selected answer.
      console.log("Answer clicked" + index)
      console.log(index)
      setAnswerChosen(index)
    };

    /*
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
    */

    /*const fetchQuestion = () => {
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
    }*/

    /*
    const checkIfCorrect = async (question) => {
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
                //handleScoreUpdate(username, 100);
                setScore(score + 100);
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
*/


    
      return (
        <div className="answer-page">
          <div className="">
            <Timer initialTime={10 * 1000} isPlaying={answerChosen == 5}/> 
          </div>
          <div>Score is: {score}</div>
          {timeOut ? <div> Time's up! </div> 
                 : answerIsCorrect == 2 && answerChosen != 5 ? <div>Answer is correct!</div>
                      : answerIsCorrect == 1 && answerChosen != 5 ? <div>Answer is incorrect!</div>
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
                onClick={() => handleAnswerClick(index )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      );
    }
  
  export default AnswerPage;
