const pool = require('./pool');

async function getAllUsernames() {
    const { rows } = await pool.query('SELECT * FROM usernames');
    return rows;
}

async function insertUsername(username) {
    await pool.query('INSERT INTO usernames (username) VALUES ($1)', [username]);
    // the $1 is query parameterization that prevents users
    // from passing potentially harmful data to our database
}

module.exports = {
    getAllUsernames,
    insertUsername
}