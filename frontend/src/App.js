import React, { useState } from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Tasks from './components/Tasks/Tasks';
import Login from './components/Login/Login';

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
  window.location.href = '/dashboard';  
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken
}


const App = () => {
  const token = getToken();
  
  if(!token) {
    return <Login setToken={setToken} />
  }

  return  (
    <div className="wrapper">
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
          <Route path="/tasks" element={<Tasks />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App