import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaSearch, FaTruck, FaShieldAlt, FaUndo, FaStar } from "react-icons/fa";
import "../styles/HeroSection.css";

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  const featuredCategories = [
    { name: "Electronics", icon: "📱" },
    { name: "Fashion", icon: "👕" },
    { name: "Home & Kitchen", icon: "🏠" },
    { name: "Beauty", icon: "💄" },
    { name: "Sports", icon: "⚽" }
  ];

  return (
    <section className="tanyak-hero">
      <Container>
        <Row>
          <Col lg={6} className="hero-content">
            <div className="hero-text">
              <h1>Quality Products at <span className="highlight">Unbeatable Prices</span></h1>
              <p className="hero-subtitle">
                Discover thousands of products with fast delivery, easy returns, and secure payment options.
                Shop with confidence at Tanyak.
              </p>
              
              <form onSubmit={handleSearch} className="hero-search">
                <div className="search-box">
                  <input
                    type="text"
                    placeholder="Search for products, brands and categories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button type="submit">
                    <FaSearch />
                  </button>
                </div>
              </form>
              
              <div className="trust-badges">
                <div className="badge">
                  <FaTruck />
                  <span>Free Delivery Above ₹999</span>
                </div>
                <div className="badge">
                  <FaUndo />
                  <span>Easy 7-Day Returns</span>
                </div>
                <div className="badge">
                  <FaShieldAlt />
                  <span>Secure Payments</span>
                </div>
              </div>
            </div>
          </Col>
          
          <Col lg={6} className="hero-visual">
            <div className="featured-product">
              <div className="product-card">
                <div className="product-badge">Bestseller</div>
                <img 
                  src="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fGVhcmJ1ZHN8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60" 
                  alt="Wireless Earbuds" 
                />
                <div className="product-info">
                  <h4>Wireless Earbuds</h4>
                  <div className="rating">
                    <FaStar className="star" />
                    <FaStar className="star" />
                    <FaStar className="star" />
                    <FaStar className="star" />
                    <FaStar className="star half" />
                    <span className="rating-count">(1,234)</span>
                  </div>
                  <div className="price">
                    <span className="current-price">₹1,799</span>
                    <span className="original-price">₹2,499</span>
                    <span className="discount">28% off</span>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        
        <Row className="categories-section">
          <Col>
            <h3>Popular Categories</h3>
            <div className="categories-grid">
              {featuredCategories.map((category, index) => (
                <div key={index} className="category-card">
                  <div className="category-icon">{category.icon}</div>
                  <span>{category.name}</span>
                </div>
              ))}
            </div>
          </Col>
        </Row>
        
        <Row className="minimum-order-notice">
          <Col>
            <div className="notice-box">
              <div className="notice-icon">ℹ️</div>
              <div className="notice-text">
                <strong>Minimum Order Value: ₹4,000</strong>
                <p>Delivery charges will be communicated after packing your parcel.</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}