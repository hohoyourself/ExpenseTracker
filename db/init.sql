CREATE DATABASE IF NOT EXISTS ExpenseTracker;

USE ExpenseTracker;

CREATE USER 'expenseTracker'@'%' IDENTIFIED BY 'track spending@Sandbox';
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE ON ExpenseTracker.* TO 'expenseTracker'@'%';
FLUSH PRIVILEGES;

CREATE TABLE IF NOT EXISTS avaMonth (
    month INT PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS entry (
    id INT AUTO_INCREMENT PRIMARY KEY,
    day INT,
    cat VARCHAR(255),
    comment TEXT,
    amount FLOAT
);

CREATE INDEX cat_idx ON entry (cat);