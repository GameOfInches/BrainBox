package com.api.model;

public class Lobby {
    private String lobbyId;
    private String player1;
    private String player2;

    public Lobby(String lobbyId) {
        this.lobbyId = lobbyId;
        this.player1 = null;
        this.player2 = null;
    }

    public String getLobbyId() {
        return lobbyId;
    }

    public String getPlayer1() {
        return player1;
    }

    public void setPlayer1(String player1) {
        this.player1 = player1;
    }

    public String getPlayer2() {
        return player2;
    }

    public void setPlayer2(String player2) {
        this.player2 = player2;
    }
}

