import { useState, useEffect } from "react";


const Score = ({user, score }) => {
    ///TO-DO: import score from the database

    return (
      <div className="">
        Score of Player 1: {user.score}
        Score of Player 2: {user.score}
      </div>
    );
  };

export default Score;
