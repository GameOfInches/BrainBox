package com.api.controller;
import com.api.model.*;
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
    @GetMapping("/getAnsweredCorrectly")
    public ResponseEntity<String> getAnsweredCorrectly(@RequestParam("action") String action, @RequestParam("gameid") String gameid, @RequestParam("question") int question) {
        try {
            System.out.println("Received GET request with action: " + action + " and gameid: " + gameid);

            if ("getAnsweredCorrectly".equals(action)) {
                String tableName = "BrainBox_" + gameid;
                String sql = "SELECT answeredCorrectly FROM " + tableName + "  WHERE Id = ?";
                String answeredCorrectly = jdbcTemplate.query(sql, new GameDataRowMapper(), question).toString();

                if (answeredCorrectly != null && !answeredCorrectly.isEmpty()) {
                    System.out.println("Query executed successfully. Data fetched: " + answeredCorrectly);
                    return new ResponseEntity<>(answeredCorrectly, HttpStatus.OK);
                } else {
                    System.out.println("No data found for question: " + question);
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
                }
            } else {
                System.out.println("Invalid 'action' parameter. It must be 'getAnsweredCorrectly'.");
                return ResponseEntity.badRequest().body(null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Error occurred while processing the request.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/getCorrectAnswer")
    public ResponseEntity<String> getCorrectAnswer(@RequestParam("action") String action, @RequestParam("gameid") String gameid, @RequestParam("question") int question) {
        try {
            System.out.println("Received GET request with action: " + action + " and gameid: " + gameid);

            if ("getCorrectAnswer".equals(action)) {
                String tableName = "BrainBox_" + gameid;
                String sql = "SELECT correctAnswer FROM " + tableName + "  WHERE Id = ?";
                String correctAnswer = jdbcTemplate.query(sql, new GameDataRowMapper(), question).toString();

                if (correctAnswer != null && !correctAnswer.isEmpty()) {
                    System.out.println("Query executed successfully. Data fetched: " + correctAnswer);
                    return new ResponseEntity<>(correctAnswer, HttpStatus.OK);
                } else {
                    System.out.println("No data found for question: " + question);
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
                }
            } else {
                System.out.println("Invalid 'action' parameter. It must be 'getCorrectAnswer'.");
                return ResponseEntity.badRequest().body(null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.err.println("Error occurred while processing the request.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/getQuestion")
    public ResponseEntity<List<QuestionData>> getQuestion(@RequestParam("action") String action, @RequestParam("gameid") String gameid) {
        try {
            System.out.println("Received GET request with action: " + action + " and gameid: " + gameid);

            if ("getQuestion".equals(action)) {
                String sqlTable = "BrainBox_" + gameid;
                String sql = "SELECT Id, questionTitle, questionAnswerA, questionAnswerB, questionAnswerC, questionAnswerD, correctAnswer, questionNumber, type, duration FROM " + sqlTable + " ORDER BY RAND() LIMIT 1";
                List<QuestionData> questionDataList = jdbcTemplate.query(sql, new QuestionDataRowMapper());

                if (questionDataList != null && !questionDataList.isEmpty()) {
                    System.out.println("Query executed successfully. Data fetched: " + questionDataList);
                    return ResponseEntity.ok(questionDataList);
                } else {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
                }
            } else {
                System.out.println("Invalid 'action' parameter. It must be 'getQuestion'.");
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
            String sql = "CREATE TABLE " + newTable + " (Id TINYINT(20) PRIMARY KEY AUTO_INCREMENT, questionName VARCHAR(255), questionAnswerA VARCHAR(255), questionAnswerB VARCHAR(255), questionAnswerC VARCHAR(255), questionAnswerD VARCHAR(255), correctAnswer VARCHAR(1), questionNumber TINYINT(20), type VARCHAR(10), duration TINYINT(100), player1 VARCHAR(255), player2 VARCHAR(255), pointsPlayer1 INT, pointsPlayer2 INT, answeredCorrectly VARCHAR(10))";
            System.out.println("Table created successfully for lobby " + gameData.getGameid());
            jdbcTemplate.update(sql);

            sql = "INSERT INTO " + newTable + " (Id, questionName, questionAnswerA, questionAnswerB, questionAnswerC, questionAnswerD, correctAnswer, questionNumber, type, duration, player1, player2, pointsPlayer1, pointsPlayer2, answeredCorrectly) SELECT DISTINCT NULL as Id, questionName, questionAnswerA, questionAnswerB, questionAnswerC, questionAnswerD, correctAnswer, questionNumber, type, duration, ? as player1, ? as player2, 0 as pointsPlayer1, 0 as pointsPlayer2, '' as answeredCorrectly FROM BrainBox_questions ORDER BY RAND() LIMIT 10";
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


    @PostMapping("/score")
    public ResponseEntity<String> createTable(@RequestParam("action") String action,
                                          @RequestParam("user") String user, 
                                          @RequestParam("score") int score, 
                                          @RequestParam("gameid") String gameid) {
    if (action != null && action.equals("scoreUpdate")) {
        try {
            String newTable = "BrainBox_" + gameid;

            String selectSql = "SELECT player1, player2  FROM " + newTable + " LIMIT 1";
            List<UserLobbyGameData> lobbyList = jdbcTemplate.query(selectSql, new UserLobbyRowMapper());

            if (!lobbyList.isEmpty() && lobbyList.get(0).getPlayer1().equals(user)) {
                String updateSql = "UPDATE " + newTable + " SET pointsPlayer1 = " + score + " WHERE player1 = '" + user + "'";
                jdbcTemplate.update(updateSql);
                System.out.println("Score inserted successfully for user " + user);
                return ResponseEntity.ok("Score updated successfully.");
            } else {
                String updateSql = "UPDATE " + newTable + " SET pointsPlayer2 = " + score + " WHERE player2 = '" + user + "'";
                jdbcTemplate.update(updateSql);
                System.out.println("Score inserted successfully for user " + user);
                return ResponseEntity.ok("Score updated successfully.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error: Failed to update score.");
        }
    } else {
        return ResponseEntity.badRequest().body("Invalid 'action' parameter. It must be 'scoreUpdate'.");
    }
}

}

