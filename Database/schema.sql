USE BrainBox;

CREATE TABLE IF NOT EXISTS BrainBox_lobbies (
    lobbyId VARCHAR(255) PRIMARY KEY,
    creatorUserId VARCHAR(255) NOT NULL,
    secondUserId VARCHAR(255),
    creationTimestamp VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS BrainBox_questions (
    Id TINYINT(20) PRIMARY KEY AUTO_INCREMENT,
    questionName VARCHAR(255),
    questionAnswerA VARCHAR(255),
    questionAnswerB VARCHAR(255),
	questionAnswerC VARCHAR(255),
	questionAnswerD VARCHAR(255),
	correctAnswer VARCHAR(1)
	
);


GRANT SELECT, INSERT, UPDATE, DELETE ON BrainBox.BrainBox_lobbies TO 'BrainboxDefault'@'%';
FLUSH PRIVILEGES;