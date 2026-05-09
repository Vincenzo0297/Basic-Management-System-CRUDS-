import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './Firebase/Usercontent'; // Import the UserProvider

// Core Front Page
import MainPage from './Core-Front-Page/Main Page/MainPage';
import Login from './Core-Front-Page/Login/Login';

// Components
import AddUser from './Components/AddUser';
import EditUser from './Components/EditUser';

// Core Middle Page Admin
import Admin from './Core-Middle-Page/Admin/Admin'; 
import ManageUsers from './Core-Middle-Page/Admin/ManageUsers';

// Core Middle Page User
import User from './Core-Middle-Page/User/User';
import Logout from './Core-Middle-Page/Logout';


function App() {
  return (
    <UserProvider>
      <Router>
          <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/MainPage" element={<MainPage />} />
              <Route path="/Login" element={<Login />} />
              <Route path="/AddUser" element={<AddUser />} />
              <Route path="/EditUser/:id" element={<EditUser />} />

              <Route path="/Admin" element={<Admin />} />
              <Route path="/ManageUsers" element={<ManageUsers />} />

              <Route path="/User" element={<User />} />
              <Route path="/Logout" element={<Logout />} />

              {/* Redirect any unknown routes to the main page */}
              <Route path="*" element={<Navigate to="/" />} />
          </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
