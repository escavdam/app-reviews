const bcrypt = require('bcrypt');
const saltRounds = 10;
const Database = require('better-sqlite3');
const fs = require('fs');
/*
const db = new Database(':memory:');
db.exec("CREATE TABLE users (user TEXT PRIMARY KEY, password TEXT)");
db.exec("INSERT INTO users (user, password) VALUES ('admin', '81dc9bdb52d04dc20036dbd8313ed055')");
*/
let db_aux = null;
if (!fs.existsSync('database.db')) {
    db_aux = new Database('database.db'); // Crea el archivo de base de datos si no existe

    // Desactivar claves foráneas (por si alguna quedó activa)
    db_aux.exec('PRAGMA foreign_keys = OFF;');

    // Crear tablas si no existen
    db_aux.exec("CREATE TABLE IF NOT EXISTS users (user TEXT PRIMARY KEY, password TEXT)");
    db_aux.exec(`
        CREATE TABLE IF NOT EXISTS reviews (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            rating TEXT CHECK(rating IN ('good', 'neutral', 'bad')) NOT NULL,
            message TEXT CHECK(LENGTH(message) <= 256) NOT NULL,
            user_id INTEGER
        )
    `);
} else {
    db_aux = new Database('database.db');
}

const db = db_aux;

// Funciones de usuario

function getUser(user) {
    const getUserStatement = db.prepare("SELECT * FROM users WHERE user = ?");
    return getUserStatement.get(user);
}

function getAllUsers(){
    const getAllUsersStatement = db.prepare("SELECT * FROM users");
    return getAllUsersStatement.all();
}

function deleteUser(user){
    const deleteUserStatement = db.prepare("DELETE FROM users WHERE user = ?");
    deleteUserStatement.run(user);
}


function createUser(user, password) {
    const insertUserStatement = db.prepare("INSERT INTO users (user, password) VALUES (?, ?)");
    const hash = bcrypt.hashSync(password, saltRounds);
    insertUserStatement.run(user, hash);
}

function updateUser(user, password){
    const updateUserStatement = db.prepare("UPDATE users SET password = ? WHERE user = ?");
    const hash = bcrypt.hashSync(password, saltRounds);
    updateUserStatement.run(hash, user);
}

function validateUser(user, password) {
    const userObj = getUser(user);
    return bcrypt.compareSync(password, userObj.password);
}


// Funciones CRUD para la tabla reviews

// Crear una reseña
function createReview(rating, message, userId) {
    const insertReviewStatement = db.prepare(`
        INSERT INTO reviews (rating, message, user_id) 
        VALUES (?, ?, ?)
    `);
    insertReviewStatement.run(rating, message, userId);
}

// Leer todas las reseñas
function getAllReviews() {
    const getAllReviewsStatement = db.prepare("SELECT * FROM reviews");
    return getAllReviewsStatement.all();
}

// Leer reseñas de un usuario específico
function getReviewsByUser(userId) {
    const getReviewsStatement = db.prepare("SELECT * FROM reviews WHERE user_id = ?");
    return getReviewsStatement.all(userId);
}

// Actualizar una reseña
function updateReview(id, newRating, newMessage) {
    const updateReviewStatement = db.prepare(`
        UPDATE reviews 
        SET rating = ?, message = ? 
        WHERE id = ?
    `);
    updateReviewStatement.run(newRating, newMessage, id);
}

// Eliminar una reseña
function deleteReview(id) {
    const deleteReviewStatement = db.prepare("DELETE FROM reviews WHERE id = ?");
    deleteReviewStatement.run(id);
}

// Exportar funciones
module.exports = {
    createUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser,
    validateUser,
    getAllReviews,
    getReviewsByUser,
    createReview,
    updateReview,
    deleteReview
};