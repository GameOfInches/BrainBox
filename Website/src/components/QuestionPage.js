import React, { useState, useEffect } from 'react';
import '../App.css';
import Timer from './Timer';
import AnswerPage from './AnswerPage';
import ReactPlayer from 'react-player';
const QuestionPage = ({lobbyId, username, roundNumber, setRoundNumber, toNewRound, setToNewRound}) => {
    const [timeLeft, setTimeLeft] = useState(10);
    const [timeOut, setTimeOut] = useState(false);

    //TODO: Fetch from the database the question and the image/video/audio and the type of the content
    
  
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


    //for video playing
    const videoSetting = {
      height: '390',
      width: '640',
      playerVars: {
        autoplay: 0,
      },
    };
  
    const onReady = (event) => {
      // access to player in all event handlers via event.target
      event.target.pauseVideo();
    };
    /* */
  
    return (
      <div className="question-card">
        <div>Round {roundNumber}</div>
       
        {timeOut ? <AnswerPage lobbyId = {lobbyId} username = {username} roundNumber = {roundNumber} setRoundNumber = {setRoundNumber} toNewRound = {toNewRound} setToNewRound = {setToNewRound}/> : <><div className="">
            <Timer initialTime={10 * 1000} isPlaying={true} />
          </div>
        <div className="logo">
          <img src="planet.png" alt="Logo" />
        </div>
        
        <div className="title">Memorize the card, {username}...</div>
        <div 
        className="image-container">
          <ReactPlayer
      url="<https://youtu.be/vjhL4XS_6wY>"
      width="640"
      height="360"
      playing={true}
      controls
    />
          <img src="card.jpg" alt="Card" />
        </div></>}
        
      </div>
         
    );
};
  
  export default QuestionPage;