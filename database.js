const bcrypt = require('bcrypt');
const saltRounds = 10;
const Database = require('better-sqlite3');
const fs = require('fs');

// Verificar si la base de datos existe
let db_aux = null;
if (!fs.existsSync('database.db')) {
    db_aux = new Database('database.db');  // Crea o abre la base de datos

    // Crear la tabla de usuarios
    db_aux.exec("CREATE TABLE users (username TEXT PRIMARY KEY, password TEXT)");

    // Crear la tabla de reviews
    db_aux.exec(`
        CREATE TABLE reviews(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            time DATETIME DEFAULT CURRENT_TIMESTAMP, 
            rating TEXT NOT NULL, 
            message TEXT, 
            username TEXT, 
            FOREIGN KEY(username) REFERENCES users(username)
        )
    `);  // Aquí cerramos correctamente el paréntesis
} else {
    db_aux = new Database('database.db');  // Si la base de datos existe, la abrimos
}

const db = db_aux;  // Hacemos que `db` esté disponible para otros archivos

module.exports = {
    db  // Exportamos `db` para su uso en otras partes de la aplicación
};
