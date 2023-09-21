// Import the Express.js library and the 'db' module
const express = require('express'); // used to create web apps in Node.js 
const db = require('./db'); // connecting to PostgreSQL db
const bcrypt = require('bcrypt');

// Create an instance of the Express app
const app = express(); // app obj will be used to define routes and configure web server 

// Use the JSON middleware to parse JSON request bodies
app.use(express.json());

// Route that gets the root URL
app.get('/', (req, res) => {
  res.send('The To Do List is running!');
});

// Route that gets the register page
app.get('/register', (req, res) => {
  res.send('Register page running');
});

// Route that gets the login page
app.get('/login', (req, res) => {
  res.send('Login page running');
});

// Route that creates a new user
app.post('/register', async(req, res)=> {
  const {name, email, password } = req.body;
  if (!name || !email || !password ) {
    return res.status(400).json({error: 'All fields are required'});
  } 
  try {
    // Hash the user's password 
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, hashedPassword])
    return res.status(200).json({ message: 'User registration successfull'});
  } catch(err) {
    console.log(err);
    return res.status(500).json({ error: 'An error occured...'});
  }
});

// Set the server's listening port to 3000
const PORT = 3000;

// Start the Express server and listen on the specified port 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});