package com.api.model;

public class GetGameData {
    private String creatorUserId;
    private String secondUserId;
    private String action;
    private String gameid;


    public String getAction() {
        return action;
    }

    public void setAction(String action) {
        this.action = action;
    }

    public String getGameid() {
        return gameid;
    }

    public void setGameid(String gameid) {
        this.gameid = gameid;
    }

    public String getCreatorUserId() {
        return creatorUserId;
    }

    public void setCreatorUserId(String creatorUserId) {
        this.creatorUserId = creatorUserId;
    }

    public String getSecondUserId() {
        return secondUserId;
    }

    public void setSecondUserId(String secondUserId) {
        this.secondUserId = secondUserId;
    }
}
