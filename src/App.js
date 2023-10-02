import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import RegistrationForm from './components/RegistrationForm';
import Login from './components/Login';
import ToDoList from './components/ToDoList';


function App() {

  const [userId, setUserId] = useState(null);

// used to fetch user data from backend, renders the component first
  useEffect(() => {
    fetch('http://localhost:8080/getUserId')
    // anytime information is sent between server and client over an http connection, you need to process it, this is typical for server to client 
      .then((response) => response.json())
      // data can be named anything, userId comes from backend
      .then((data) => {
        setUserId(data.userId);
      }) 
      .catch((err) => {
        console.error('Error fetching userId', err)
      });
      // [] means it will only run once 
  }, []);

  return (
    // manages URLs and maps them to specific components, enabling seamless navigation and better user experience in SPAs
    <Router>
      <div className="App">
        <h1>
          <a href='/'>The To Do List App</a>
        </h1>
        <NavBar />
        <Routes>
            <Route path="/" element={<ToDoList userId={userId}/>}/> 
            <Route path="/register" element={<RegistrationForm />} /> 
            <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
