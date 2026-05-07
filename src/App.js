import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './Core-Front-Page/Main Page/MainPage';
import Login from './Core-Front-Page/Login/Login';
import Registration from './Core-Front-Page/Registration/Registration';

function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/MainPage" element={<MainPage />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Registration" element={<Registration />} />
        </Routes>
    </Router>
  );
}

export default App;
