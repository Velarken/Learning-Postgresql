const db = require("../db/queries");
const {Client} = require('pg');
require('dotenv').config();

async function getUsernames(req, res) {
  const usernames = await db.getAllUsernames();
  res.render('index', {usernames: usernames})
}

async function createUsernameGet(req, res) {
  // displays a form, will submit to app.post('/new')
    res.render('createUser')
}

async function createUsernamePost(req, res) {
  const { username } = req.body;
  await db.insertUsername(username);
  res.redirect("/");
}

async function searchUserGet(req,res) {
    console.log('Searching for: ', req.query.username)
    const SQL = `SELECT username FROM usernames WHERE username LIKE '%${req.query.username}%';`
    const client = new Client({
    connectionString: `postgresql://${process.env.DB_NAME}:${process.env.DB_PASS}@localhost:5432/top_users`,
    });
    async function query() {
        try {
            console.log('Starting search process')
            await client.connect();
            const response = await client.query(SQL);
            await client.end()
            res.render('searchResults.ejs', {data:response.rows})
            console.table(response.rows);
        } catch(err) {
            console.log(err)
        } finally {
            console.log('Search complete');
        }
    }
    query();
}

async function deleteUserPost(req,res) {
    console.log('Deleting selected user:', req.body.username)
    const SQL = `DELETE FROM usernames WHERE username = '${req.body.username}'`;
    const client = new Client({
    connectionString: `postgresql://${process.env.DB_NAME}:${process.env.DB_PASS}@localhost:5432/top_users`,
    });
    try {
        console.log('Deleting user.');
        await client.connect();
        const response = await client.query(SQL);
        await client.end();
    } catch(err) {
        console.log('Something went wrong.', err)
    } finally {
        console.log('User deleted', req.body.username)
        res.redirect('/');
    }
}

module.exports = {
  getUsernames,
  createUsernameGet,
  createUsernamePost,
  searchUserGet,
  deleteUserPost
};