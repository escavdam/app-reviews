const bcrypt = require('bcrypt');
const saltRounds = 10;
const Database = require('better-sqlite3');
const db = new Database('database.db');

db.exec("CREATE TABLE IF NOT EXISTS users (username TEXT PRIMARY KEY, password TEXT)");

db.exec(`
    CREATE TABLE IF NOT EXISTS reviews(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    time DATETIME DEFAULT CURRENT_TIMESTAMP, 
    rating TEXT NOT NULL, 
    message TEXT, 
    username TEXT, 
    FOREIGN KEY(username) REFERENCES users(username)
)`);