import React, { useEffect } from 'react';
import './Registration.css'; // Import the CSS file for styling

function Registration() {
  useEffect(() => {
    // This effect runs once when the component mounts
    console.log('Registration component has mounted');

  }, []);

  return (
    <div>
      <h1>Welcome to the Registration Page</h1>
      {/* Add your registration page content here */}
      <p>Please fill out the form to create an account.</p>
    </div>
  );
}

export default Registration;