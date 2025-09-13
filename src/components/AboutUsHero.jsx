import React, { useState, useEffect, useRef } from "react";
import "../styles/AboutUsHero.css";

const AboutUsHero = () => {
  const [darkMode, setDarkMode] = useState(
    () => document.body.classList.contains("dark-mode") || localStorage.getItem("darkMode") === "true"
  );
  const contentRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDarkMode(document.body.classList.contains("dark-mode"));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  // IntersectionObserver: toggle visible when component enters viewport
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className={`about-us ${darkMode ? "theme-dark" : "theme-light"}`}>
      <div className="container">
        <div
          ref={contentRef}
          className={`about-content ${visible ? "is-visible" : ""}`}
        >
          {/* Left Section */}
          <div className="about-left">
            <div className="info-section"> {/* Animates first */}
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

            <div className="landscape-container"> {/* Animates second */}
              <div className="landscape-image-container">
                <img
                  src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                  alt="Interior Design Project"
                  className="landscape-image"
                  loading="lazy"
                />
               
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="about-right">
            <div className="stats-section"> {/* Animates third */}
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

            <div className="portrait-container"> {/* Animates fourth */}
              <div className="portrait-image-container">
                <img
                  src="https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                  alt="Interior Designer"
                  className="portrait-image"
                  loading="lazy"
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
