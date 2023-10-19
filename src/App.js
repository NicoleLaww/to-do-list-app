import React, {useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import RegistrationForm from './components/RegistrationForm';
import Login from './components/Login';
import ToDoList from './components/ToDoList';


function App() {

const [storedUserId, setStoredUserId] = useState(null);
const [tasks, setTasks] = useState([]);

const updateTasks = (newTasks) => {
  setTasks(newTasks);
}

useEffect(() => {
  const fetchDataFromLocalStorage = async () => {
    const userId = await localStorage.getItem('userId');
    setStoredUserId(userId);
  };

  fetchDataFromLocalStorage();
}, []);


  return (
    // manages URLs and maps them to specific components, enabling seamless navigation and better user experience in SPAs
    <Router>
      <div className="App">
        <h1>
          <a href='/'>The To Do List App</a>
        </h1>
        <NavBar userId={storedUserId} updateTasks={updateTasks}/>
        <Routes>
            <Route path="/" element={<ToDoList userId={storedUserId} tasks={tasks} updateTasks={updateTasks}/>}/> 
            <Route path="/register" element={<RegistrationForm />} /> 
            <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
