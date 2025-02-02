CREATE DATABASE dfs;

CREATE TABLE Users (
    uid INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255),
    password VARCHAR(255),
);

CREATE TABLE media (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email VARCHAR(255),
    file_url VARCHAR(500),
    FOREIGN KEY (email) REFERENCES users(email)
);