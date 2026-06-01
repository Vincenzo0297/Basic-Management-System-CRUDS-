import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import { collection, getDocs, doc, updateDoc, increment} from 'firebase/firestore';

import { db } from '../Firebase/firebase'; // Adjust path correctly
import { handleNavToggle } from '../Core-Front-Page/Main Page/JavaScript';

function AdminCheckIn() {
    useEffect(() => {
    handleNavToggle(); // Call the function to initialize navigation toggle functionality
    fetchLocation();
}, []); 

    const [reservation, setReservation] = useState([]);
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

    const [currentDate, setCurrentDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    const [currentTime, setCurrentTime] = useState(
        new Date().toISOString().slice(0,5)
    );

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
                Capacity: increment(1),
                checkInDate: currentDate,
                checkInTime: currentTime,
            });

            alert(
                `Check In Successful!\n\n` +
                `Date: ${currentDate}\n` +
                `Time: ${currentTime}`
            );

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
                            <li className="nav-item"><a href="/Admin" className="nav-link">Home Page</a></li>
                            <li className="nav-item"><a href="/ManageBooking" className="nav-link">Manage Booking</a></li>
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
                                        <input type="date" name="Date" value={currentDate} onChange={(e) => setCurrentDate(e.target.value)}required />
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <label>Current Time:</label>
                                        <input type="time" name="Time" value={currentTime} onChange={(e) => setCurrentTime(e.target.value)} required />
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

export default AdminCheckIn;