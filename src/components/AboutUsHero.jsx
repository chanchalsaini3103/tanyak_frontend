import React, { useState, useEffect, useRef } from "react";
import "../styles/AboutUsHero.css";
import aboutPortrait from '../images/about-us-potrait.jpg';

const AboutUsHero = () => {
  const [darkMode, setDarkMode] = useState(
    () =>
      document.body.classList.contains("dark-mode") ||
      localStorage.getItem("darkMode") === "true"
  );
  const contentRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setDarkMode(document.body.classList.contains("dark-mode"));
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
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
            <div className="info-section">
              {" "}
              {/* Animates first */}
              <h2 className="section-title">About Us</h2>
              <h3 className="about-heading">
                Enhancing Homes with Premium Hardware Since 2010
              </h3>
              <p className="about-description">
                For more than a decade, Tanyak has been bringing style and
                strength into homes with our wide range of premium hardware and
                accessories. From cabinet handles, mortise door handles, and
                drawer knobs to curtain brackets, sofa legs, bathroom fittings,
                and more—we offer solutions that combine durability with design.
              </p>
              <p className="about-description">
                At Tanyak, we believe every detail matters. That’s why our
                products are crafted to add both elegance and functionality to
                your living spaces. With our best-selling collections and
                exclusive Tanyak brand, we have earned the trust of countless
                customers who value quality and reliability.
              </p>
              <p className="about-description">
                Transform your interiors with Tanyak—where every piece reflects
                a perfect balance of design, innovation, and everyday comfort.{" "}
              </p>
            </div>

            <div className="landscape-container">
              {" "}
              {/* Animates second */}
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
            <div className="stats-section">
              {" "}
              {/* Animates third */}
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

            <div className="portrait-container">
              {" "}
              {/* Animates fourth */}
              <div className="portrait-image-container">
                <img
  src={aboutPortrait}
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
