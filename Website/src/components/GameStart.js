import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import QuestionPage from './QuestionPage';
import ResultsPage from './ResultsPage';
  
function GameStart() {
  var userOne = localStorage['userOne'] || 'Player 1';
  var userTwo = localStorage['userTwo'] || 'Player 2';
  const [isDisplayed, setIsDisplayed] = useState(false);

  const [turnOfPlayer, setTurnOfPlayer] = useState(1);
  const [numberOfRounds, setNumberOfRounds] = useState(5);
  const [roundNumber, setRoundNumber] = useState(1);
  const [toNewRound, setToNewRound] = useState(false);


  useEffect(() => {
    setInterval(() => {
      setIsDisplayed(true);
    }, 3000);
  }, []);

//console.log ("Lobby: " + lobbyId)
console.log("Round number: " + roundNumber)
    return (
      <div>
            <div className="logo"></div>
          {!isDisplayed ? <div className="welcome-text">WELCOME TO MEMOR.IO! . . .</div> :
           {roundNumber} >= 4 ? <ResultsPage /> 
           : roundNumber == 1 ? <QuestionPage username = {userOne} roundNumber = {roundNumber} setRoundNumber = {setRoundNumber} toNewRound = {toNewRound} setToNewRound = {setToNewRound}/>
           : roundNumber == 2 ? <QuestionPage username = {userTwo} roundNumber = {roundNumber} setRoundNumber = {setRoundNumber} toNewRound = {toNewRound} setToNewRound = {setToNewRound}/>
           : roundNumber == 3 ? <QuestionPage username = {userOne} roundNumber = {roundNumber} setRoundNumber = {setRoundNumber} toNewRound = {toNewRound} setToNewRound = {setToNewRound}/>
           : <ResultsPage /> }
           </div>
      );

}

export default GameStart;