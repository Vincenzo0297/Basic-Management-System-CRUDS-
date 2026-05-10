import React, { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../Firebase/Usercontent';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../Main Page/MainPage.css'; // Import the CSS file for styling
import './Login.css'; // Import the CSS file for styling
import { handleNavToggle } from '../Main Page/JavaScript'; // Ensure this path is correct

import {db} from '../../Firebase/firebase'; // Corrected import path for the Firestore database instance
import { getDocs, addDoc, collection, where, query } from 'firebase/firestore'; // Import necessary Firestore functions for querying and adding documents

function Login() {
  useEffect(() => {
    handleNavToggle(); // Call the function to initialize navigation toggle functionality
  }, []);

  // Initialize the navigate function for programmatic navigation
  const navigate = useNavigate(); 

  // State variables for form fields
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State variable to toggle password visibility 
  const [password, setPassword] = useState('');
  
  // State variables for validation errors
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { setUser } = useContext(UserContext);

  const validationLogin = () => {
    let isValid = true;

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
    // Password validation
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

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
      setShowPassword((prev) => !prev);
    };

    const login = async () => {
      const dbref = collection(db, 'Auth');

      try {
        const q = query(
          dbref,
          where('Email', '==', email),
          where('Password', '==', password)
        );

        const snapshot = await getDocs(q);
        const matchingUsers = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        // Check if any matching user is found
        if (matchingUsers.length > 0) {
          // Set the user in context and localStorage
          const user = matchingUsers[0];
          setUser(user);
          localStorage.setItem('user', JSON.stringify(user));
          alert('Login Successfully');
          // Navigate based on user type
          navigateToUserTypePage(user.UserType);
        } else {
          alert('Invalid email or password');
        }
      } catch (error) {
        console.error('Error logging in:', error);
      }
  };

  const navigateToUserTypePage = (userType) => {
      switch (userType) {
        case 'User':
          navigate('/User');
          break;
        case 'Admin':
          navigate('/Admin'); 
          break;
        default:
          navigate('/');
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
              <li className="nav-item"><a href="/mainPage" className="nav-link">Home</a></li>
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
            <h2>Car Booking System</h2>
              <div className='box'>
                  <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
                  {emailError && <p className='error'>{emailError}</p>}
              </div>

              <div className='box'>
                <input type={showPassword ? 'text' : 'password'} placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                {passwordError && <p className='error'>{passwordError}</p>}
                  <span className='toggle-password' onClick={togglePasswordVisibility}>
                    {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Font Awesome icons */}
                  </span>
                </div>
                  <button onClick={login}>Login</button>
            </div>
        </div>
    </div>
  );
}

export default Login;