USE BrainBox;

CREATE TABLE IF NOT EXISTS BrainBox_lobbies (
    lobbyId VARCHAR(255) PRIMARY KEY,
    creatorUserId VARCHAR(255) NOT NULL,
    secondUserId VARCHAR(255),
    creationTimestamp VARCHAR(255)
);


GRANT SELECT, INSERT, UPDATE, DELETE ON BrainBox.BrainBox_lobbies TO 'BrainboxDefault'@'%';
FLUSH PRIVILEGES;