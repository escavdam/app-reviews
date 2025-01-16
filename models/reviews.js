const better_sqlite3 = require('better-sqlite3');
const path = require('path');
const db = better_sqlite3(path.join(__dirname, '../database.db'));

function insertReview(time, rating, message, username){
    const stmt = db.prepare('INSERT INTO reviews (time, rating, message, username) VALUES (?, ?, ?, ?)');
    stmt.run(time, rating, message, username);
}

function getReviews(){
    const stmt = db.prepare('SELECT * FROM reviews');
    return stmt.all();
}

module.exports = {
    insertReview,
    getReviews
};