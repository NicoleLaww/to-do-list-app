// Import the Express.js library and the 'db' module
const express = require('express'); // used to create web apps in Node.js 
const db = require('./db'); // connecting to PostgreSQL db
const bcrypt = require('bcrypt');
const cors = require('cors');
const { getUserByEmail, comparePasswords } = require('./dbUtils');

// Create an instance of the Express app
const app = express(); // app obj will be used to define routes and configure web server 

// Use the JSON middleware to parse JSON request bodies
app.use(express.json());

// Enables CORS for specific originals 
app.use(cors({ origin: 'http://localhost:3000'}));

// Route that gets the root URL
app.get('/', (req, res) => {
  res.send('The To Do List is running!');
});

// Route that creates a new user
app.post('/register', async(req, res)=> {
  // console.log('Received request: ', req.body);
  const {name, email, password } = req.body;
  // console.log(name, email, password)
  if (!name || !email || !password ) {
    return res.status(400).json({error: 'All fields are required'});
  } 
  try {
    // Hash the user's password 
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, hashedPassword]);
    return res.status(200).json({ message: 'User registration successfull'});
  } catch(err) {
    console.log(err);
    return res.status(500).json({ error: 'An error occured...', errorMessage: err.message });
  }
});

// Route that logs in 
app.post('/login', async(req, res) => {
  console.log('Received request: ', req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({error: 'All fields are required'});
  }

  try {

    const user = await getUserByEmail(email);

    if(!user) {
      return res.status(401).json({error: 'Invalid email..'});
    }
    
    const passwordMatch = await comparePasswords(password, user.password);

    if(passwordMatch) {
      return res.status(200).json({message: 'Successfully logged in'});
    } else {
      return res.status(401).json({error: 'Invalid email or password'});
    }
  } catch(err) {
    console.log(err);
    return res.status(500).json({error: 'An error occured...', errorMessage: err.message});
  }
})

// Set the server's listening port 
const PORT = 8080;

// Start the Express server and listen on the specified port 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});