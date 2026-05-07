import React, { useEffect } from 'react';
import './Login.css'; // Import the CSS file for styling

function Login() {
  useEffect(() => {
    // This effect runs once when the component mounts
    console.log('Login component has mounted');

  }, []);

  return (
    <div>
      <h1>Welcome to the Login Page</h1>
      {/* Add your login page content here */}
      <p>Please enter your credentials to log in.</p>
    </div>
  );
}

export default Login;