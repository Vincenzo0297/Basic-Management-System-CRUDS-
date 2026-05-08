import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faBars, faFlagCheckered, faBullseye, faAddressBook  } from '@fortawesome/free-solid-svg-icons';
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
                              Our Car Book Management System helps you efficiently organize, track, and manage car bookings with ease. 
                              Whether you are handling reservations, customer details, or vehicle availability, the platform provides 
                              a simple and reliable way to streamline your operations. Manage bookings effortlessly and keep your 
                              car rental process running smoothly.
                              </p>
                        </div>
                    </div>
                </div>
              </div>
            </div>
          </main>

          <section className="experience" id="experience">
            <div className="container">
              <h2 className="section-title padd-15">About NutriTrack</h2>
                <div className="experience-items row">
                  <div className="experience-item padd-15">
                    <div className="experience-item-inner">
                      <div className="experience-item-thumbnail">
                        <FontAwesomeIcon icon={faFlagCheckered} className="icon" />
                      </div>
                      <h1>Our Team</h1>
                      <p>
                        Our team consists of dedicated developers, system administrators, and customer support professionals 
                        working together to deliver an efficient Car Book Management System. With expertise in vehicle management, 
                        booking solutions, and technology innovation, we aim to provide a smooth and reliable experience for both 
                        customers and administrators.
                      </p>
                    </div>
                  </div>

                  <div className="experience-item padd-15">
                    <div className="experience-item-inner">
                      <div className="experience-item-thumbnail">
                        <FontAwesomeIcon icon={faBullseye} className="icon" />
                      </div>
                      <h1>Our Mission</h1>
                      <p>
                        Our mission is to simplify and modernize vehicle booking management through an efficient and user-friendly 
                        Car Book Management System. We strive to provide reliable tools that help businesses and customers manage 
                        reservations, track vehicle availability, and streamline daily operations with ease and convenience.
                      </p>
                    </div>
                  </div>

                  <div className="experience-item padd-15">
                    <div className="experience-item-inner">
                      <div className="experience-item-thumbnail">
                        <FontAwesomeIcon icon={faAddressBook } className="icon" />
                      </div>
                      <h1>Contact Us</h1>
                      <p>
                          We’re here to assist you with any questions, support requests, or feedback regarding our Car Book Management System. 
                          Whether you need help with bookings, vehicle management, or account-related concerns, our team is always ready to help.
                      </p>
                    </div>
                  </div>
              </div>
            </div>
          </section>
     
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