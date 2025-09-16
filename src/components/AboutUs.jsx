import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
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
  FaUser,
  FaArrowRight
} from "react-icons/fa";
import "../styles/AboutUs.css";
import Footer from "./Footer";

export default function AboutUs() {
  const [activeTab, setActiveTab] = useState("outlet");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    setIsVisible(false);
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, [activeTab]);

  return (
    <div className="about-us-page">
      <Container>
        {/* Navigation Tabs */}
        <div className="about-tabs">
          <button
            className={activeTab === "outlet" ? "tab-btn active" : "tab-btn"}
            onClick={() => setActiveTab("outlet")}
          >
            <FaMapMarkerAlt className="tab-icon" />
            Our Outlets
          </button>
          <button
            className={activeTab === "story" ? "tab-btn active" : "tab-btn"}
            onClick={() => setActiveTab("story")}
          >
            <FaUser className="tab-icon" />
            Our Story
          </button>
          <button
            className={activeTab === "team" ? "tab-btn active" : "tab-btn"}
            onClick={() => setActiveTab("team")}
          >
            <FaUser className="tab-icon" />
            Our Team
          </button>
        </div>

        {/* Outlet Information */}
        {activeTab === "outlet" && (
          <div className={`tab-content ${isVisible ? 'fade-in' : 'fade-out'}`}>
            <Row>
              <Col md={6}>
                <div className="outlet-info">
                  <h2 className="section-title">Visit Our Store</h2>
                  <p className="outlet-description">
                    Experience the best shopping at our physical store. We offer
                    a wide range of products with personalized service.
                  </p>

                  <div className="store-details">
                    <div className="detail-item animate-item">
                      <div className="detail-icon-wrapper">
                        <FaMapMarkerAlt className="detail-icon" />
                      </div>
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

                    <div className="detail-item animate-item">
                      <div className="detail-icon-wrapper">
                        <FaClock className="detail-icon" />
                      </div>
                      <div>
                        <h5>Store Hours</h5>
                        <p>
                          Monday - Friday: 10:00 AM - 9:00 PM
                          <br />
                          Saturday: 10:00 AM - 10:00 PM
                          <br />
                          Sunday: Closed
                        </p>
                      </div>
                    </div>

                    <div className="detail-item animate-item">
                      <div className="detail-icon-wrapper">
                        <FaPhone className="detail-icon" />
                      </div>
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
                  <h4 className="section-subtitle">Store Location</h4>
                  <div className="map-wrapper">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7569.128817916635!2d73.9032784!3d18.4493313!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2eac85230ba47%3A0x39c8f4d6783a5c1a!2sTanisha%20Impex!5e0!3m2!1sen!2sus!4v1697034567890!5m2!1sen!2sus"
                      width="100%"
                      height="400"
                      style={{ border: 0, borderRadius: "8px" }}
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Tanisha Impex Location"
                    ></iframe>
                    <div className="map-overlay">
                      <a 
                        href="https://www.google.com/maps/dir/?api=1&destination=18.4493313,73.9058533" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn btn-primary direction-btn"
                      >
                        Get Directions <FaArrowRight className="btn-icon" />
                      </a>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        )}

        {/* Company Story */}
        {activeTab === "story" && (
          <div className={`tab-content ${isVisible ? 'fade-in' : 'fade-out'}`}>
            <Row>
              <Col lg={8} className="mx-auto">
                <div className="story-section">
                  <h2 className="section-title">Our Story</h2>
                  <p className="animate-text">
                    Tanyak was founded in 2015 with a simple mission: to provide
                    high-quality products at affordable prices with exceptional
                    customer service. What started as a small local store has
                    now grown into a trusted shopping destination for thousands
                    of customers across India.
                  </p>
                  <p className="animate-text">
                    Our name "Tanyak" comes from the Hindi word for "ask" -
                    reflecting our commitment to listening to our customers'
                    needs and providing personalized solutions. We believe that
                    shopping should be a pleasant, hassle-free experience,
                    whether online or in our physical store.
                  </p>
                  <div className="mission-vision">
                    <Row>
                      <Col md={6}>
                        <div className="mv-card animate-card">
                          <div className="mv-icon">
                            <div className="icon-wrapper mission">
                              <FaMapMarkerAlt />
                            </div>
                          </div>
                          <h4>Our Mission</h4>
                          <p>
                            To make quality products accessible to everyone
                            while maintaining the highest standards of customer
                            service.
                          </p>
                        </div>
                      </Col>
                      <Col md={6}>
                        <div className="mv-card animate-card">
                          <div className="mv-icon">
                            <div className="icon-wrapper vision">
                              <FaUser />
                            </div>
                          </div>
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
          <div className={`tab-content ${isVisible ? 'fade-in' : 'fade-out'}`}>
            <Row>
              <Col lg={8} className="mx-auto">
                <div className="team-section">
                  <h2 className="section-title">Meet Our Founder</h2>
                  <Row className="founder-info">
                    <Col md={5}>
                      <div className="founder-image animate-image">
                        <div className="image-placeholder">
                          <FaUser className="founder-icon" />
                        </div>
                      </div>
                    </Col>
                    <Col md={7}>
                      <div className="founder-details">
                        <h3>Praveen Jain</h3>
                        <p className="title">Founder & CEO</p>
                        <p className="animate-text">
                          With over 15 years of experience in the retail
                          industry, Praveen founded Tanyak with a vision to
                          revolutionize the shopping experience. His expertise
                          in supply chain management and customer relations has
                          been instrumental in Tanyak's growth.
                        </p>
                        <p className="animate-text">
                          Praveen holds an MBA from the Indian Institute of
                          Management and is passionate about supporting local
                          manufacturers and artisans.
                        </p>
                        <div className="founder-quote animate-card">
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

      <Footer />
    </div>
  );
}