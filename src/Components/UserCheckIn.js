import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import { collection, getDocs, doc, updateDoc, increment, where, query} from 'firebase/firestore';

import { db } from '../Firebase/firebase'; // Adjust path correctly
import { handleNavToggle } from '../Core-Front-Page/Main Page/JavaScript';

function UserCheckIn() {
    useEffect(() => {
    handleNavToggle(); // Call the function to initialize navigation toggle functionality
    fetchLocation(); // Call the function to fetch location data from Firestore when the component mounts
}, []); 

    const [filter, setFilter] = useState("All");
    const [reservation, setReservation] = useState([]);
    const [allReservation, setAllReservation] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const [selectLocation, setSelectLocation] = useState(null);

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
            setAllReservation(locationData); // Store all locations in a separate state variable for filtering purposes

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
            // Process the search results
            const searchResults = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setReservation(searchResults);
        } catch (error) {
            console.error("Error searching locations:", error);
        }
    };

    const handleFilterChange = (event) => {
        const value = event.target.value;
        setFilter(value);
        if (value === "Available") {
            const availableLocations = allReservation.filter(
                (location) => Number(location.Capacity) < Number(location.space)
            );
            setReservation(availableLocations);
        } else if (value === "Full Spaces Location") {
            const fullLocations = allReservation.filter(
                (location) =>  Number(location.Capacity) >= Number(location.space)
            );
            setReservation(fullLocations);
        } else {
            setReservation(allReservation);
        }
    };

    const handleCheckIn = async () => {
        try {
            if (!selectLocation) {
                alert("Please select a location.");
                return;
            }

            const selectData = reservation.find(
                item => item.id === selectLocation
            );

            // Parking full
            if (selectData.Capacity >= selectData.space) {
                alert("Parking Full!");
                return;
            }

            const locationRef = doc(db, "Reservation", selectLocation);

            await updateDoc(locationRef, {
                Capacity: increment(1)
            });

            alert("Check In Successful!");

            fetchLocation(); // refresh table

        } catch (error) {
            console.error("Error checking in:", error);
            alert("Check In Failed!");
        }
    };

    return (
        <div>
            <header className="header" id="header">
                <nav className="nav container">
                    <div className="nav-menu" id="nav-menu">
                        <ul className="nav-list">
                            <li className="nav-item"><a href="/User" className="nav-link">Home Page</a></li>
                            <li className="nav-item"><a href="/UserViewLocation" className="nav-link">View Location</a></li>
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
                                        <th>Description</th>
                                        <th>Capacity</th>
                                        <th>ParkingSpace (Capacity)</th>
                                        <th>CostPerHr ($)</th>
                                        <th>LateCost ($)</th>
                                        <th>Select</th>
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
                                                <td><input type="radio" name="location" checked={selectLocation === reservation.id} onChange={() => setSelectLocation(reservation.id)}/> </td>
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

                    <form>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <label>Current Date:</label>
                                        <input type="date" name="Date" required />
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <label>Current Time:</label>
                                        <input type="time" name="Time" required />
                                    </td>
                                </tr>

                                <tr>
                                   <td>
                                        <div className="manage-users-btn">
                                            <button type="button" onClick={handleCheckIn}>Check In</button>
                                        </div>
                                   </td>
                                </tr>
                            </tbody>
                        </table>
                    </form>
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

export default UserCheckIn;