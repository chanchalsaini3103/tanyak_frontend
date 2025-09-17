// src/components/HeroSection.jsx
import React from "react";
import "../styles/HeroSection.css";
import NewArrivals from "./NewArrivals";
import { Link } from "react-router-dom";
import AboutUsHero from "./AboutUsHero";
import RequestQuoteHero from "./RequestQuoteHero";
import Testimonials from "./Testimonials";
import Footer from "./Footer";
import bg from "../images/bgimg.jpg";

const HeroSection = () => {
  return (
    <>
      <section
        className="hero-section"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.8)), url(${bg})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
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
                <Link to="/our-craft">
                  <button className="cta-btn primary">Shop Collection</button>
                </Link>

                <Link to="/our-craft">
                  <button className="cta-btn secondary">Learn More</button>
                </Link>
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
      <RequestQuoteHero />
      <Testimonials />
      <Footer />
    </>
  );
};

export default HeroSection;
