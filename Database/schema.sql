USE BrainBox;

CREATE TABLE IF NOT EXISTS BrainBox_lobbies (
    lobbyId INT AUTO_INCREMENT PRIMARY KEY,
    creatorUserId INT NOT NULL,
    secondUserId INT,
    creationTimestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

);

CREATE USER 'BrainboxDefault'@'%' IDENTIFIED BY 'add_password_here';
GRANT SELECT, INSERT, UPDATE, DELETE ON BrainBox.BrainBox_lobbies TO 'BrainboxDefault'@'%';
FLUSH PRIVILEGES;