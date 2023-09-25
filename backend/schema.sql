CREATE TABLE users (
  id SERIAL PRIMARY KEY, 
  name VARCHAR(255) NOT NULL, 
  email VARCHAR(255) NOT NULL UNIQUE, 
  password VARCHAR(255) NOT NULL 
);

CREATE TABLE tasks (
  id SERIAL PRIMARY KEY, 
  task TEXT NOT NULL, 
  status VARCHAR(255), 
  due_date DATE, 
  user_id INTEGER REFERENCES users(id), 
  priority INTEGER 
);