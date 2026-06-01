import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import { collection, getDocs, deleteDoc, doc, where, query } from 'firebase/firestore';

import { db } from '../../Firebase/firebase'; // Adjust path correctly
import { handleNavToggle } from '../../Core-Front-Page/Main Page/JavaScript';

import './Admin.css';

function ManageBooking() {
    useEffect(() => {
    handleNavToggle(); // Call the function to initialize navigation toggle functionality
    fetchLocation();
}, []); 

    // Filter All location, Filter Available location, Filter Full Spaces location
    const [filter, setFilter] = useState('All');
    const [reservation, setReservation] = useState([]);
    const [allReservation, setAllReservation] = useState([]);

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

    // Fetch all location data from Firestore
    const fetchLocation = async () => {
        try {
            const querySS = await getDocs(collection(db, "Reservation")); // Fetch all documents from the "Reservation" collection

            // only docs with LocationName
            const filteredDocs = querySS.docs.filter(
                doc => doc.data()
            );

            // Map the filtered documents to an array of location data
            const locationData = filteredDocs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setReservation(locationData); // Set the reservation state with the initial data
            setAllReservation(locationData); // Set the allReservation state with the initial data

        } catch (error) {
            console.error("Error fetching Location:", error);
        }
    };

   const handleSearch = async (event) => {

        const value = event.target.value; // Get the search query from the input field
        setSearchQuery(value); // Update the searchQuery state with the current value of the input field

        try {
            const reservationRef = collection(db, "Reservation"); // Reference to the "Reservation" collection in Firestore
            
            // Create a query to search for documents where the "LocationName" field matches the search query (case-insensitive)
            const q = query(
                reservationRef,
                where("LocationName", ">=", value),
                where("LocationName", "<=", value + "\uf8ff")
            );

            // Execute the query and get the matching documents
            const querySnapshot = await getDocs(q);
            const results = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));

            setReservation(results); // Update the reservation state with the search results, which will trigger a re-render of the component to display the filtered locations

        } catch (error) {
            console.error(error);
        }
    };

    // Handle filter change to show all locations, available locations, or full spaces locations
    const handleFilterChange = (event) => {
        const value = event.target.value; // Get the selected filter value from the dropdown
        setFilter(value); // Update the filter state with the selected value

        // Filter the locations based on the selected filter value
        if (value === "Available") {
            const availableLocations = allReservation.filter(
                (location) => Number(location.Capacity) < Number(location.space)
            );
            setReservation(availableLocations); // Update the reservation state with the filtered locations based on the selected filter value

        } else if (value === "Full Spaces Location") {
            const fullLocations = allReservation.filter(
                (location) =>  Number(location.Capacity) >= Number(location.space)
            );
            setReservation(fullLocations); // Update the reservation state with the filtered locations based on the selected filter value

        } else {
            setReservation(allReservation); // If "All" is selected, reset the reservation state to show all locations
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
                                <select className="filter-select" value={filter} onChange={handleFilterChange}>
                                    <option value="All">All Space</option>
                                    <option value="Available"> Current Available Space</option>
                                    <option value="Full Spaces Location"> Current Full Spaces Locations</option>
                                </select>
                            </div>
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Location Name</th>
                                        <th>Location Description</th>
                                        <th>Availability</th>
                                        <th>Capacity</th>
                                        <th>Cost ($) per hour: </th>
                                        <th>Late ($) per hour: </th>
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
                                                <td>{reservation.Capacity}</td>
                                                <td>{reservation.CostPerHour}</td>
                                                <td>{reservation.lateCostPerHour}</td>
                                                <td>
                                                    <div className="manage-users-btn">
                                                        <button className="btn btn-primary" onClick={() => window.location.href = `/EditBooking/${reservation.id}`}> Edit</button>
                                                        <button className="btn btn-danger" onClick={() => handleLocationDelete(reservation.id)}> Delete </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="8" className="text-center">
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