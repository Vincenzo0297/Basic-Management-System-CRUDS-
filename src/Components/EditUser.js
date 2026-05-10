import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import '../Core-Front-Page/Main Page/MainPage.css'; // Import the CSS file for styling
import './Components.css'; // Import the CSS file for styling
import { handleNavToggle } from '../Core-Front-Page/Main Page/JavaScript'; // Ensure this path is correct

import {db} from '../Firebase/firebase'; // Corrected import path for the Firestore database instance
import { doc, updateDoc} from 'firebase/firestore'; // Import necessary Firestore functions for querying and adding documents

function EditUser() {
  useEffect(() => {
    handleNavToggle(); // Call the function to initialize navigation toggle functionality
}, []);

  // Initialize the navigate function for programmatic navigation
    const navigate = useNavigate(); 
    const { id } = useParams();

    // State variables for form fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    // State variables for validation errors
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
  
    // Validation function for registration form
    const validationUpdate = () => {
      let isValid = true;
  
      // Name validation
      const namePattern = /^[a-zA-Z\s]+$/; // Only letters and spaces allowed
      if (name.trim() === '') {
          setNameError('Name is required');
          isValid = false;
      } else if (!namePattern.test(name)) {
          setNameError('Name can only contain letters and spaces');
          isValid = false;
      } else {
          if (name.trim().length < 6) {
              setNameError('Name must be at least 6 characters long');
              isValid = false;
          } else {
              setNameError('');
          }
      }
  
      // Email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (email.trim() === '') {
          setEmailError('Email is required');
          isValid = false;
      } else if (!emailPattern.test(email)) {
          setEmailError('Invalid email address');
          isValid = false;
      } else {
          setEmailError('');
      }
  
      // Password validation
      const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/; // Minimum 6 characters, at least one letter and one number
      if (password.trim() === '') {
          setPasswordError('Password is required');
          isValid = false;
      } else if (!passwordPattern.test(password)) {
          setPasswordError('Password must contain at least one letter and one number');
          isValid = false;
      } else {
          setPasswordError('');
      }
      return isValid;
    };

    const handleUpdate = async () => {
        if (validationUpdate()) {
            try {
                // Assuming users are stored in a collection named "Auth"
                    await updateDoc(doc(db, "Auth", id), {
                        Name: name,
                        Email: email,
                        Password: password,
                    });
                    alert('User updated successfully!');
                    navigate('/ManageUsers'); // Redirect to Manage Users page after successful update
                }
            catch (error) {
                console.error("Error updating user:", error);
                alert('Failed to update user. Please try again.');
            }
        }
    };

    return (
        <div>
            <header className="header" id="header">
                {/* ==== NAV ===*/}
                <nav className="nav container">
            
                {/* ==== NAV MENU ===*/}
                <div className="nav-menu" id="nav-menu">
                    {/* ==== NAV LIST ===*/}
                    <ul className="nav-list">
                        <li className="nav-item"><a href="/Admin" className="nav-link">Home Page</a></li>
                        <li className="nav-item"><a href="/ManageUsers" className="nav-link">Manage Users</a></li>
                        <li className="nav-item"><a href="/Logout" className="nav-link">Logout</a></li>
                    </ul> 
            
                    {/* ==== NAV CLOSE ===*/}
                    <div className="nav-close" id="nav-close">
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
            
                    {/* ==== NAV BUTTON ===*/}
                    <div className="nav-btn">
                        {/* ==== TOGGLE BUTTON ===*/}
                        <div className="nav-toggle" id="nav-toggle">
                            <FontAwesomeIcon icon={faBars} />
                        </div>
                    </div>
                </nav>
            </header>

            <div className='login-container'>
                <div className='form'>
                    <h2 className='UserAccount-title'>Update User</h2>

                    <div className='box'>
                        <p>Name</p>
                        <input type='text' placeholder='Add your Name' onChange={(e) => setName(e.target.value)} />
                        <p style={{ color: 'red' }}>{nameError}</p> {/* Display name validation error */}
                    </div>
                    
                    <div className='box'>
                        <p>Email</p>
                        <input type='email' placeholder='Add your Email' onChange={(e) => setEmail(e.target.value)} />
                        <p style={{ color: 'red' }}>{emailError}</p> {/* Display email validation error */}
                    </div>

                    <div className='box'>
                        <p>Password</p>
                        <input type='password' placeholder='Add your Password' onChange={(e) => setPassword(e.target.value)} />
                        <p style={{ color: 'red' }}>{passwordError}</p> {/* Display password validation error */}
                    </div>

                    <button onClick={handleUpdate}>Update User</button>
                    <button onClick={() => navigate('/ManageUsers')}>Back</button>
                </div>
            </div>
            
            <footer>
                <h1>Connect with me</h1>
                <p class="description">
                    Stay updated and never miss out on the latest reservations and romantic ideas! <br></br>
                    Follow me on social media for tips, inspiration, and exclusive offers.
                </p>
                <p>© Copyright: Foolish Developer</p>
            </footer>
        </div>
    );
}

export default EditUser;