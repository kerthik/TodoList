import React, { useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Welcome from './pages/Welcome';
import Login from './pages/Login';

// we have creating the context api 
export const Credentialcontext = React.createContext(null)


const App = () => {
  const credential =useState(null)
  return (
// here we are intialize the provider
    <div className='App'>
        <Credentialcontext.Provider value={credential}> 
      <Router>
        <Routes>
          <Route  path='/' element={<Welcome/>} />
          <Route  path='/register' element={<Register />} />
          <Route  path='/login' element={<Login />} />
          
        </Routes>
      </Router>
      </Credentialcontext.Provider>
    </div>
  );
};

export default App;
