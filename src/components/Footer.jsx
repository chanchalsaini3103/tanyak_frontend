import React from "react";
import "../styles/Footer.css";
import { FaFacebookF, FaInstagram, FaPinterestP, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer" role="contentinfo" aria-label="Site footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">Tanyak</h3>
            <p className="footer-description">
              Transforming houses into homes with exquisite decor and furniture
              since 2015. We believe in quality, style, and creating spaces that
              tell your story.
            </p>
            <div className="social-links" aria-hidden={false}>
              <a href="#" className="social-link" aria-label="Facebook" rel="noopener noreferrer">
                <FaFacebookF />
              </a>
              <a href="#" className="social-link" aria-label="Instagram" rel="noopener noreferrer">
                <FaInstagram />
              </a>
              <a href="#" className="social-link" aria-label="Pinterest" rel="noopener noreferrer">
                <FaPinterestP />
              </a>
              <a href="#" className="social-link" aria-label="Twitter" rel="noopener noreferrer">
                <FaTwitter />
              </a>
              <a href="#" className="social-link" aria-label="YouTube" rel="noopener noreferrer">
                <FaYoutube />
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <a href="/" aria-label="Home">Home</a>
              </li>
              <li>
                <a href="/shop" aria-label="Shop">Shop</a>
              </li>
              <li>
                <a href="/collections" aria-label="Collections">Collections</a>
              </li>
              <li>
                <a href="/gallery" aria-label="Gallery">Gallery</a>
              </li>
              <li>
                <a href="/about" aria-label="About Us">About Us</a>
              </li>
              <li>
                <a href="/testimonials" aria-label="Testimonials">Testimonials</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Categories</h4>
            <ul className="footer-links">
              <li>
                <a href="/living-room" aria-label="Living Room">Living Room</a>
              </li>
              <li>
                <a href="/bedroom" aria-label="Bedroom">Bedroom</a>
              </li>
              <li>
                <a href="/dining-room" aria-label="Dining Room">Dining Room</a>
              </li>
              <li>
                <a href="/office" aria-label="Office">Office</a>
              </li>
              <li>
                <a href="/outdoor" aria-label="Outdoor">Outdoor</a>
              </li>
              <li>
                <a href="/decor-accessories" aria-label="Decor Accessories">Decor Accessories</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Contact Info</h4>
            <div className="contact-info">
              <div className="contact-item">
                <i className="fas fa-map-marker-alt" aria-hidden="true"></i>
                <p>
                  Tanisha Impex <br />
                  No 4, Matro Shree Garden, <br />
                  Opp Dharmavat Petrol Pump <br />
                  Pisoli, Pune - 411060 <br />
                  Maharashtra, India
                </p>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone" aria-hidden="true"></i>
                <a className="contact-link" href="tel:+919422012015">+91 94220 12015</a>
              </div>
              <div className="contact-item">
                <i className="fas fa-envelope" aria-hidden="true"></i>
                <a className="contact-link" href="mailto:support@tanyak.in">support@tanyak.in</a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; {new Date().getFullYear()} Tanyak. All rights reserved.</p>
            <div className="footer-legal">
              <a href="/privacy">Privacy Policy</a>
              <a href="/terms">Terms of Service</a>
              <a href="/cookies">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
