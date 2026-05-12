import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import '../Core-Front-Page/Main Page/MainPage.css'; // Import the CSS file for styling
import './Components.css'; // Import the CSS file for styling
import { handleNavToggle } from '../Core-Front-Page/Main Page/JavaScript'; // Ensure this path is correct

import {db} from '../Firebase/firebase'; // Corrected import path for the Firestore database instance
import { getDocs, addDoc, collection, where, query } from 'firebase/firestore'; // Import necessary Firestore functions for querying and adding documents

function AddBooking() {
    useEffect(() => {
        handleNavToggle(); // Call the function to initialize navigation toggle functionality
}, []); 
    
    return (
        <div>
            <header className="header" id="header">
                {/* ==== NAV ===*/}
                <nav className="nav container">
                    {/* ==== NAV MENU ===*/}
                    <div className="nav-menu" id="nav-menu">
                        {/* ==== NAV LIST ===*/}
                        <ul className="nav-list">
                            <li className="nav-item"><a href="/Admin" className="nav-link">Home Page</a></li>
                            <li className="nav-item"><a href="/ManageUsers" className="nav-link">Manage Users</a></li>
                            <li className="nav-item"><a href="/ManageBooking" className="nav-link">Manage Booking</a></li>
                            <li className="nav-item"><a href="/Logout" className="nav-link">Logout</a></li>
                        </ul> 
            
                        {/* ==== NAV CLOSE ===*/}
                        <div className="nav-close" id="nav-close">
                            <FontAwesomeIcon icon={faTimes} />
                        </div>
                    </div>
            
                    {/* ==== NAV BUTTON ===*/}
                    <div className="nav-btn">
                        {/* ==== TOGGLE BUTTON ===*/}
                        <div className="nav-toggle" id="nav-toggle">
                            <FontAwesomeIcon icon={faBars} />
                        </div>
                    </div>
                </nav>
            </header>


            <div className='login-container'>
                <div className='form'>
                    <h2 className='UserAccount-title'>Add the Reservation</h2>

                    <div className='box'>
                        <p>Location Name</p>
                        <input type='text' placeholder='Add Location Name' />
                    </div>

                    <div className='box'>
                        <p>Location Description</p>
                        <textarea type='text' rows={7} cols={40} placeholder='Add Location Description' />
                    </div>

                    <div className='box'>
                        <p>Availability / Capacity</p>
                        <input type='text' placeholder='Add Location Name' />
                    </div>
                        
                    <div className='box'>
                        <p>Cost per hour</p>
                         <input type='text' placeholder='Add Price' />
                    </div>

                    <button>Create Reservation</button>
                    <button onClick={() => window.location.href = '/ManageBooking'}>Back</button>
                </div>
            </div>

            <footer>
                <h1>Connect with me</h1>
                <p class="description">
                    Stay updated and never miss out on the latest reservations and romantic ideas! <br></br>
                    Follow me on social media for tips, inspiration, and exclusive offers.
                </p>
                <p>© Copyright: Foolish Developer</p>
            </footer>
        </div>
    );
}
export default AddBooking;