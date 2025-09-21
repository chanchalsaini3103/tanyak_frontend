import React, { useState, useEffect } from "react";
import "../styles/Testimonials.css";
import chanchal from "../images/clients/chanchal.jpeg";
import deepak from "../images/clients/deepak.jpeg";
import kiran from "../images/clients/kiran.jpeg";
import pomu from "../images/clients/pomu.jpeg";
const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // theme detection (same approach you use elsewhere)
  const [darkMode, setDarkMode] = useState(
    () => document.body.classList.contains("dark-mode") || localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    const mo = new MutationObserver(() => {
      setDarkMode(document.body.classList.contains("dark-mode"));
    });
    mo.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  const testimonials = [
  // {
  //   id: 1,
  //   name: "Chanchal Saini",
  //   location: "Pune, India",
  //   text: "The team at DecorHome transformed our living space completely. Their attention to detail and quality products exceeded our expectations. We couldn't be happier!",
  //   rating: 5,
  //   image: chanchal,
  // },
  {
    id: 2,
    name: "Deepak Suthar",
    location: "Pune, India",
    text: "I've purchased furniture from many places, but nothing compares to the quality and style I found here. The pieces are conversation starters!",
    rating: 4,
    image: deepak,
  },
  {
    id: 3,
    name: "Kiran Suthar",
    location: "Pune, India",
    text: "From consultation to delivery, the experience was flawless. The interior design suggestions were spot on and reflected my personal style perfectly.",
    rating: 5,
    image: kiran,
  },
  {
    id: 4,
    name: "Pramod Suthar",
    location: "Pune, India",
    text: "The custom pieces we ordered were worth every penny. Excellent craftsmanship and they arrived right on schedule. Will definitely shop here again!",
    rating: 5,
    image: pomu, // ✅ no curly braces
  },
];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  };

  return (
    <section className={`testimonials-section ${darkMode ? "theme-dark" : "theme-light"}`}>
      <div className="container">
        <h2 className="section-title">What Our Clients Say</h2>
        <p className="section-subtitle">Discover why our customers love transforming their homes with us</p>

        <div className="testimonials-carousel">
          <div className="carousel-container">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`testimonial-card ${index === currentIndex ? "active" : ""}`}
                aria-hidden={index !== currentIndex}
              >
                <div className="testimonial-content">
                  <div className="quote-icon">“</div>

                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`star ${i < testimonial.rating ? "filled" : ""}`}>★</span>
                    ))}
                  </div>

                  <p className="testimonial-text">"{testimonial.text}"</p>

                  <div className="testimonial-author">
                    <div className="author-image-container">
                      <img src={testimonial.image} alt={testimonial.name} className="author-image" />
                      <div className="image-border" />
                    </div>
                    <div className="author-details">
                      <h4 className="author-name">{testimonial.name}</h4>
                      <p className="author-location">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="carousel-controls">
            <button className="control-btn prev" onClick={goToPrev} aria-label="Previous testimonial">‹</button>

            <div className="indicators">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${index === currentIndex ? "active" : ""}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>

            <button className="control-btn next" onClick={goToNext} aria-label="Next testimonial">›</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
