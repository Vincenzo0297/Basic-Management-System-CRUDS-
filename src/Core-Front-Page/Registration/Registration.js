import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import '../Main Page/MainPage.css'; // Import the CSS file for styling
import './Registration.css'; // Import the CSS file for styling
import { handleNavToggle } from '../Main Page/JavaScript'; // Ensure this path is correct

function Registration() {
  useEffect(() => {
    handleNavToggle(); // Call the function to initialize navigation toggle functionality
  }, []);

  const [email, setEmail] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');

  const [emailError, setEmailError] = useState('');
  const [dateOfBirthError, setDateOfBirthError] = useState('');

  const validationRegistration = () => {
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

  const register = () => {
    if (validationRegistration()) {
      // Placeholder registration function
      alert('Not yet ready!');
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
                <li className="nav-item"><a href="/our-story" className="nav-link">Our Story</a></li>
                <li className="nav-item"><a href="/promotions" className="nav-link">Promotion</a></li>
                <li className="nav-item"><a href="/login" className="nav-link">Login</a></li>
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
              <h2 className='UserAccount-title'>Register Account</h2>
                    
                <div className='box'>
                  <p>Email</p>
                  <input type='email' placeholder='Add your Email' onChange={(e) => setEmail(e.target.value)} />
                  <p style={{ color: 'red' }}>{emailError}</p> {/* Display email validation error */}
                </div>

                <div className='box'>
                  <p>Date of Birth</p>
                  <input type='date' onChange={(e) => setDateOfBirth(e.target.value)} />
                  <p>{dateOfBirthError}</p> {/* Display date of birth validation error */}
                </div>

                <div className='box'>
                  <p>Gender</p>
                    <select>
                      <option value=''>Select your Gender</option>
                      <option value='Male'>Male</option>
                      <option value='Female'>Female</option>
                    </select>
                </div>
                <button onClick={register}>Create Account</button>
                <p>Already Have An Account?<Link to='/login'> Login Here</Link></p>
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

export default Registration;