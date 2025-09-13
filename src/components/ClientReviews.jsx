import React, { useState, useEffect } from "react";
import "../styles/ClientReviews.css";

const ClientReviews = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [currentReview, setCurrentReview] = useState(0);

  useEffect(() => {
    // Check if dark mode is enabled on body or in localStorage
    const isDark = document.body.classList.contains("dark-mode") || 
                   localStorage.getItem("darkMode") === "true";
    setDarkMode(isDark);
  }, []);

  const reviews = [
    {
      id: 1,
      name: "Rajesh & Priya Mehta",
      role: "Homeowners, Baner",
      content: "Pune Decor transformed our apartment into a dream home. Their attention to detail and quality of materials exceeded our expectations. The team was professional and delivered on time.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 2,
      name: "Sanjay Deshpande",
      role: "Office Manager, Kothrud",
      content: "We hired Pune Decor for our office renovation and couldn't be happier. They understood our vision for a professional yet comfortable workspace and executed it perfectly.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    },
    {
      id: 3,
      name: "Ananya Joshi",
      role: "Restaurant Owner, FC Road",
      content: "The interior design for our restaurant received countless compliments. Pune Decor created a warm, inviting atmosphere that keeps customers coming back. Their service was exceptional from start to finish.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
    }
  ];

  const nextReview = () => {
    setCurrentReview((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const selectReview = (index) => {
    setCurrentReview(index);
  };

  return (
    <section className={`client-reviews ${darkMode ? "theme-dark" : "theme-light"}`}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">What Our Clients Say</h2>
          <div className="divider"></div>
          <p className="section-subtitle">Hear from homeowners and businesses who have transformed their spaces with us</p>
        </div>

        <div className="reviews-container">
          <div className="review-card active">
            <div className="review-content">
              <div className="quote-icon">"</div>
              <p className="review-text">{reviews[currentReview].content}</p>
              <div className="review-author">
                <img 
                  src={reviews[currentReview].image} 
                  alt={reviews[currentReview].name} 
                  className="author-image"
                />
                <div className="author-details">
                  <h4 className="author-name">{reviews[currentReview].name}</h4>
                  <p className="author-role">{reviews[currentReview].role}</p>
                </div>
              </div>
              <div className="rating">
                {[...Array(reviews[currentReview].rating)].map((_, i) => (
                  <span key={i} className="star">★</span>
                ))}
              </div>
            </div>
          </div>

          <div className="review-nav">
            <button className="nav-btn prev" onClick={prevReview}>
              &lt;
            </button>
            <div className="review-dots">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentReview ? "active" : ""}`}
                  onClick={() => selectReview(index)}
                ></button>
              ))}
            </div>
            <button className="nav-btn next" onClick={nextReview}>
              &gt;
            </button>
          </div>
        </div>

        <div className="stats-container">
          <div className="stat">
            <h3 className="stat-number">98%</h3>
            <p className="stat-label">Client Satisfaction</p>
          </div>
          <div className="stat">
            <h3 className="stat-number">250+</h3>
            <p className="stat-label">Projects Completed</p>
          </div>
          <div className="stat">
            <h3 className="stat-number">12+</h3>
            <p className="stat-label">Years Experience</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientReviews;