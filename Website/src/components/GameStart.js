import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import QuestionPage from './QuestionPage';
import ResultsPage from './ResultsPage';
  
function GameStart() {
  var userOne = localStorage['userOne'] || 'Player 1';
  var userTwo = localStorage['userTwo'] || 'Player 2';
  const lobbyId = localStorage['lobbyId'] || 'undefined';
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

//TODO KRASI: fetch lobbyId?

//console.log ("Lobby: " + lobbyId)
console.log("Round number: " + roundNumber)
    return (
      <div>
            <div className="logo"></div>
          {!isDisplayed ? <div className="welcome-text">WELCOME TO MEMOR.IO! . . .</div> :
           {roundNumber} >= 5 ? <ResultsPage /> 
           : roundNumber == 1 ? <QuestionPage username = {userOne} lobbyId={lobbyId} roundNumber = {roundNumber} setRoundNumber = {setRoundNumber} toNewRound = {toNewRound} setToNewRound = {setToNewRound}/>
           : roundNumber == 2 ? <QuestionPage username = {userTwo} lobbyId={lobbyId} roundNumber = {roundNumber} setRoundNumber = {setRoundNumber} toNewRound = {toNewRound} setToNewRound = {setToNewRound}/>
           : roundNumber == 3 ? <QuestionPage username = {userOne} lobbyId={lobbyId} roundNumber = {roundNumber} setRoundNumber = {setRoundNumber} toNewRound = {toNewRound} setToNewRound = {setToNewRound}/>
           : roundNumber == 4 ? <QuestionPage username = {userTwo} lobbyId={lobbyId} roundNumber = {roundNumber} setRoundNumber = {setRoundNumber} toNewRound = {toNewRound} setToNewRound = {setToNewRound}/>
           : <ResultsPage /> }
           </div>
      );

}

export default GameStart;