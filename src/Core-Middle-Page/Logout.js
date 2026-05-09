import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Firebase/Usercontent'; // Import the UserContext

const Logout = () => {
    // Clear the user context and navigate to the login page
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();

    // Use useEffect to perform the logout action when the component mounts
    useEffect(() => {
        setUser(null); // Clear the user context
        navigate('/login', { replace: true });
        window.history.pushState(null, '', window.location.href); // Prevent back navigation
        alert("You have been logged out.");
    }, [setUser, navigate]);

    return null;
};

export default Logout;