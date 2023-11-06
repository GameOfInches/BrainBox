import React from 'react';
import HomePage from './components/HomePage';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css';
import LobbyPage from './components/LobbyPage';
import GameStart from './components/GameStart';

function App() {
    return (
      <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/lobby/:lobbyId" element={<LobbyPage />}/>
	  </Routes>
    );
}

export default App;

