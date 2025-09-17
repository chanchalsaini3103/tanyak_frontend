import React from "react";
import "../styles/Footer.css";
import { FaFacebookF, FaInstagram, FaPinterestP, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">Tanyak</h3>
            <p className="footer-description">
              Transforming houses into homes with exquisite decor and furniture
              since 2015. We believe in quality, style, and creating spaces that
              tell your story.
            </p>
            <div className="social-links">
  <a href="#" className="social-link" aria-label="Facebook">
    <FaFacebookF />
  </a>
  <a href="#" className="social-link" aria-label="Instagram">
    <FaInstagram />
  </a>
  <a href="#" className="social-link" aria-label="Pinterest">
    <FaPinterestP />
  </a>
  <a href="#" className="social-link" aria-label="Twitter">
    <FaTwitter />
  </a>
  <a href="#" className="social-link" aria-label="YouTube">
    <FaYoutube />
  </a>
</div>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li>
                <a href="#">Home</a>
              </li>
              <li>
                <a href="#">Shop</a>
              </li>
              <li>
                <a href="#">Collections</a>
              </li>
              <li>
                <a href="#">Gallery</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Testimonials</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Categories</h4>
            <ul className="footer-links">
              <li>
                <a href="#">Living Room</a>
              </li>
              <li>
                <a href="#">Bedroom</a>
              </li>
              <li>
                <a href="#">Dining Room</a>
              </li>
              <li>
                <a href="#">Office</a>
              </li>
              <li>
                <a href="#">Outdoor</a>
              </li>
              <li>
                <a href="#">Decor Accessories</a>
              </li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Contact Info</h4>
            <div className="contact-info">
              <div className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <p>
                  {" "}
                  Tanisha Impex <br />
                  No 4, Matro Shree Garden, <br />
                  Opp Dharmavat Petrol Pump <br />
                  Pisoli, Pune - 411060 <br />
                  Maharastra, India
                </p>
              </div>
              <div className="contact-item">
                <i className="fas fa-phone"></i>
                <span>+91 94220 12015</span>
              </div>
              <div className="contact-item">
                <i className="fas fa-envelope"></i>
                <span>support@tanyak.in</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2025 Tanyak. All rights reserved.</p>
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
