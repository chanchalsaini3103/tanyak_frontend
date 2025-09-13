import React from "react";
import "../styles/ClientSatisfaction.css";

const ClientSatisfaction = () => {
  return (
    <section className="client-satisfaction">
      <div className="container">
        <div className="section-header">
          <h1>We Guarantee - <span>100%</span> client satisfaction</h1>
        </div>
        
        <div className="guarantees-grid">
          <div className="guarantee-card">
            <div className="icon-wrapper">
              <i className="fas fa-users"></i>
            </div>
            <h2>Expert Team</h2>
            <p>Professional interior specialists with years of experience</p>
          </div>
          
          <div className="guarantee-card">
            <div className="icon-wrapper">
              <i className="fas fa-star"></i>
            </div>
            <h2>Quality Products</h2>
            <p>Premium materials and trusted brands for lasting beauty and durability</p>
          </div>
          
          <div className="guarantee-card">
            <div className="icon-wrapper">
              <i className="fas fa-palette"></i>
            </div>
            <h2>Custom Solutions</h2>
            <p>Personalized design tailored to your specific needs and preferences</p>
          </div>
        </div>
        
        <div className="satisfaction-badge">
          <h3>Your Satisfaction is Our Priority</h3>
          <p>We stand behind our work with a comprehensive satisfaction guarantee</p>
        </div>
      </div>
    </section>
  );
};

export default ClientSatisfaction;