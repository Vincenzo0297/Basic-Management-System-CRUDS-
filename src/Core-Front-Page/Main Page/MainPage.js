import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import './MainPage.css'; // Import the CSS file for styling
import { handleNavToggle } from '../Main Page/JavaScript'; // Ensure this path is correct

function MainPage() {
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
                <li className="nav-item"><a href="/mainPage" className="nav-link">Home</a></li>
                <li className="nav-item"><a href="/our-story" className="nav-link">Our Story</a></li>
                <li className="nav-item"><a href="/promotions" className="nav-link">Promotion</a></li>
                <li className="nav-item"><a href="/login" className="nav-link">Login</a></li>
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

        <main className="about section" id="#">
            <div className="container">
                <div className="row">
                    <div className="about-content padd-15">
                        <div className="row">
                            <div className="about-text padd-15">    
                                <h2>Welcome!</h2>
                                <p>
                                    You can easily plan and reserve time with your significant other, ensuring those 
                                    special moments are never missed. Whether it’s a spontaneous date or a planned 
                                    surprise, our platform helps you prioritize your relationship in a fun and organized way. 
                                    Start reserving now and make every moment count!
                                </p>
                            </div>
                        </div>
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

export default MainPage;