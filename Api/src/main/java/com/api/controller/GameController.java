package com.api.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.List;
import com.api.model.GameData;
import com.api.model.GetGameData;
import com.api.model.GameDataRowMapper;


@RestController
@CrossOrigin(origins = "http://localhost:8081")
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
            String sql = "INSERT INTO BrainBox_lobbies (lobbyId, creatorUserId, secondUserId) VALUES (?, ?, ?)";
            jdbcTemplate.update(sql, gameData.getGameid(), gameData.getUser1(), gameData.getUser2());
            return ResponseEntity.ok("Data inserted successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: Failed to insert data.");
        }
        } else{
           return ResponseEntity.badRequest().body("Invalid 'action' parameter. It must be 'databaseInsert'."); 
        }
    }
    @PostMapping("/update")
    public ResponseEntity<String> updateData(@RequestBody GameData gameData) {
        if (gameData.getAction() != null && gameData.getAction().equals("userUpdate")) {
        try {
            String sql = "UPDATE BrainBox_lobbies SET secondUserId = ? WHERE lobbyId = ?";
            jdbcTemplate.update(sql, gameData.getUser2(), gameData.getGameid());
            return ResponseEntity.ok("User 2 data successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: Failed to update user 2 data.");
        }
        } else{
           return ResponseEntity.badRequest().body("Invalid 'action' parameter. It must be 'userUpdate'."); 
        }
    }

    @GetMapping("/get")
    public ResponseEntity<List<GetGameData>> getData(@RequestParam("action") String action, @RequestParam("gameid") String gameid) {
    try {
        System.out.println("Received GET request with action: " + action + " and gameid: " + gameid);

        if ("databaseFetch".equals(action)) {
            String sql = "SELECT * FROM BrainBox_lobbies WHERE lobbyId = ?";
            List<GetGameData> gameDataList = jdbcTemplate.query(sql, new GameDataRowMapper(), gameid);

            if (gameDataList != null && !gameDataList.isEmpty()) {
                System.out.println("Query executed successfully. Data fetched: " + gameDataList);
                return ResponseEntity.ok(gameDataList);
            } else {
                System.out.println("No data found for gameid: " + gameid);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } else {
            System.out.println("Invalid 'action' parameter. It must be 'databaseFetch'.");
            return ResponseEntity.badRequest().body(null);
        }
        } catch (Exception e) {
        e.printStackTrace();
        System.err.println("Error occurred while processing the request.");
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @PostMapping("/create")
    public ResponseEntity<String> createTable(@RequestBody GameData gameData) {
        if (gameData.getAction() != null && gameData.getAction().equals("tableCreate")) {
        try {
            String newTable = "BrainBox_" + gameData.getGameid();
            String sql = "CREATE TABLE " + newTable + " (Id TINYINT(20) PRIMARY KEY, questionName VARCHAR(255), questionAnswerA VARCHAR(255), questionAnswerB VARCHAR(255), questionAnswerC VARCHAR(255), questionAnswerD VARCHAR(255), correctAnswer VARCHAR(1), player1 VARCHAR(255), player2 VARCHAR(255), pointsPlayer1 INT, pointsPlayer2 INT, answeredCorrectly VARCHAR(10))";
            System.out.println("Table created successfully for lobby " + gameData.getGameid());
            jdbcTemplate.update(sql);

            sql = "INSERT INTO " + newTable + " (Id, questionName, questionAnswerA, questionAnswerB, questionAnswerC, questionAnswerD, correctAnswer, player1, player2, pointsPlayer1, pointsPlayer2, answeredCorrectly) SELECT DISTINCT NULL as Id, questionName, questionAnswerA, questionAnswerB, questionAnswerC, questionAnswerD, correctAnswer, ? as player1, ? as player2, 0 as pointsPlayer1, 0 as pointsPlayer2, '' as answeredCorrectly FROM BrainBox_questions ORDER BY RAND() LIMIT 10";
            jdbcTemplate.update(sql, gameData.getUser1(), gameData.getUser2());
            System.out.println("Questions inserted successfully for lobby " + gameData.getGameid());
            return ResponseEntity.ok("Table created successfully.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: Failed to create table.");
        }
        } else{
           return ResponseEntity.badRequest().body("Invalid 'action' parameter. It must be 'tableCreate'."); 
        }
    }



}

