import React from "react";
import "../styles/AboutUsHero.css";

const AboutUsHero = () => {
  return (
    <section className="about-us">
      <div className="container">
        <div className="about-content">
          {/* Left Section - 50% width */}
          <div className="about-left">
            {/* Top 60% - Info section */}
            <div className="info-section">
              <h2 className="section-title">About Us</h2>
              <h3 className="about-heading">Crafting Beautiful Interiors Since 2010</h3>
              <p className="about-description">
                For over a decade, Pune Decor has been transforming houses into elegant, comfortable homes. 
                We bring you a handpicked collection of premium furnishings – from luxurious curtains and 
                wallpapers to bespoke sofas and mattresses – all backed by expert guidance.
              </p>
              <p className="about-description">
                Our commitment to quality, style, and personal service ensures every space we touch reflects 
                your unique vision and personality. We are the only shop in Pune to offer a 100% satisfaction guarantee.
              </p>
            </div>
            
            {/* Bottom 40% - Landscape image with info */}
            <div className="landscape-container">
              <div className="landscape-image-container">
                <img 
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Interior Design Project" 
                  className="landscape-image"
                />
                <div className="image-info">
                  <h4>Modern Living Room Design</h4>
                  <p>Elegant furniture selection with perfect color coordination</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Section - 50% width */}
          <div className="about-right">
            {/* Top 20% - Statistics */}
            <div className="stats-section">
              <div className="stats-container">
                <div className="stat-item">
                  <div className="stat-content">
                    <h3 className="stat-number">10000+</h3>
                    <p className="stat-label">Residential Projects</p>
                  </div>
                </div>
                
                <div className="stat-item">
                  <div className="stat-content">
                    <h3 className="stat-number">100+</h3>
                    <p className="stat-label">Commercial Projects</p>
                  </div>
                </div>
                
                <div className="stat-item">
                  <div className="stat-content">
                    <h3 className="stat-number">12 yr +</h3>
                    <p className="stat-label">Delivering Excellence</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Bottom 80% - Portrait image */}
            <div className="portrait-container">
              <div className="portrait-image-container">
                <img 
                  src="https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                  alt="Interior Designer" 
                  className="portrait-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsHero;