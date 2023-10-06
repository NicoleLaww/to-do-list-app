const db = require('./db');
const bcrypt = require('bcrypt');

async function getUserByEmail(email) {
  const result = await db.query('Select * FROM users WHERE email = $1', [email]);
  // console.log("result.rows", result.rows[0]);
  return result.rows[0];
}

async function comparePasswords(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}

module.exports = { getUserByEmail, comparePasswords }