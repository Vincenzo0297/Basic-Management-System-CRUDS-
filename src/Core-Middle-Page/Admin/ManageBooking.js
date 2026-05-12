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
}, []); 

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
                                    <tr>
                                        <td>ID</td>
                                        <td>Borth</td>
                                        <td>fff</td>
                                        <td>ddd</td>
                                        <td>ddd</td>
                                        <td>
                                            <div className="manage-users-btn">
                                                <button className="btn btn-primary" onClick={() => window.location.href = '/EditBooking'}> Edit</button>
                                                <button className="btn btn-danger"> Delete </button>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="pagination">
                            <div className="manage-users-btn">
                                <button className="btn btn-secondary">Previous</button>
                                <button className="btn btn-secondary">Next</button>  
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