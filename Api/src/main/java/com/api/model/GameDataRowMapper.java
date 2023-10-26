package com.api.model;
import org.springframework.jdbc.core.RowMapper;
import java.sql.ResultSet;
import java.sql.SQLException;

public class GameDataRowMapper implements RowMapper<GetGameData> {
    @Override
    public GetGameData mapRow(ResultSet rs, int rowNum) throws SQLException {
        GetGameData gameData = new GetGameData();
        gameData.setGameid(rs.getString("lobbyId"));
        gameData.setCreatorUserId(rs.getString("creatorUserId"));
        gameData.setSecondUserId(rs.getString("secondUserId"));
        return gameData;
    }
}

