import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars} from '@fortawesome/free-solid-svg-icons';
import { handleNavToggle } from '../../Core-Front-Page/Main Page/JavaScript'; // Ensure this path is correct
//admin style
import './Admin.css'; 

function ManageUsers() {
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
                        <li className="nav-item"><a href="/" className="nav-link">Profile</a></li>
                        <li className="nav-item"><a href="/Reservations" className="nav-link">Reservations</a></li>
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

        <main className="manage-users section" id="#">
            <div className="container">
                <div className="manage-users-content padd-15">
                    <div className = "table-responsive">
                        <table className = "table table-bordered">
                            <thead>
                                <tr>
                                    <th>User ID</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>John Doe</td>
                                    <td>john.doe@example.com</td>
                                    <td>
                                        <button className="btn btn-primary">Edit</button>
                                        <button className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>

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

export default ManageUsers