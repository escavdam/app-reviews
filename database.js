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

const adminPasswordHash = '$2b$10$w0.NRKi/vPsV8py49sD34.G4xY6np7aQjB4BHmBkZGDrL7zSAVY3m';
const adminUsername = 'admin';

const user = db.prepare("SELECT * FROM users WHERE username = ?").get(adminUsername);

if (!user) {
    const insertUserStatement = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    insertUserStatement.run(adminUsername, adminPasswordHash);
    console.log('Usuario admin creado exitosamente.');
} else {
    console.log('El usuario admin ya existe.');
}
