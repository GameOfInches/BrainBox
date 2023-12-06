import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import QuestionPage from './QuestionPage';
import ResultsPage from './ResultsPage';
  
function GameStart() {
  var userOne = localStorage['userOne'] || 'Player 1';
  var userTwo = localStorage['userTwo'] || 'Player 2';
  const lobbyId = localStorage['lobbyId'] || 'undefined';
  const [isDisplayed, setIsDisplayed] = useState(false);
  const [userOneScore, setUserOneScore] = useState(0);
  const [userTwoScore, setUserTwoScore] = useState(0);

  const [turnOfPlayer, setTurnOfPlayer] = useState(1);
  const [numberOfRounds, setNumberOfRounds] = useState(5);
  const [roundNumber, setRoundNumber] = useState(1);
  const [toNewRound, setToNewRound] = useState(false);


  useEffect(() => {
    setInterval(() => {
      setIsDisplayed(true);
    }, 3000);
  }, []);


    //placeholders
    const firstQuestionType = useState("video");
    const secondQuestionType = useState("audio");
    const thirdQuestionType = useState("card");
    const firstQuestionDuration = useState(49);
    const secondQuestionDuration = useState(34);
    const thirdQuestionDuration = useState(10);
    
console.log("Round number: " + roundNumber)
    return (
      <div>
            <div className="logo"></div>
          {!isDisplayed ? <div className="welcome-text">WELCOME TO MEMOR.IO! . . .</div> :
           {roundNumber} >= 5 ? <ResultsPage /> 
           : roundNumber == 1 ? <QuestionPage questionType = {firstQuestionType} questionDuration = {firstQuestionDuration} score = {userOneScore} setScore = {setUserOneScore} username = {userOne} lobbyId={lobbyId} roundNumber = {roundNumber} setRoundNumber = {setRoundNumber} toNewRound = {toNewRound} setToNewRound = {setToNewRound}/>
           : roundNumber == 2 ? <QuestionPage questionType = {secondQuestionType} questionDuration = {secondQuestionDuration} score = {userTwoScore} setScore = {setUserTwoScore} username = {userTwo} lobbyId={lobbyId} roundNumber = {roundNumber} setRoundNumber = {setRoundNumber} toNewRound = {toNewRound} setToNewRound = {setToNewRound}/>
           : roundNumber == 3 ? <QuestionPage questionType = {thirdQuestionType} questionDuration = {thirdQuestionDuration} score = {userOneScore} setScore = {setUserOneScore} username = {userOne} lobbyId={lobbyId} roundNumber = {roundNumber} setRoundNumber = {setRoundNumber} toNewRound = {toNewRound} setToNewRound = {setToNewRound}/>
           : <ResultsPage userOne = {userOne} userTwo = {userTwo} userOneScore = {userOneScore} userTwoScore = {userTwoScore}/> }
           </div>
      );

}

export default GameStart;