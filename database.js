const bcrypt = require('bcrypt');
const saltRounds = 10;
const Database = require('better-sqlite3');
const db = new Database('database.db');

db.exec("CREATE TABLE IF NOT EXISTS users (username TEXT PRIMARY KEY, password TEXT, isAdmin BOOLEAN)");

db.exec(`
    CREATE TABLE IF NOT EXISTS reviews(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    time DATETIME DEFAULT CURRENT_TIMESTAMP, 
    rating TEXT NOT NULL, 
    message TEXT, 
    username TEXT UNIQUE NOT NULL, 
    FOREIGN KEY(username) REFERENCES users(username)
)`);

const adminPasswordHash = '$2b$10$w0.NRKi/vPsV8py49sD34.G4xY6np7aQjB4BHmBkZGDrL7zSAVY3m';
const adminUsername = 'admin';

try {
    const insert = db.prepare("INSERT INTO users (username, password, isAdmin) VALUES (?, ?, ?)");
    insert.run(adminUsername, adminPasswordHash, true);
    console.log('Admin user created');
} catch (err) {
    console.error('Error initializing admin user:', err);
}

module.exports = db;