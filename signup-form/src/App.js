// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignupForm from './SignupForm';
import Sample from './sample'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupForm />} />
        <Route path="/sample" element={<Sample />} />  
      </Routes>
    </Router>
  );
}

export default App;
