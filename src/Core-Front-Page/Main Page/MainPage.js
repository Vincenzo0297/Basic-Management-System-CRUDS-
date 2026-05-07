import React, { useEffect } from 'react';
import './MainPage.css'; // Import the CSS file for styling

function MainPage() {
  useEffect(() => {
    // This effect runs once when the component mounts
    console.log('MainPage component has mounted');

  }, []);

  return (
    <div>
      <h1>Welcome to the Main Page</h1>
      {/* Add your main page content here */}
      <p>This is the main page of the application.</p>
    </div>
  );
}

export default MainPage;