const express = require('express');
const app = express();
const path = require('node:path');
const newUserRouter  = require('./routes/newUserRouter')
require('dotenv').config();


const PORT = 3030;

app.set('view engine', 'ejs');
app.use(express.json()) // parse req.body
app.use(express.urlencoded({ extended: true }))

// static resources
app.use(express.static('public'))

//routes
app.use(newUserRouter)

// start server
app.listen(PORT, () => {
    console.log('Listening on port:', PORT)
});