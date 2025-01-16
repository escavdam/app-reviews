const bcrypt = require('bcrypt');
const saltRounds = 10;
const Database = require('better-sqlite3');
const fs = require('fs');
let db_aux = null;
if(!fs.existsSync('database.db')){
    db_aux = new Database('database.db');//cambia por database.db para guardar en un archivo
    db_aux.exec("CREATE TABLE users (username TEXT PRIMARY KEY, password TEXT)");

    db_aux.exec(`
        CREATE TABLE reviews(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        time DATETIME DEFAULT CURRENT_TIMESTAMP, 
        rating TEXT NOT NULL, 
        message TEXT, 
        username TEXT, 
        FOREIGN KEY(username) REFERENCES users(username)
    `)

} else {
    db_aux = new Database('database.db');
}
