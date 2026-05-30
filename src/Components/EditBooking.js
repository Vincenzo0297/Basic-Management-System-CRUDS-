import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import '../Core-Front-Page/Main Page/MainPage.css'; // Import the CSS file for styling
import './Components.css'; // Import the CSS file for styling
import { handleNavToggle } from '../Core-Front-Page/Main Page/JavaScript'; // Ensure this path is correct
import {db} from '../Firebase/firebase'; // Corrected import path for the Firestore database instance
import { doc, getDoc, updateDoc} from 'firebase/firestore'; // Import necessary Firestore functions for querying and adding documents

function EditBooking() {
    const { id } = useParams();
    useEffect(() => {
        handleNavToggle();
        fetchUser(); // Call the function to initialize navigation toggle functionality
}, [id]); 

    const navigate = useNavigate(); 
    
    const [locationName, setLocationName] = useState('');
    const [locationDescription, setLocationDescription] = useState('');
    const [Availability, setAvailability] = useState('');
    const [cost, setCost] = useState('');
    const [lateCost, setLateCost] =useState('');

    const [locationNameError, setLocationNameError] = useState('');
    const [locationDescriptionError, setLocationDescriptionError] = useState('');
    const [AvailabilityError, setAvailabilityError] = useState('');
    const [costError, setCostError] = useState('');
    const [lateCostError, setLateCostError] = useState('');

    const validateReservation = () => {
        let isValid = true;

        // Location Name validation
        const LocationNamePattern = /^[a-zA-Z\s]+$/; // Only letters and spaces allowed
        if (locationName.trim() === '') {
            setLocationNameError('Location Name is required');
            isValid = false;
        } else if (!LocationNamePattern.test(locationName)) {
            setLocationNameError('Location Name can only contain letters and spaces');
            isValid = false;
        } else {
            if (locationName.trim().length < 6) {
                setLocationNameError('Location Name must be at least 6 characters long');
                isValid = false;
            } else {
                setLocationNameError('');
            }
        }

        // Location Description validation
        const LocationDescriptionPattern = /^[a-zA-Z\s]+$/; // Only letters and spaces allowed
        if (locationDescription.trim() === '') {
            setLocationDescriptionError('Location Description is required');
            isValid = false;
        } else if (!LocationDescriptionPattern.test(locationDescription)) {
            setLocationDescriptionError('Location Description can only contain letters and spaces');
            isValid = false;
        } else {
            if (locationDescription.trim().length < 6) {
                setLocationDescriptionError('Location Description must be at least 6 characters long');
                isValid = false;
            } else {
                setLocationDescriptionError('');
            }
        }

         // Availability / Capacity validation
        const AvailabilityPattern = /^[0-9]+$/; // Only numbers allowed
        if (Availability.trim() === '') {
                setAvailabilityError('Availability / Capacity is required');
                isValid = false;
            } else if (!AvailabilityPattern.test(Availability)) {
                setAvailabilityError('Only numbers are allowed');
                isValid = false;
            } else {
                setAvailabilityError('');
        }

        const CostPerHrPattern = /^(?!0\d)\d+(\.\d+)?$/;
        if (cost.trim() === '') {
            setCostError('Cost Per Hour is required');
            isValid = false;
        } else if (!CostPerHrPattern.test(cost)) {
            setCostError('Enter a valid cost');
            isValid = false;
        } else {
            if (parseFloat(cost) <= 0) {
                setCostError('Cost Per Hour must be greater than 0');
                isValid = false;
            } else {
                setCostError('');
            }
        }

        if(lateCost.trim() === '') {
            setLateCostError('Late Cost Per Hour is required');
            isValid = false;
        } else if(!CostPerHrPattern.test(lateCost)) {
            setLateCostError("Enter a valid late cost");
            isValid = false;
        } else {
             if (parseFloat(lateCost) <= 0) {
                setLateCostError('Late Cost Per Hour must be greater than 0');
                isValid = false;
            } else {
                setLateCostError('');
            }
        }
        return isValid;
    };

    const fetchUser = async () => {
        try {
            const docRef = doc(db, "Reservation", id);
            const docSnap = await getDoc(docRef);

            if(docSnap.exists()) {
                const locationData = docSnap.data();
                setLocationName(locationData.LocationName);
                setLocationDescription(locationData.LocationDescription);
                setAvailability(locationData.space);
                setCost(locationData.CostPerHour);
                setLateCost(locationData.lateCostPerHour);
            }
        } catch (error) {
            console.error("Error fetching location:", error);
        }
    };

    const handleUpdate = async () => {
        if(validateReservation()) {
            try {
                await updateDoc(doc(db, "Reservation", id), {
                    LocationName: locationName,
                    LocationDescription: locationDescription,
                    space: Availability,
                    costPerHour: cost,
                    lateCostPerHour: lateCost,
                });
                alert('Location updated Successfully');
                navigate('/ManageBooking');
            } catch(error) {
                 console.error("Error updating location:", error);
            }
        }
    };
    
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
                    <h2 className='UserAccount-title'>Update Reservation</h2>

                    <div className='box'>
                        <p>Location Name</p>
                        <input type='text' value={locationName}  placeholder='Add Location Name' onChange={(e) => setLocationName(e.target.value)}/>
                        <p style={{ color: 'red' }}>{locationNameError}</p>
                    </div>

                    <div className='box'>
                        <p>Location Description</p>
                        <textarea type='text' rows={7} cols={40} value={locationDescription} placeholder='Add Location Description' onChange={(e) => setLocationDescription(e.target.value)} />
                         <p style={{ color: 'red' }}>{locationDescriptionError}</p>
                    </div>

                    <div className='box'>
                        <p>Availability</p>
                        <input type='text' placeholder='Enter Capacity' value={Availability} onChange={(e) => setAvailability(e.target.value)} />
                        <p style={{ color: 'red' }}> {AvailabilityError} </p>
                    </div>
                        
                    <div className='box'>
                        <p>Cost per hour</p>
                         <input type='text' value={cost} placeholder='Edit Cost Per Hour' onChange={(e) => setCost(e.target.value)} />
                          <p style={{ color: 'red' }}>{costError}</p>
                    </div>

                    <div className='box'>
                        <p>Late Cost per hour</p>
                         <input type='text' value={lateCost} placeholder='Edit Late Cost Per Hour' onChange={(e) => setLateCost(e.target.value)} />
                          <p style={{ color: 'red' }}>{lateCostError}</p>
                    </div>

                    <button onClick={handleUpdate}>Update Reservation</button>
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

export default EditBooking;