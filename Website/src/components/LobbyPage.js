import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const handleGameStartClick = () => {
    //To-DO: Check if lobby is full before start, if not - throw an error
    const lobbyfull = 0;
    
    if(lobbyfull){
        //the game starts
        <Link to="/game">
            </Link>
    }
    else{
      //To-DO: throw an error
    }
  }
  
function LobbyPage() {
    return (
        <div className="lobby-page">
            <div className="logo"></div>
            <Link to="/">
                <div className="home-button">
                    <i className="fas fa-home"></i>
                </div>
            </Link>
            <div className="lobby-heading">LOBBY</div>
            <div className="send-link">Send this link to a friend to join this lobby!</div>
            <div className="players-container">
                <div className="player1">PLAYER 1</div>
                <div className="player2">PLAYER 2</div>
            </div>
            <div className="start-game-button" onClick={() => this.handleGameStartClick()}>START GAME</div>
        </div>
    );
}

export default LobbyPage;


