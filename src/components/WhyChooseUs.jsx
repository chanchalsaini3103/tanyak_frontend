import React from "react";
import "../styles/WhyChooseUs.css";

export default function WhyChooseUs() {
  return (
    <section className="choose-section">
      <div className="choose-inner container">
        <p className="micro-title">WHY CHOOSE US</p>

        <h2 className="main-title">
          We Guarantee - <span>100% client</span>
          <br />
          satisfaction
        </h2>

        <div className="features-row">
          {/* Left feature */}
          <div className="feature-col">
            <div className="icon-wrap">
              <svg className="dashed-circle" viewBox="0 0 120 120" aria-hidden>
                <circle cx="60" cy="60" r="50" fill="none" strokeDasharray="6 8" stroke="#666" strokeWidth="2"/>
              </svg>

              <svg className="icon" viewBox="0 0 24 24" aria-hidden>
                {/* thumbs/award style icon */}
                <path d="M12 2l1.8 4.6L18.7 8l-4 2.9L15 15l-3-1.8L9 15l.3-4.1L6 8l4.9-.9L12 2z" fill="none" stroke="#f6a800" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>

            <h3>Expert Team</h3>
            <p className="feature-desc">
              Professional interior specialists with years of experience
            </p>
          </div>

          {/* Middle feature */}
          <div className="feature-col">
            <div className="icon-wrap">
              <svg className="dashed-circle" viewBox="0 0 120 120" aria-hidden>
                <circle cx="60" cy="60" r="50" fill="none" strokeDasharray="6 8" stroke="#666" strokeWidth="2"/>
              </svg>

              <svg className="icon" viewBox="0 0 24 24" aria-hidden>
                {/* users icon */}
                <path d="M16 11a4 4 0 1 0-8 0M2 20a6 6 0 0 1 12 0" fill="none" stroke="#f6a800" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="17" cy="8" r="2.2" fill="none" stroke="#f6a800" strokeWidth="1.6"/>
              </svg>
            </div>

            <h3>Quality Products</h3>
            <p className="feature-desc">
              Premium materials and trusted brands for lasting beauty and durability
            </p>
          </div>

          {/* Right feature */}
          <div className="feature-col">
            <div className="icon-wrap">
              <svg className="dashed-circle" viewBox="0 0 120 120" aria-hidden>
                <circle cx="60" cy="60" r="50" fill="none" strokeDasharray="6 8" stroke="#666" strokeWidth="2"/>
              </svg>

              <svg className="icon" viewBox="0 0 24 24" aria-hidden>
                {/* hand + coin */}
                <path d="M3 15s2-2 6-2 6 2 6 2l3 4H3z" fill="none" stroke="#f6a800" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="17" cy="7" r="2" fill="none" stroke="#f6a800" strokeWidth="1.4"/>
                <path d="M17 6.2v.6" stroke="#f6a800" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
            </div>

            <h3>Custom Solutions</h3>
            <p className="feature-desc">
              Personalized design tailored to your specific needs and preferences
            </p>
          </div>
        </div>

        {/* dashed arcs between icons (visual connectors) */}
        <svg className="connectors" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden>
          {/* left-to-middle arc */}
          <path d="M190 60 C 300 -10, 460 -10, 580 60" fill="none" stroke="#6b6b6b" strokeDasharray="12 8" strokeWidth="2" strokeLinecap="round" />
          {/* middle-to-right arc */}
          <path d="M580 60 C 700 130, 860 130, 970 60" fill="none" stroke="#6b6b6b" strokeDasharray="12 8" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </section>
  );
}
