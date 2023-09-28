import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import RegistrationForm from './components/RegistrationForm';
import Login from './components/Login';


function App() {
  return (
    <Router>
      <div className="App">
        <h1>
          <a href='/'>The To Do List App</a>
        </h1>
        <NavBar />
        <Routes>
            <Route path="/"/> 
            <Route path="/register" element={<RegistrationForm />} /> 
            <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
