import React from 'react';
import './Footer.css'; // Import the CSS file for Footer styles
import '@fortawesome/fontawesome-free/css/all.min.css'; 

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-container">
                    <div className="footer-section social-section">
                        <h3>Cage Free</h3>
                        <ul className="social-links">
                            <li><a href="https://www.facebook.com/profile.php?id=100092727630603" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a></li>
                            <li><a href="#"><i className="fab fa-whatsapp"></i></a></li>
                            <li><a href="https://www.instagram.com/cagefreedogcaring/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></li>
                        </ul>
                    </div>
                    <div className="footer-section feedback-section">
                        <h3>Feedback</h3>
                        <button className="feedback-button">Give Feedback</button>
                    </div>
                    <div className="footer-section contact-section">
                        <h3>Contact Us</h3>
                        <p>Email: cagefree@gmail.com</p>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; Cage Free. "We provide top-quality care for your furry friend".</p>
            </div>
        </footer>
    );
}

export default Footer;
