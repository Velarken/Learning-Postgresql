const { Pool } = require('pg');
// the following should be put into env variables
    // this is an example for simplicity
module.exports = new Pool({
    host: 'localhost', // where the db is located
    user: 'velarken',
    database: 'top_users',
    password: 'Harley214!',
    port: 5432 // this is the default port
})

// alternatively you can use the connection URI when using
    // a hosted database
/* 
module.exports = new Pool({
  connectionString: "postgresql://<role_name>:<role_password>@localhost:5432/top_users"
});
*/