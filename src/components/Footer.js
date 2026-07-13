import React from 'react';
import '../styles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>Your one-stop shop for all your needs.</p>
        </div>
        <div className="footer-section">
          <h3>Contact</h3>
          <p>Email: contact@eshop.com</p>
          <p>Phone: (123) 456-7890</p>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="https://facebook.com">Facebook</a>
            <a href="https://twitter.com">Twitter</a>
            <a href="https://instagram.com">Instagram</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} E-Shop. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;