import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LandingPage from './LandingPage';
import Login from './Pages/LoginPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
    