// Import the Express.js library and the 'db' module
const express = require('express'); // used to create web apps in Node.js 
const db = require('./db'); // connecting to PostgreSQL db
const bcrypt = require('bcrypt'); // for passwords
const cors = require('cors'); // allows access from front to backend 
const { getUserByEmail, comparePasswords } = require('./dbUtils'); // helper function
const cookieParser = require('cookie-parser');

// Create an instance of the Express app
const app = express(); // app obj will be used to define routes and configure web server 

// Enables CORS for specific origins
app.use(cors({ origin: 'http://localhost:3000'}));

// Use the JSON middleware to parse JSON request bodies, incoming to server is always stringify 
app.use(express.json());

// Use cookie-parser middleware
app.use(cookieParser());

// // Route that gets the root URL for testing purposes
// app.get('/', (req, res) => {
//   res.send('The To Do List is running!');
// });

// Route that creates a new user
// always async if db related, http (client to server), I/O-bound operations 
app.post('/register', async(req, res)=> {
  // console.log('Received request: ', req.body);
  const {name, email, password } = req.body;
  if (!name || !email || !password ) {
    return res.status(400).json({error: 'All fields are required'});
  } 
  try {
    // Hash the user's password 
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, hashedPassword]);
    return res.status(200).json({ message: 'User registration successful'});
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

      console.log("user after db", user);
      console.log('passwordsMatch', passwordMatch);

      if(user && passwordMatch) {
        // set a session cookie with the user's ID 
        console.log("userId", user.id);
        res.cookie('userId', user.id);
        return res.status(200).json({message: 'Successfully logged in', userId: user.id, email: email});
      } else {
        return res.status(401).json({error: 'Invalid email or password'});
    }

  } catch(err) {
    console.log(err);
    return res.status(500).json({error: 'An error occured...', errorMessage: err.message});
  }
})

// Log out
app.post('/logout', (req, res) => {
  res.cookie('userId', '');
  return res.status(200).json({message: 'Logged out'});
});

// Route to get existing to do list items from logged in user 
app.get('/todos/:userId', async(req, res) => {
  const userId = req.cookies.userId; 

  try {
    const result = await db.query('SELECT * FROM tasks WHERE user_id = $1', [userId]);
    //accessing all of the tasks, comes back as an array
    const tasks = result.rows;

    return res.status(200).json({tasks});

  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'An error occured while fetching your to do list.'});
  }
})

// Route to create a new to do list item 
app.post('/todos', async(req, res) => {

  // coming in from the front end
  const {userId, task, status, dueDate, priority } = req.body;

  if(!task) {
    return res.status(400).json({error: 'Task is required'});
  }

  try {
    const result = await db.query('INSERT INTO tasks (user_id, task, status, due_date, priority) VALUES ($1, $2) RETURNING *', [userId, task, status, dueDate, priority]);
    const newToDo = result.rows[0];
    return res.send(200).json({message: 'To Do item successfully created', todo: newToDo});
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({error: 'An error occured while creating task.'})
  }
})


// Route to update a to do list item 
app.put('/todos/:taskId', async(req, res) => {
  const taskId = req.params.taskId;

  if(!taskId) {
    return res.status(400).json({error: 'Task ID required'});
  }

  const { userId, task, status, dueDate, priority } = req.body;

  try {
    const result = await db.query(
      'UPDATE tasks SET user_id = $1 task = $2, status = $3, due_date = $4, priority = $5 WHERE id = $6', [userId, task, status, dueDate, priority, taskId]
    );
    
    if (result.rowCount === 1) {
      return res.status(200).json({message: 'Task successfully updated', task: result.rows[0]});
    } else {
      return res.status(404).json({error: 'Task not found'});
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({error: 'An error occured while updating task'});
  }
})

// Route to delete a to do list item 
app.delete('/todos/:taskId', async(req, res) => {
  const taskId = req.params.taskId; 

  if (!taskId) {
    return res.status(400).json({error: 'Task ID required'});
  }

  try {
    const result = await db.query(
      'DELETE FROM tasks WHERE id = $1', [taskId]
    );
    if (result.rowCount === 1 ){
      return res.status(200).json({message: 'Task successfully deleted'})
    } else {
      return res.status(404).json({ error: 'Task not found'})
    }
  } catch(err) {
    console.log(err);
    return res.status(500).json({error: 'An error occured while deleting task'});
  }
})

// get User ID
app.get('/getUserId', (req, res) => {
  const user = getUserByEmail(email); 
  console.log(user);

  res.json({userId: user.id})
})

// Set the server's listening port 
const PORT = 8080;

// Start the Express server and listen on the specified port 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});