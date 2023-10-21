import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';


function HomePage() {
    return (
        <div className="home-page">
            <div className="memorio-heading">
                MEM . <img className="planet-img" />R.io
            </div>
            <Link to="/lobby">
                <div className="play-button">PLAY</div>
            </Link>
            <div className="rules">
                    <h2>Rules</h2>
                    <ul>
                        <li>The game is organized in turns.</li>
                        <li>Once it is the player's turn, the player gets an image/video/audio and has to memorize all of its contents in 10 seconds.</li>
                        <li>When 10 seconds pass, the player gets a random question based on what they got. If the answer is correct, the player gets 100 points.</li>
                        <li>While the player is trying to answer the question, the other players have 5 seconds to guess if the player would answer the question correctly or not. The reward for a correct guess is 40 points.</li>
                        <li>The game lasts for 5 rounds, so every player will have to answer 5 questions in total.</li>
                    </ul>
            </div>
        </div>
    );
}

export default HomePage;

