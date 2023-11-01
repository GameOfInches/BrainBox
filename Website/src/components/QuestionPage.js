import React, { useState, useEffect } from 'react';
import '../App.css';
import Timer from './Timer';
import AnswerPage from './AnswerPage';

const QuestionPage = ({ username, roundNumber, setRoundNumber, toNewRound, setToNewRound }) => {
    const [timeLeft, setTimeLeft] = useState(10);
    const [timeOut, setTimeOut] = useState(false);


    useEffect(() => {
        // Start the timer countdown
        const countdownInterval = setInterval(() => {
            if (timeLeft > 0) {
                setTimeLeft(timeLeft - 1);
            } else {
                clearInterval(countdownInterval);
                setTimeOut(true);
            }
        }, 1000);

        // Cleanup the interval on component unmount
        return () => {
            clearInterval(countdownInterval);
        };
    }, [timeLeft]);

    useEffect(() => {
        // Start the timer countdown
        return () => {
            setTimeOut(false)
            setTimeLeft(10)
        };
    }, [roundNumber]);


    return (
        <div className="question-card">

            {timeOut ? <AnswerPage username={username} roundNumber={roundNumber} setRoundNumber={setRoundNumber} toNewRound={toNewRound} setToNewRound={setToNewRound} /> : <><div className="">
                <Timer initialTime={10 * 1000} isPlaying={true} />
            </div>
                <div className="logo">
                    <img src="planet.png" alt="Logo" />
                </div>
                <div className="title">Memorize the card, {username}...</div>
                <div className="image-container">
                    <img src="card.jpg" alt="Card" />
                </div></>}

        </div>
    );
};
  
  export default QuestionPage;