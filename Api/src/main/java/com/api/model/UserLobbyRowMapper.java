package com.api.model;
import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UserLobbyRowMapper implements RowMapper<UserLobbyGameData> {
    @Override
    public UserLobbyGameData mapRow(ResultSet rs, int rowNum) throws SQLException {
        UserLobbyGameData lobbyData = new UserLobbyGameData();
        lobbyData.setPlayer1(rs.getString("player1"));
        lobbyData.setPlayer2(rs.getString("player2"));
        return lobbyData;
    }
}
