import React, { useState, useEffect } from 'react';
import '../App.css';
import Timer from './Timer';
import AnswerPage from './AnswerPage';
import ReactPlayer from 'react-player';
import useSound from 'use-sound';
import Audio1 from '../Assets/Audio_1.mp3';
const QuestionPage = ({lobbyId, username, roundNumber, setRoundNumber, toNewRound, setToNewRound}) => {
    const [timeLeft, setTimeLeft] = useState(10);
    const [timeOut, setTimeOut] = useState(false);
    const [play, { stop }] = useSound(Audio1);
    //placeholder for questiontype
    const [questionType, setQuestionType] = useState("audio");


    //TODO: Fetch from the database the question and the image/video/audio and the type of the content
    

    useEffect(() => {
      // Start the timer countdown
      const countdownInterval = setInterval(() => {
        //this has to be changed when we get time per question from the database
        if (timeLeft == 9) {
          play();
        }
        if (timeLeft > 0) {
          setTimeLeft(timeLeft - 1);
        } else {
          clearInterval(countdownInterval);
          stop();
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


    //for video playing
    /* */
  

    //compare local username to the the one passed in argument?
    return (
      
      <div className="question-card">
        <div>Round {roundNumber}</div>
        {timeOut ? <AnswerPage username = {username} roundNumber = {roundNumber} setRoundNumber = {setRoundNumber} toNewRound = {toNewRound} setToNewRound = {setToNewRound}/> : <><div className="">
            <Timer initialTime={10 * 1000} isPlaying={true} />
          </div>
        <div className="logo">
          <img src="planet.png" alt="Logo" />
        </div>
        <div className="title">Memorize the contents, {username}...</div>
        {questionType === "audio" ? (
          <div className="audio-container">
             <img src="volume.png" alt="Sound icon" />
          </div>
        ) : questionType === "image" ? (
          <div className="image-container">
            <img src="card.jpg" alt="Card" />
          </div>
        ) : (
          <div className="video-container">
            <ReactPlayer
              url="https://youtu.be/vjhL4XS_6wY"
              width="360"
              height="720"
              playing={true}
              controls
            />
          </div>
        )}</>}
        
      </div>
         
    );
};
  
  export default QuestionPage;