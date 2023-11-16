import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function HomePage() {
  const [showUsernameInput, setShowUsernameInput] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handlePlayClick = () => {
    if (!showUsernameInput) {
      setShowUsernameInput(true);
    }
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = () => {
    const apiUrl = 'http://localhost:8080/api';
    const insertEndpoint = `${apiUrl}/insert`;
    if (username.trim() !== '') {
      const lobbyId = generateRandomString(10);
      
      // Send a POST request to your API
      fetch(insertEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          action: 'databaseInsert',
          user1: username,
          user2: '0',
          gameid: lobbyId
        }),
      })
        .then((response) => {
          if (response.ok) {
            const newURL = `/lobby/${lobbyId}`;
            navigate(newURL, { state: { username } });
          } else {
            console.error('Failed to create lobby:', response.status);
          }
        })
        .catch((error) => {
          console.error('Error sending API request:', error);
        });
    } 
    else {
      alert('No name has been provided! Failed creating a lobby!');
    }
  };

  const generateRandomString = (length) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  };

  return (
    <div className="home-page">
      <div className="memorio-heading">
        MEM . <img className="planet-img" alt="Planet" />
        R.io
      </div>
      {showUsernameInput ? (
        <div className="username-input">
          <h2>Enter Your Username</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
          />
          <button onClick={handleSubmit}>Play</button>
        </div>
      ) : (
        <div className="play-button" onClick={handlePlayClick}>
          {showUsernameInput ? 'ENTER' : 'PLAY NOW!'}
        </div>
      )}
      <div className="rules">
        <h2>Rules</h2>
        <ul>
          <li>The game is organized in turns.</li>
          <li>Once it is the player's turn, the player gets an image/video/audio and has to memorize all of its contents in 10 seconds.</li>
          <li>When 10 seconds pass, the player gets a random question based on what they got. If the answer is correct, the player gets 100 points.</li>
          <li>
            While the player is trying to answer the question, the other players have 5 seconds to guess if the player would answer the question correctly or not. The reward for a correct guess is 40 points.
          </li>
          <li>The game lasts for 5 rounds, so every player will have to answer 5 questions in total.</li>
        </ul>
      </div>
    </div>
  );
}

export default HomePage;



