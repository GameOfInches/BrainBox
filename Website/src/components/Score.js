import { useState, useEffect } from "react";


const Score = ({user, score }) => {
    const timerSize = 72; // Size in pixels
    const timerDuration = initialTime / 1000; // Convert milliseconds to seconds
  
    return (
      <div className="">
        Score of Player 1: {user.score}
        Score of Player 2: {user.score}
      </div>
    );
  };

export default Score;