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
  const [toNewRound, setToNewRound] = useState(false);


  useEffect(() => {
    setInterval(() => {
      setIsDisplayed(true);
    }, 3000);
  }, []);

console.log("Round number: " + roundNumber)
    return (
      <div>
            <div className="logo"></div>
          {!isDisplayed ? <div className="welcome-text">WELCOME TO MEMOR.IO! . . .</div> :
           {roundNumber} >= 4 ? <ResultsPage /> 
           : roundNumber == 1 ? <QuestionPage username = {username} roundNumber = {roundNumber} setRoundNumber = {setRoundNumber} toNewRound = {toNewRound} setToNewRound = {setToNewRound}/>
           : roundNumber == 2 ? <QuestionPage username = {username} roundNumber = {roundNumber} setRoundNumber = {setRoundNumber} toNewRound = {toNewRound} setToNewRound = {setToNewRound}/>
           : roundNumber == 3 ? <QuestionPage username = {username} roundNumber = {roundNumber} setRoundNumber = {setRoundNumber} toNewRound = {toNewRound} setToNewRound = {setToNewRound}/>
           : <ResultsPage /> }
           </div>
      );

}

export default GameStart;

//        {roundNumber >= 6 ? <ResultsPage /> : isDisplayed ? <QuestionPage username = {username} roundNumber = {roundNumber} setRoundNumber = {setRoundNumber} toNewRound = {toNewRound} setToNewRound = {setToNewRound}/> : <div className="welcome-text">WELCOME TO MEMOR.IO! . . .</div>}





//        {roundNumber >= 6 ? <ResultsPage /> : isDisplayed ? <QuestionPage username = {username} roundNumber = {roundNumber} setRoundNumber = {setRoundNumber} toNewRound = {toNewRound} setToNewRound = {setToNewRound}/> : <div className="welcome-text">WELCOME TO MEMOR.IO! . . .</div>}
     