import React, { useState, useEffect } from 'react';
import '../App.css';
import Timer from './Timer';
import AnswerPage from './AnswerPage';
import ReactPlayer from 'react-player';
import useSound from 'use-sound';
import Audio5 from '../Assets/Audio_5.mp3';
import Card from '../Assets/Img_11.png'; // with import
const QuestionPage = ({score, setScore, lobbyId, questionType, questionDuration, username, roundNumber, setRoundNumber, toNewRound, setToNewRound}) => {
    
const [timeOut, setTimeOut] = useState(false);
const [play, { stop }] = useSound(Audio5);

    //TODO: Fetch from the database the question and the image/video/audio and the type of the content

    const [timeLeft, setTimeLeft] = useState(questionDuration);
    const [playing, setPlaying] = useState(false);

    
    useEffect(() => {
      // Start the timer countdown
      const countdownInterval = setInterval(() => {
        //this has to be changed when we get time per question from the database
        if (timeLeft > 0) {
          if (questionType == "audio" ){
            if (!playing){
              console.log("playing")
              setPlaying(true)
              play()
            }
          }
          setTimeLeft(timeLeft - 1);
        } else {
          clearInterval(countdownInterval);
          if (questionType == "audio" ){
            stop();
            }
          
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
        setTimeLeft(questionDuration)
      };
    }, [roundNumber]);


    //for video playing
    /* */
  
    //compare local username to the the one passed in argument?
    return (

          <div className="question-card">
            <div>Round {roundNumber}</div>
            {timeOut ? <AnswerPage score = {score} questionType = {questionType} setScore = {setScore} username = {username} roundNumber = {roundNumber} setRoundNumber = {setRoundNumber} toNewRound = {toNewRound} setToNewRound = {setToNewRound}/> : <><div className="">
                <Timer initialTime={questionDuration * 1000} isPlaying={true} />
              </div>
            <div className="logo">
              <img src="planet.png" alt="Logo" />
            </div>
            <div className="title">Memorize the contents, {username}...</div>
            {questionType === "audio" ? (
              <div className="audio-container">
              </div>
            ) : questionType === "image" ? (
              <div className="image-container">
                <img src={Card} class="card" />
              </div>
            ) : (
              <div>
                <ReactPlayer
                  className='video'
                  url="https://youtube.com/shorts/SQDyTIuepMM"
                  width='15.625rem'
                  height='25rem'
                  playing={true}
                  controls={false}
                />
              </div>
            )}</>}

          </div>

        );
    };

      export default QuestionPage;