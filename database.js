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
if(!fs.existsSync('database.db')){
    db_aux = new Database('database.db');//cambia por database.db para guardar en un archivo
    db_aux.exec("CREATE TABLE users (user TEXT PRIMARY KEY, password TEXT)");
} else {
    db_aux = new Database('database.db');
}
const db = db_aux;

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

function insertReview(rating, message) {
    const insertReviewStatement = db.prepare(`
        INSERT INTO reviews (rating, message) 
        VALUES (?, ?)
    `);
    insertReviewStatement.run(rating, message);  
}


module.exports = {
    createUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser,
    validateUser,
    insertReview
};