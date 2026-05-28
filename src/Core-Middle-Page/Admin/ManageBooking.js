import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import { collection, getDocs, deleteDoc, doc, where, query, getDoc } from 'firebase/firestore';

import { db } from '../../Firebase/firebase'; // Adjust path correctly
import { handleNavToggle } from '../../Core-Front-Page/Main Page/JavaScript';

import './Admin.css';

function ManageBooking() {
    useEffect(() => {
    handleNavToggle(); // Call the function to initialize navigation toggle functionality
    fetchLocation();
}, []); 

    const [reservation, setReservation] = useState([]);

    // Search for location
      const [searchQuery, setSearchQuery] = useState(''); 

    // Pagination state and logic
    const [currentPage, setCurrentPage] = useState(1); // State to track the current page
    const locationPerPage = 5; // Number of users to display per page
    const indexOfLastLocation = currentPage * locationPerPage; // Calculate the index of the last user on the current page
    const indexOfFirstLocation = indexOfLastLocation - locationPerPage; // Calculate the index of the first user on the current page
    // Slice the users array to get the users for the current page
    const currentUsers = reservation.slice(
        indexOfFirstLocation,
        indexOfLastLocation
    );
    
    const totalPages = Math.ceil(reservation.length / locationPerPage); // Calculate the total number of pages based on the total number of users and users per page
    
    const fetchLocation = async () => {
        try {
            const querySS = await getDocs(collection(db, "Reservation"));

            // only docs with LocationName
            const filteredDocs = querySS.docs.filter(
                doc => doc.data()
            );

            const locationData = filteredDocs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

        setReservation(locationData);

        } catch (error) {
            console.error("Error fetching Location:", error);
        }
    };

   const handleSearch = async (event) => {

        const value = event.target.value;
        setSearchQuery(value);

        try {

            const reservationRef = collection(db, "Reservation");

            const q = query(
                reservationRef,
                where("LocationName", ">=", value),
                where("LocationName", "<=", value + "\uf8ff")
            );

            const querySnapshot = await getDocs(q);

            const results = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setReservation(results);

        } catch (error) {
            console.error(error);
        }
    };

    const handleLocationDelete = async (reservationId) => {
        try {
            await deleteDoc(doc(db, "Reservation", reservationId));
            alert("Location deleted");
            window.location.reload();
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
                            <li className="nav-item"><a href="/ManageUsers" className="nav-link">Manage Users</a></li>
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
                                <button className="btn btn-success" onClick={() => window.location.href = '/AddBooking'}>Add Booking</button>
                               <input type="text" className="search-input" placeholder="Search..." value={searchQuery} onChange={handleSearch}/>
                            </div>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Location Name</th>
                                        <th>Location Description</th>
                                        <th>Availability / Capacity</th>
                                        <th>Cost ($) per hour: </th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {currentUsers.length > 0 ? (
                                        currentUsers.map((reservation, index) => (
                                            <tr key={reservation.id}>
                                                <td>{indexOfFirstLocation + index + 1}</td>
                                                <td>{reservation.LocationName}</td>
                                                <td>{reservation.LocationDescription}</td>
                                                <td>{reservation.space}</td>
                                                <td>{reservation.money}</td>
                                                <td>
                                                    <div className="manage-users-btn">
                                                        <button className="btn btn-primary"> Edit</button>
                                                        <button className="btn btn-danger" onClick={() => handleLocationDelete(reservation.id)}> Delete </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="text-center">
                                                No Locations found.
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

export default ManageBooking;