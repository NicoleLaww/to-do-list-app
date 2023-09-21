const { Pool } = require('pg');

//Create a PostgreSQL database connection pool 

const pool = new Pool({
  user: 'nicole', 
  host: 'localhost', 
  database: 'todo_app',
  port: 5432
});

module.exports = pool;