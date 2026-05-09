import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import './Admin.css'; // Reuse the Admin CSS for styling, adjust path if necessary

import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../Firebase/firebase'; // Adjust path correctly
import { handleNavToggle } from '../../Core-Front-Page/Main Page/JavaScript'; // Ensure this path is correct

function AdminProfile() {
    useEffect(() => {
        handleNavToggle();
        fetchUsers();
}, []);

    const [users, setUsers] = useState([]); // State to hold the list of users
    // Fetch users from Firestore
    const fetchUsers = async () => {
        try {
            // Assuming users are stored in a collection named "Auth"
            const querySnapshot = await getDocs(collection(db, "Auth"));

            // only show individual user the details when login in the profile page as thier use type, Admin
            const filteredDocs = querySnapshot.docs.filter(doc => doc.data().UserType === "Admin");
            if (filteredDocs.length === 0) {
                alert("No user found with UserType 'Admin'.");
                return;
            }
            
            // Map through the documents and extract user data
            const usersData = filteredDocs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        });
            // Update the state with the fetched users
            setUsers(usersData);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

  return (
    <div>
        <div className="profile-container">
            <div className="profile-header">
                <h2>Your Profiles</h2>
            </div>
            <div className="profile-info">
                {users.map((user, index) => (
                    <div key={index} className="profile-card">
                         <p><strong>Name:</strong> {user.Name}</p>
                        <p><strong>Email:</strong> {user.Email}</p>
                        <p><strong>User Type:</strong> {user.UserType}</p>
                    </div>
                ))}
            </div>
             <div className="manage-users-btn">
                <button className="back-button" onClick={() => window.history.back()}>Back</button>
             </div>
        </div>
    </div>
  );
}

export default AdminProfile;