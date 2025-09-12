import React from "react";
import "../styles/HeroSection.css";
import NewArrivals from "./NewArrivals";
import AboutUsHero from "./AboutUsHero";
import WhyChooseUs from "./WhyChooseUs";

const HeroSection = () => {
  return (
    <>
    <section className="hero-section">
      <div className="hero-container">
        <div className="hero-content">
          <div className="text-content">
            <h1 className="main-heading">
              <span className="line line-1">Handcrafted.</span>
              <span className="line line-2">Laser-Cut.</span>
              <span className="line line-3">Uniquely Made.</span>
            </h1>
            <p className="subheading">
              Beautifully designed hardware that makes every home unique.
            </p>
            <div className="cta-buttons">
              <button className="cta-btn primary">Shop Collection</button>
              <button className="cta-btn secondary">Learn More</button>
            </div>
          </div>
        </div>
        <div className="hero-visual">
          <div className="floating-elements">
            <div className="floating-element element-1"></div>
            <div className="floating-element element-2"></div>
            <div className="floating-element element-3"></div>
          </div>
        </div>
      </div>
    </section>
    <NewArrivals />
    <AboutUsHero />
    <WhyChooseUs />
    </>
  );
};

export default HeroSection;