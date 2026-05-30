import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './Firebase/Usercontent'; // Import the UserProvider

// Core Front Page
import MainPage from './Core-Front-Page/Main Page/MainPage';
import Login from './Core-Front-Page/Login/Login';

// Components
import AddUser from './Components/AddUser';
import EditUser from './Components/EditUser';
import AddBooking from './Components/AddBooking';
import EditBooking from './Components/EditBooking';

// Core Middle Page Admin
import Admin from './Core-Middle-Page/Admin/Admin'; 
import ManageUsers from './Core-Middle-Page/Admin/ManageUsers';
import ManageBooking from './Core-Middle-Page/Admin/ManageBooking';
import AdminCheckIn from './Components/AdminCheckIn';
import AdminCheckOut from './Components/AdminCheckOut';


// Core Middle Page User
import User from './Core-Middle-Page/User/User';
import UserViewLocation from './Core-Middle-Page/User/UserViewLocation';

// Common
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
              <Route path="/AddBooking" element={<AddBooking/>} />
              <Route path="/EditBooking/:id" element={<EditBooking/>} />
              

              <Route path="/Admin" element={<Admin />} />
              <Route path="/ManageUsers" element={<ManageUsers />} />
              <Route path="/ManageBooking" element={<ManageBooking />} />
              <Route path="/AdminCheckIn" element={<AdminCheckIn />} />
              <Route path="/AdminCheckOut" element={<AdminCheckOut />} />
              

              <Route path="/User" element={<User />} />
              <Route path="/UserViewLocation" element={<UserViewLocation />} />

              <Route path="/Logout" element={<Logout />} />

              {/* Redirect any unknown routes to the main page */}
              <Route path="*" element={<Navigate to="/" />} />
          </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;
