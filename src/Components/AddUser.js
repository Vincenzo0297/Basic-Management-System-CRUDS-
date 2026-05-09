import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import '../Core-Front-Page/Main Page/MainPage.css'; // Import the CSS file for styling
import './Components.css'; // Import the CSS file for styling
import { handleNavToggle } from '../Core-Front-Page/Main Page/JavaScript'; // Ensure this path is correct

import {db} from '../Firebase/firebase'; // Corrected import path for the Firestore database instance
import { getDocs, addDoc, collection, where, query } from 'firebase/firestore'; // Import necessary Firestore functions for querying and adding documents

function AddUser() {
  useEffect(() => {
    handleNavToggle(); // Call the function to initialize navigation toggle functionality
}, []);

  // Initialize the navigate function for programmatic navigation
  const navigate = useNavigate(); 
   
  // State variables for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [userType, setUserType] = useState('');
  
  // State variables for validation errors
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [dateOfBirthError, setDateOfBirthError] = useState('');

  // Validation function for registration form
  const validationRegistration = () => {
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

    // Date of Birth validation
    const dateOfBirthPattern = /^\d{4}-\d{2}-\d{2}$/;
    if (dateOfBirth.trim() === '') {
        setDateOfBirthError('Date of Birth is required');
        isValid = false;
    } else if (!dateOfBirthPattern.test(dateOfBirth)) {
        setDateOfBirthError('Invalid date format. Use YYYY-MM-DD');
        isValid = false;
    } else {
        const today = new Date();
        const birthDate = new Date(dateOfBirth);

        // Check if date is today or in the future
        if (birthDate >= today) {
            setDateOfBirthError('Date of Birth cannot be today or a future date');
            isValid = false;
        } else {
            // Calculate age
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();

            // Adjust age if the birth month and day haven't occurred yet this year
            if (
                monthDiff < 0 ||
                (monthDiff === 0 && today.getDate() < birthDate.getDate())
            ) {
                age--;
            }

            // Check if user is at least 18 years old
            if (age < 18) {
                setDateOfBirthError('You must be at least 18 years old');
                isValid = false;
            } else {
                setDateOfBirthError('');
            }
        }
    }
    return isValid;
  };

  // Placeholder registration function
  const register = async () => {
    if (!validationRegistration()) {
      return;
    }

    // Check if the email already exists in the Firestore database
    const dbref = collection(db, 'Auth');
    const matchEmail = query(dbref, where('Email', '==', email)); // Create a query to check for existing email addresses in the 'Auth' collection

    // Try to fetch documents matching the email and handle registration logic
    try {
      const snapshot = await getDocs(matchEmail);
      const emailMatchingArray = snapshot.docs.map((doc) => doc.data());

      // If email already exists, show an alert. Otherwise, add the new user to the database and navigate to the appropriate page based on user type.
      if (emailMatchingArray.length > 0) {
          alert('This Email Address Already Exists');
      } else {
          // Set userType to 'User' directly since it's the only option available in the dropdown
          const userType = 'User'; // Set userType to PremiumUser directly
            await addDoc(dbref, {
                Name: name,
                Email: email,
                Password: password,
                DateOfBirth: dateOfBirth,
                UserType: userType // Store the userType
              });
            alert('Add User Successfully');
            window.location.reload(); // Refresh the page to reflect the changes
        } 
    } catch (error) {
        alert(error.message);
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
              <h2 className='UserAccount-title'>Add User</h2>

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

                <div className='box'>
                  <p>Date of Birth</p>
                  <input type='date' onChange={(e) => setDateOfBirth(e.target.value)} />
                  <p style={{ color: 'red' }}>{dateOfBirthError}</p> {/* Display date of birth validation error */}
                </div>

                <div className='box'>
                  <p>User Type</p>
                    <select onChange={(e) => setUserType(e.target.value)}>
                      <option value=''>Select User Type</option>
                      <option value='User'>User</option>
                      <option value='Admin'>Admin</option>
                    </select>
                </div>
                <button onClick={register}>Create Account</button>
                <button onClick={() => window.location.href = '/ManageUsers'}>Back</button>
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

export default AddUser;