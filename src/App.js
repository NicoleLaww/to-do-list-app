import React, {useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import RegistrationForm from './components/RegistrationForm';
import Login from './components/Login';
import ToDoList from './components/ToDoList';
import './App.css';


function App() {

const [storedUserId, setStoredUserId] = useState(null);
const [isLoggedIn, setIsLoggedIn] = useState(null);
const [tasks, setTasks] = useState([]);

const updateTasks = (newTasks) => {
  setTasks(newTasks);
}

const updateIsLoggedIn = (userId) => {
  setIsLoggedIn(userId);
}

useEffect(() => {
  const fetchDataFromLocalStorage = async () => {
    const userId = await localStorage.getItem('userId');
    setStoredUserId(userId);
  };

  fetchDataFromLocalStorage();
}, []);

  // function inside useEffect is executed when dependencies [arr] changes
  useEffect(() => {
    if (storedUserId !== null) {
      setIsLoggedIn(storedUserId);
    }
  }, [storedUserId]);

  return (
    // manages URLs and maps them to specific components, enabling seamless navigation and better user experience in SPAs
    <Router>
      <div className="background">
        <div className="notebook">
          <div className="left">
            <h1 className="title">
              <a href='/'>The To Do List App</a>
            </h1>
            <NavBar userId={storedUserId} updateTasks={updateTasks} isLoggedIn={isLoggedIn} updateIsLoggedIn={updateIsLoggedIn}/>
          </div>
          <div className='spine'></div>
          <div className="right">
            <h2 className='welcome'> Welcome to My Digital To Do List Notebook </h2>
            <p> Welcome to my digital to-do list notebook, where tasks, goals, and dreams find a home on the web. 
              Just like an old-fashioned journal, this web application helps you jot down your daily to-dos and organize your life with ease. <br></br>
              In this virtual notebook, you can create, update, and check off tasks as you complete them. It's your personal space for productivity, 
              and it's ready to accompany you on your journey to achieve your goals. 
              <br></br>
              <br></br>
              Please note that to begin your journey of productivity and 
              organization, you'll need to register and log in to access your personal to-do lists. 
              <br></br>
              <br></br>
               Whether it's a simple grocery list, important deadlines,
              or long-term projects, this to-do list notebook has you covered. It's here to help you keep track of everything you need to accomplish and bring 
              order to your day. 
              <br></br>
              <br></br>
              Start writing down your tasks, prioritizing your objectives, and turning your dreams into reality, one checked-off item at a
              time. Let's begin this journey of productivity and organization together. Happy note-taking!
              <br></br>
              <br></br>
              Sincerly, 
              <br></br>
              Nicole 
            </p>
          </div>
          <Routes>
              <Route path="/" element={<ToDoList userId={storedUserId} tasks={tasks} updateTasks={updateTasks} isLoggedIn={isLoggedIn} updateIsLoggedIn={updateIsLoggedIn}/>}/> 
              <Route path="/register" element={<RegistrationForm />} /> 
              <Route path="/login" element={<Login />} />
          </Routes>
       </div> 
      </div>
    </Router>
  );
}

export default App;
