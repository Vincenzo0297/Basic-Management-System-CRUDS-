import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import '../Main Page/MainPage.css'; // Import the CSS file for styling
import './Login.css'; // Import the CSS file for styling
import { handleNavToggle } from '../Main Page/JavaScript'; // Ensure this path is correct


function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  useEffect(() => {
    handleNavToggle(); // Call the function to initialize navigation toggle functionality
  }, []);

  const login = () => {
    // Placeholder login function
    alert('Not ready yet.');
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
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
                <li className="nav-item"><a href="/our-story" className="nav-link">Our Story</a></li>
                <li className="nav-item"><a href="/promotions" className="nav-link">Promotion</a></li>
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
              <h2>Login</h2>
                <div className='box'>
                    <input type='email' placeholder='Email' />
                </div>

                <div className='box'>
                  <input type={showPassword ? 'text' : 'password'} placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    <span className='toggle-password' onClick={togglePasswordVisibility}>
                        {showPassword ? <FaEyeSlash /> : <FaEye />} {/* Font Awesome icons */}
                    </span>
                </div>
                    <button onClick={login}>Sign In Your Account</button>
                    <p>Don't Have An Account?<Link to='/Registration'> Create Account</Link></p>
            </div>
        </div>
    </div>
  );
}

export default Login;