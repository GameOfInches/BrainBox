import { useState, useEffect } from "react";

//TODO: fetch scores of both players in the results page
//TODO: Logic to determine which player won

const ResultsPage= ({}) => {
  return (
    <div className="container">
      <h1 className="results-title">Results</h1>
      <h2 className="player-win-text">PLAYER ... WINS!</h2>

      <div className="player-box player-win-box">
        <h2>PLAYER ...</h2>
        <p className="points">POINTS: </p>
      </div>

      <div className="player-box player-lose-box">
        <h2>PLAYER ...</h2>
        <p className="points">POINTS: </p>
      </div>

      <a href="index.html">
        <div className="play-again-button">
          <button>PLAY AGAIN!</button>
        </div>
      </a>

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
