import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars} from '@fortawesome/free-solid-svg-icons';
import { handleNavToggle } from '../../Core-Front-Page/Main Page/JavaScript'; // Ensure this path is correct

function User() {
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
                        <li className="nav-item"><a href="/UserViewLocation" className="nav-link">View Location</a></li>
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

export default User;