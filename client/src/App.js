import React, { Fragment, useState, useEffect } from 'react'
import './App.css';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

//components

import Dashboard from '../src/Components/Dashboard/Dashboard';
import RegisterPage from '../src/Components/RegisterPage/RegisterPage';
import LoginPage from '../src/Components/LoginPage/LoginPage';


const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try {
      
      const response = await fetch("http://localhost:4000/auth/is-verify", {
        method: "GET",
        headers: { token : localStorage.token }
      });

      const parseResponse = await response.json();

      parseResponse === true ? setIsAuthenticated(true) : setIsAuthenticated(false);

    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    isAuth();
  });



    return (
    <Fragment>
      <Router>
        <div className='container'>
          <Routes>
            <Route path='/login' element={!isAuthenticated ? <LoginPage setAuth={setAuth} /> : <Navigate to='/dashboard'/>} />
            <Route path='/register' element={!isAuthenticated ? <RegisterPage setAuth={setAuth} /> : <Navigate to='/login' />} />
            <Route path='/dashboard' element={ isAuthenticated ? <Dashboard setAuth={setAuth} /> : <Navigate to='/login'/>} />
            
          </Routes>
        </div>
      </Router>
    </Fragment>
  )
}

export default App
