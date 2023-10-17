package com.api.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.jdbc.core.JdbcTemplate;
import com.api.model.GameData;


@RestController
@RequestMapping("/api")
class GameController {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public GameController(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @PostMapping("/insert")
    public ResponseEntity<String> insertData(@RequestBody GameData gameData) {
        if (gameData.getAction() != null && gameData.getAction().equals("databaseInsert")) {
        try {
            String sql = "INSERT INTO BrainBox_lobbies (lobbyId, creatorUserId, secondUserId, creationTimestamp) VALUES (?, ?, ?, ?)";
            jdbcTemplate.update(sql, gameData.getGameid(), gameData.getUser1(), gameData.getUser2(), gameData.getTimestamp());
            return ResponseEntity.ok("Data inserted successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: Failed to insert data.");
        }
        } else{
           return ResponseEntity.badRequest().body("Invalid 'action' parameter. It must be 'databaseInsert'."); 
        }
    }
}

