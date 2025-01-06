const better_sqlite3 = require('better-sqlite3');
const path = require('path');
const db = better_sqlite3(path.join(__dirname, '../database.db'));
const bcrypt = require('bcrypt');
const saltRounds = 10;
//show all users

function getUser(user) {
    const getUserStatement = db.prepare("SELECT * FROM users WHERE username = ?");
    return getUserStatement.get(user);
}

function getAllUsers() {
    const getAllUsersStatement = db.prepare("SELECT * FROM users");
    return getAllUsersStatement.all();
}

function deleteUser(username) {
    const deleteUserStatement = db.prepare("DELETE FROM users WHERE username = ?");
    deleteUserStatement.run(username);
}


function createUser(username, password) {
    const insertUserStatement = db.prepare("INSERT INTO users (username, password) VALUES (?, ?)");
    const hash = bcrypt.hashSync(password, saltRounds);
    insertUserStatement.run(username, hash);
}

function updateUser(username, password) {
    const updateUserStatement = db.prepare("UPDATE users SET password = ? WHERE username = ?");
    const hash = bcrypt.hashSync(password, saltRounds);
    updateUserStatement.run(hash, username);
}

function validateUser(username, password) {
    const userObj = getUser(username);
    return bcrypt.compareSync(password, userObj.password);
}



module.exports = {
    createUser,
    getUser,
    getAllUsers,
    updateUser,
    deleteUser,
    validateUser
};