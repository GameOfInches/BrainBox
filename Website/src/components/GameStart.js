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
  
function GameStart() {
    return (
        <div className="lobby-page">
              </div>
    );
}

export default GameStart;


