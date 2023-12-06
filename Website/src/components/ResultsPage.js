import { useState, useEffect, Link } from "react";

//TODO: fetch scores of both players in the results page
//TODO: Logic to determine which player won




const ResultsPage= ({userOne, userTwo, userOneScore, userTwoScore}) => {
  const [winningPlayer, setWinningPlayer] = useState('')
  const [winningPlayerScore, setWinningPlayerScore] = useState('')
  const [losingPlayer, setLosingPlayer] = useState(0)
  const [losingPlayerScore, setLosingPlayerScore] = useState(0)
  const [fetchingComplete, setFetchingComplete] = useState(false)
  
  setFetchingComplete(true)

  useEffect(() => {
    if (userOneScore > userTwoScore){
      setWinningPlayer(userOne)
      setWinningPlayerScore(userOneScore)
      setLosingPlayer(userTwo)
      setLosingPlayerScore(userTwoScore)
    }
    else{
      setWinningPlayer(userTwo)
      setWinningPlayerScore(userTwoScore)
      setLosingPlayer(userOne)
      setLosingPlayerScore(userOneScore)
    }
    return () => {
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

      <Link to="/">Play again!
        <div className="home-button">
          <i className="fas fa-home"></i>
        </div>
      </Link>
    </div>
  );
};

export default ResultsPage;
