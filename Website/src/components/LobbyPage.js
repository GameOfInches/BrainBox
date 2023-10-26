import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

function LobbyPage() {
  const { lobbyId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [lobbies, setLobbies] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const apiUrl = 'http://localhost:8080/api';
      const getEndpoint = `${apiUrl}/get`;
      try {
        const response = await fetch(`${getEndpoint}?action=databaseFetch&gameid=${lobbyId}`);
        if (response.ok) {
          try {
            const data = await response.json();
            if (data.length > 0) {
              // Assuming data is an array with player1 and player2 properties
              const { creatorUserId, secondUserId } = data[0];
              setLobbies({ ...lobbies, [lobbyId]: { player1: creatorUserId, player2: secondUserId } });
            }
          } catch (error) {
            // Handle invalid JSON response
            console.error(error);
            alert('Invalid JSON response.');
          }
        } else {
          // Handle non-successful response (e.g., 404 Not Found)
          setLoading(false);
          alert('Lobby not found. Redirecting to homepage.');
          navigate('/');
        }

        setLoading(false);
      } catch (error) {
        // Handle network errors
        console.error(error);
        setLoading(false);
        alert('Error fetching lobby data.');
      }
    };

    fetchData();
  }, [lobbyId, location]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const currentLobby = lobbies[lobbyId] || { player1: '', player2: '' };

  return (
    <div className="lobby-page">
      <div className="logo"></div>
      <div className="lobby-heading">LOBBY</div>
      <div className="send-link">Send this link to a friend to join this lobby!</div>
      <div className="players-container">
        <div className="player1">PLAYER 1: {currentLobby.player1}</div>
        <div className="player2">PLAYER 2: {currentLobby.player2}</div>
      </div>
      <div className="start-game-button">START GAME</div>
    </div>
  );
}

export default LobbyPage;



