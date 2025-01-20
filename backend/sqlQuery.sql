CREATE DATABASE dfs;

CREATE TABLE Users (
    uid INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255),
    password VARCHAR(255),
    url VARCHAR(255)
);

CREATE TABLE Media (
    uid INT,
    url1 VARCHAR(255),
    url2 VARCHAR(255),
    FOREIGN KEY (uid) REFERENCES Users(uid)
);

