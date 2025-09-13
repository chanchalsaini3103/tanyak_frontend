import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">DecorHome</h3>
            <p className="footer-description">
              Transforming houses into homes with exquisite decor and furniture since 2010. 
              We believe in quality, style, and creating spaces that tell your story.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social-link" aria-label="Instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="social-link" aria-label="Pinterest">
                <i className="fab fa-pinterest-p"></i>
              </a>
              <a href="#" className="social-link" aria-label="Twitter">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="social-link" aria-label="YouTube">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#">Home</a></li>
              <li><a href="#">Shop</a></li>
              <li><a href="#">Collections</a></li>
              <li><a href="#">Gallery</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Testimonials</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Categories</h4>
            <ul className="footer-links">
              <li><a href="#">Living Room</a></li>
              <li><a href="#">Bedroom</a></li>
              <li><a href="#">Dining Room</a></li>
              <li><a href="#">Office</a></li>
              <li><a href="#">Outdoor</a></li>
              <li><a href="#">Decor Accessories</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4 className="footer-heading">Contact Info</h4>
            <div className="contact-info">
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>123 Design Street, Interior City, IC 10001</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>info@decorhome.com</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-clock"></i>
                <span>Mon-Fri: 9AM - 6PM, Sat: 10AM - 4PM</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2023 DecorHome. All rights reserved.</p>
            <div className="footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;