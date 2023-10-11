import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Welcome from './pages/Welcome';

const App = () => {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route  path='/' element={<Welcome/>} />
          <Route  path='/register' element={<Register />} />
          
        </Routes>
      </Router>
    </div>
  );
};

export default App;
