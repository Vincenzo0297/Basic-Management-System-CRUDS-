import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import { collection, getDocs, deleteDoc, doc, where, query } from 'firebase/firestore';

import { db } from '../../Firebase/firebase'; // Adjust path correctly
import { handleNavToggle } from '../../Core-Front-Page/Main Page/JavaScript';

import './Admin.css';

function ManageUsers() {
    useEffect(() => {
        handleNavToggle();
        fetchUsers();
}, []);

    const [users, setUsers] = useState([]); // State to hold the list of users

    // Search for user
    const [searchQuery, setSearchQuery] = useState(''); 
    
    // Pagination state and logic
    const [currentPage, setCurrentPage] = useState(1); // State to track the current page
    const usersPerPage = 5; // Number of users to display per page
    const indexOfLastUser = currentPage * usersPerPage; // Calculate the index of the last user on the current page
    const indexOfFirstUser = indexOfLastUser - usersPerPage; // Calculate the index of the first user on the current page
    // Slice the users array to get the users for the current page
    const currentUsers = users.slice(
        indexOfFirstUser,
        indexOfLastUser
    );

    const totalPages = Math.ceil(users.length / usersPerPage); // Calculate the total number of pages based on the total number of users and users per page

    // Fetch users from Firestore
    const fetchUsers = async () => {
        try {
            // Assuming users are stored in a collection named "Auth"
            const querySnapshot = await getDocs(collection(db, "Auth"));

            // only users with UserType "User" will be displayed in the ManageUsers page
            const filteredDocs = querySnapshot.docs.filter(doc => doc.data().UserType === "User");

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

    // Search for user 
    const handleSearch = async (event) => {
        const value = event.target.value;

        setSearchQuery(value);

        try {
            const usersRef = collection(db, "Auth");

            const q = query(
                usersRef,
                where("Name", ">=", value),
                where("Name", "<=", value + "\uf8ff")
            );

            const querySnapshot = await getDocs(q);

            // only User type users
            const filteredDocs = querySnapshot.docs.filter(
                doc => doc.data().UserType === "User"
            );

            const results = filteredDocs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            setUsers(results);

            } catch (error) {
                console.error("Search error:", error);
            }
    };

    // Handle user deletion
    const handleDelete = async (userId) => {
        try {
            await deleteDoc(doc(db, "Auth", userId));
            alert("User deleted");
            window.location.reload(); // Refresh the page to reflect the changes
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <header className="header" id="header">
                <nav className="nav container">
                    <div className="nav-menu" id="nav-menu">
                        <ul className="nav-list">
                            <li className="nav-item"><a href="/Admin" className="nav-link">Home Page</a></li>
                            <li className="nav-item"><a href="/ManageBooking" className="nav-link">Manage Booking</a></li>
                            <li className="nav-item"><a href="/Logout" className="nav-link">Logout</a></li>
                        </ul>

                        <div className="nav-close" id="nav-close">
                            <FontAwesomeIcon icon={faTimes} />
                        </div>
                    </div>

                    <div className="nav-btn">
                        <div className="nav-toggle" id="nav-toggle">
                            <FontAwesomeIcon icon={faBars} />
                        </div>
                    </div>
                </nav>
            </header>

            <main className="manage-users section">
                <div className="container">
                    <div className="manage-users-content padd-15">
                        <div className="table-responsive">
                            <div className="manage-users-btn">
                                <button className="btn btn-success" onClick={() => window.location.href = '/AddUser'}>Add User</button>
                                <input type="text" className="search-input" placeholder="Search..." value={searchQuery} onChange={handleSearch}/>
                            </div>

                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>User ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Date Of Birth</th>
                                        <th>User Type</th>
                                        <th>Actions</th>
                                        <th>Check In / Out</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {currentUsers.length > 0 ? (
                                        currentUsers.map((user, index) => (
                                            <tr key={user.id}>
                                                <td>{indexOfFirstUser + index + 1}</td>
                                                <td>{user.Name}</td>
                                                <td>{user.Email}</td>
                                                <td>{user.DateOfBirth}</td>
                                                <td>{user.UserType}</td>
                                                <td>
                                                    <div className="manage-users-btn">
                                                        <button className="btn btn-primary" onClick={() => window.location.href = `/EditUser/${user.id}`}> Edit</button>
                                                        <button className="btn btn-danger" onClick={() => handleDelete(user.id)}> Delete </button>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="manage-users-btn">
                                                        <button>Check In</button>
                                                        <button>Check Out</button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center">
                                                No users found.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="pagination">
                            <div className="manage-users-btn">
                                <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)} className="btn btn-secondary">Previous</button>
                                <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}className="btn btn-secondary">Next</button>
                                {/* PAGE INDICATOR */}
                                <span className="page-info"> Page {currentPage} of {totalPages} </span>     
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer>
                <h1>Connect with me</h1>
                <p className="description">
                    Stay updated and never miss out on the latest reservations and romantic ideas!
                    <br />
                    Follow me on social media for tips, inspiration, and exclusive offers.
                </p>

                <p>© Copyright: Foolish Developer</p>
            </footer>
        </div>
    );
}

export default ManageUsers;