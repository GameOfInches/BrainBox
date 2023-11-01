import React from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import '../App.css';

const Timer = ({ initialTime, isPlaying }) => {
  const timerSize = 72; // Size in pixels
  const timerDuration = initialTime / 1000; // Convert milliseconds to seconds

  return (
    <div className="">
      <CountdownCircleTimer
        duration={timerDuration}
        size={timerSize}
        strokeWidth={6}
        trailColor="#D4D4D4"
        colors={[['#FF0000', 0.33], ['#FFFF00', 0.33], ['#00FF00', 0.34]]}
        isPlaying = {isPlaying}
      >
        {({ remainingTime }) => remainingTime}
      </CountdownCircleTimer>
    </div>
  );
};

export default Timer;
