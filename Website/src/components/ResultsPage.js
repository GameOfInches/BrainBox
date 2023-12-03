import { useState, useEffect } from "react";

//TODO: fetch scores of both players in the results page
//TODO: Logic to determine which player won




const ResultsPage= ({}) => {
  const [winningPlayer, setWinningPlayer] = useState('')
  const [winningPlayerScore, setWinningPlayerScore] = useState('')
  const [losingPlayer, setLosingPlayer] = useState(0)
  const [losingPlayerScore, setLosingPlayerScore] = useState(0)
  const [fetchingComplete, setFetchingComplete] = useState(false)
  
  useEffect(() => {
    if (username1.score > username2.score){
      setWinningPlayer(username1)
      setWinningPlayerScore(username1.score)
      setLosingPlayer(username2)
      setLosingPlayerScore(username2.score)
    }
    else{
      setWinningPlayer(username2)
      setWinningPlayerScore(username2.score)
      setLosingPlayer(username1)
      setLosingPlayerScore(username1.score)
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
  }, [fetchingComplete]);
  
  
  return (
    <div className="container">
      <h1 className="results-title">Results</h1>
      <h2 className="player-win-text">PLAYER {winningPlayer} WINS!</h2>

      <div className="player-box player-win-box">
        <h2>Player {winningPlayer} </h2>
        <p className="points">Points: {winningPlayerScore} </p>
      </div>

      <div className="player-box player-lose-box">
        <h2>Player {losingPlayer} </h2>
        <p className="points">Points: {losingPlayerScore}</p>
      </div>

      <div>
        <div className="play-again-button">
          <Link to="/">Play again!</Link>
        </div>
      </div>

      <div className="logo"></div>

      <a href="index.html">
        <div className="home-button">
          <i className="fas fa-home"></i>
        </div>
      </a>
    </div>
  );
};

export default ResultsPage;
