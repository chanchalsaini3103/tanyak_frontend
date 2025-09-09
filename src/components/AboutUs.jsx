import React, { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import {
  FaMapMarkerAlt,
  FaClock,
  FaPhone,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa";
import "../styles/AboutUs.css";

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState("outlet");

  return (
    <div className="about-us-page">
      {/* <div className="about-header">
        <Container>
          <h1>About Tanyak</h1>
          <p className="lead">Your trusted shopping destination for quality products</p>
        </Container>
      </div> */}

      <Container>
        {/* Navigation Tabs */}
        <div className="about-tabs">
          <button
            className={activeTab === "outlet" ? "tab-btn active" : "tab-btn"}
            onClick={() => setActiveTab("outlet")}
          >
            Our Outlets
          </button>
          <button
            className={activeTab === "story" ? "tab-btn active" : "tab-btn"}
            onClick={() => setActiveTab("story")}
          >
            Our Story
          </button>
          <button
            className={activeTab === "team" ? "tab-btn active" : "tab-btn"}
            onClick={() => setActiveTab("team")}
          >
            Our Team
          </button>
        </div>

        {/* Outlet Information (shown by default) */}
        {activeTab === "outlet" && (
          <div className="tab-content">
            <Row>
              <Col md={6}>
                <div className="outlet-info">
                  <h2>Visit Our Store</h2>
                  <p className="outlet-description">
                    Experience the best shopping at our physical store. We offer
                    a wide range of products with personalized service.
                  </p>

                  <div className="store-details">
                    <div className="detail-item">
                      <FaMapMarkerAlt className="detail-icon" />
                      <div>
                        <h5>Address</h5>
                        <p>
                          Tanisha Impex <br />
                          No 4, Matro Shree Garden, <br />
                          Opp Dharmavat Petrol Pump <br />
                          Pisoli, Pune - 411060 <br />
                          Maharastra, India
                        </p>
                      </div>
                    </div>

                    <div className="detail-item">
                      <FaClock className="detail-icon" />
                      <div>
                        <h5>Store Hours</h5>
                        <p>
                          Monday - Friday: 10:00 AM - 9:00 PM
                          <br />
                          Saturday: 10:00 AM - 10:00 PM
                          <br />
                          Sunday: 11:00 AM - 8:00 PM
                        </p>
                      </div>
                    </div>

                    <div className="detail-item">
                      <FaPhone className="detail-icon" />
                      <div>
                        <h5>Contact</h5>
                        <p>
                          +91 94220 12015
                          <br />
                          support@tanyak.in
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>

              <Col md={6}>
                <div className="map-container">
                  <h4>Store Location</h4>
                  <div className="map-placeholder">
                    <FaMapMarkerAlt className="map-icon" />
                    <p>Interactive Map Would Appear Here</p>
                    <div className="map-overlay">
                      <button className="btn btn-primary">
                        Get Directions
                      </button>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        )}

        {/* Company Story */}
        {activeTab === "story" && (
          <div className="tab-content">
            <Row>
              <Col lg={8} className="mx-auto">
                <div className="story-section">
                  <h2>Our Story</h2>
                  <p>
                    Tanyak was founded in 2015 with a simple mission: to provide
                    high-quality products at affordable prices with exceptional
                    customer service. What started as a small local store has
                    now grown into a trusted shopping destination for thousands
                    of customers across India.
                  </p>
                  <p>
                    Our name "Tanyak" comes from the Hindi word for "ask" -
                    reflecting our commitment to listening to our customers'
                    needs and providing personalized solutions. We believe that
                    shopping should be a pleasant, hassle-free experience,
                    whether online or in our physical store.
                  </p>
                  <div className="mission-vision">
                    <Row>
                      <Col md={6}>
                        <div className="mv-card">
                          <h4>Our Mission</h4>
                          <p>
                            To make quality products accessible to everyone
                            while maintaining the highest standards of customer
                            service.
                          </p>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mv-card">
                          <h4>Our Vision</h4>
                          <p>
                            To become India's most trusted retail brand, known
                            for quality, value, and customer satisfaction.
                          </p>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        )}

        {/* Team Information */}
        {activeTab === "team" && (
          <div className="tab-content">
            <Row>
              <Col lg={8} className="mx-auto">
                <div className="team-section">
                  <h2>Meet Our Founder</h2>
                  <Row className="founder-info">
                    <Col md={5}>
                      <div className="founder-image">
                        <div className="image-placeholder">
                          <i className="fas fa-user"></i>
                        </div>
                      </div>
                    </Col>
                    <Col md={7}>
                      <div className="founder-details">
                        <h3>Praveen Jain</h3>
                        <p className="title">Founder & CEO</p>
                        <p>
                          With over 15 years of experience in the retail
                          industry, Praveen founded Tanyak with a vision to
                          revolutionize the shopping experience. His expertise
                          in supply chain management and customer relations has
                          been instrumental in Tanyak's growth.
                        </p>
                        <p>
                          Praveen holds an MBA from the Indian Institute of
                          Management and is passionate about supporting local
                          manufacturers and artisans.
                        </p>
                        <div className="founder-quote">
                          <blockquote>
                            "At Tanyak, we don't just sell products - we build
                            relationships with our customers and ensure they
                            always get the best value for their money."
                          </blockquote>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        )}
      </Container>

      {/* Footer */}
      <footer className="about-footer">
        <Container>
          <Row>
            <Col lg={4} md={6}>
              <div className="footer-section">
                <h5>Tanyak</h5>
                <p>
                  Your trusted shopping destination for quality products at
                  affordable prices.
                </p>
                <div className="social-links">
                  <a href="#">
                    <FaFacebook />
                  </a>
                  <a href="#">
                    <FaTwitter />
                  </a>
                  <a href="#">
                    <FaInstagram />
                  </a>
                  <a href="#">
                    <FaLinkedin />
                  </a>
                  <a href="#">
                    <FaYoutube />
                  </a>
                </div>
              </div>
            </Col>

            <Col lg={4} md={6}>
              <div className="footer-section">
                <h5>Quick Links</h5>
                <ul>
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
                    <a href="#">Offers</a>
                  </li>
                  <li>
                    <a href="#">About Us</a>
                  </li>
                </ul>
              </div>
            </Col>

            <Col lg={4}>
              <div className="footer-section">
                <h5>Contact Info</h5>
                <div className="contact-info">
                  <p>
                    <FaMapMarkerAlt />  <p>
                          Tanisha Impex <br />
                          No 4, Matro Shree Garden, <br />
                          Opp Dharmavat Petrol Pump <br />
                          Pisoli, Pune - 411060 <br />
                          Maharastra, India
                        </p>
                  </p>
                  <p>
                    <FaPhone /> +91 94220 12015
                  </p>
                  <p>
                    <FaEnvelope /> support@tanyak.in
                  </p>
                </div>

                <div className="newsletter">
                  <h6>Subscribe to Newsletter</h6>
                  <div className="input-group">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Your email"
                    />
                    <button className="btn btn-primary">Subscribe</button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>

          <div className="footer-bottom">
            <p>&copy; 2023 Tanyak. All Rights Reserved.</p>
          </div>
        </Container>
      </footer>
    </div>
  );
}
