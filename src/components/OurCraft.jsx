// OurCraft.jsx
import React, { useEffect } from "react";
import "../styles/OurCraft.css";
import Footer from "./Footer";

const OurCraft = () => {
  useEffect(() => {
    // Add scroll animation effect
    const handleScroll = () => {
      const elements = document.querySelectorAll('.timeline-content, .material-card, .showcase-text, .showcase-visual');
      
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const isVisible = (elementTop < window.innerHeight - 100) && (elementBottom > 0);
        
        if (isVisible) {
          element.style.opacity = "1";
          element.style.transform = "translateY(0)";
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    // Trigger once on mount to check initial state
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
    <div className="our-craft-page">
      {/* Hero Section with Parallax Effect */}
      <section className="craft-hero-parallax">
        <div className="parallax-content">
          <h1>Mastering the Art of Metal</h1>
          <p>Where precision engineering meets artistic craftsmanship</p>
        </div>
        <div className="parallax-base"></div>
      </section>

      {/* Process Timeline */}
      <section className="process-timeline">
        <div className="container">
          <h2>Our Journey of Creation</h2>
          <div className="timeline">
            <div className="timeline-item left">
              <div className="timeline-content">
                <div className="timeline-icon">
                  <img src="https://cdn-icons-png.flaticon.com/512/1006/1006363.png" alt="Design Icon" />
                </div>
                <h3>Vision & Design</h3>
                <p>Every masterpiece begins with an idea. Our designers work with you to transform concepts into detailed technical drawings.</p>
                <div className="timeline-image">
                  <img src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Design process" />
                </div>
              </div>
            </div>
            <div className="timeline-item right">
              <div className="timeline-content">
                <div className="timeline-icon">
                  <img src="https://cdn-icons-png.flaticon.com/512/2942/2942946.png" alt="Digital Precision Icon" />
                </div>
                <h3>Digital Precision</h3>
                <p>Using advanced CAD software, we prepare your design for production with micron-level accuracy.</p>
                <div className="timeline-image">
                  <img src="https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="CAD design" />
                </div>
              </div>
            </div>
            <div className="timeline-item left">
              <div className="timeline-content">
                <div className="timeline-icon">
                  <img src="https://cdn-icons-png.flaticon.com/512/2972/2972624.png" alt="Laser Cutting Icon" />
                </div>
                <h3>Laser Cutting</h3>
                <p>State-of-the-art fiber lasers cut your design with incredible precision, creating clean edges that need minimal finishing.</p>
                <div className="timeline-image">
                  <img src="https://images.unsplash.com/photo-1611016186353-f2c8c130cfb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Laser cutting" />
                </div>
              </div>
            </div>
            <div className="timeline-item right">
              <div className="timeline-content">
                <div className="timeline-icon">
                  <img src="https://cdn-icons-png.flaticon.com/512/3085/3085437.png" alt="Finishing Icon" />
                </div>
                <h3>Artisan Finishing</h3>
                <p>Our craftsmen hand-finish each piece, deburring edges and preparing surfaces for the final treatment.</p>
                <div className="timeline-image">
                  <img src="https://images.unsplash.com/photo-1571974096035-bc35687b3f4c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Hand finishing" />
                </div>
              </div>
            </div>
            <div className="timeline-item left">
              <div className="timeline-content">
                <div className="timeline-icon">
                  <img src="https://cdn-icons-png.flaticon.com/512/2972/2972015.png" alt="Surface Treatment Icon" />
                </div>
                <h3>Surface Treatment</h3>
                <p>We apply specialized finishes—from polished chrome to antique patinas—to achieve your desired aesthetic.</p>
                <div className="timeline-image">
                  <img src="https://images.unsplash.com/photo-1605108721178-97a9514c0b9a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Surface treatment" />
                </div>
              </div>
            </div>
            <div className="timeline-item right">
              <div className="timeline-content">
                <div className="timeline-icon">
                  <img src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png" alt="Quality Assurance Icon" />
                </div>
                <h3>Quality Assurance</h3>
                <p>Each piece undergoes rigorous inspection before being carefully packaged for delivery to your doorstep.</p>
                <div className="timeline-image">
                  <img src="https://images.unsplash.com/photo-1566206091558-7f218b696731?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Quality inspection" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Materials Gallery */}
      <section className="materials-gallery">
        <div className="container">
          <h2>Premium Materials We Work With</h2>
          <div className="gallery-grid">
            <div className="gallery-item">
              <div className="material-card">
                <div className="material-img steel-img">
                  <img src="https://images.unsplash.com/photo-1611042553368-49e0e5c2b6d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Stainless Steel" />
                </div>
                <div className="material-info">
                  <h3>Stainless Steel</h3>
                  <p>Modern, corrosion-resistant, and incredibly durable. Perfect for contemporary designs.</p>
                  <div className="material-properties">
                    <span>Durability: 10/10</span>
                    <span>Maintenance: Low</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="gallery-item">
              <div className="material-card">
                <div className="material-img brass-img">
                  <img src="https://images.unsplash.com/photo-1611042553365-5e8e27544f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Solid Brass" />
                </div>
                <div className="material-info">
                  <h3>Solid Brass</h3>
                  <p>Classic warmth with timeless appeal. Develops a beautiful patina over time.</p>
                  <div className="material-properties">
                    <span>Durability: 9/10</span>
                    <span>Maintenance: Medium</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="gallery-item">
              <div className="material-card">
                <div className="material-img bronze-img">
                  <img src="https://images.unsplash.com/photo-1629740006981-17e84a061e7e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Bronze Alloy" />
                </div>
                <div className="material-info">
                  <h3>Bronze Alloy</h3>
                  <p>Distinctive appearance with exceptional strength. Ideal for statement pieces.</p>
                  <div className="material-properties">
                    <span>Durability: 9/10</span>
                    <span>Maintenance: Medium</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="gallery-item">
              <div className="material-card">
                <div className="material-img copper-img">
                  <img src="https://images.unsplash.com/photo-1621791489d0e0e57d2f2b14b84ffacb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Copper" />
                </div>
                <div className="material-info">
                  <h3>Copper</h3>
                  <p>Warm, vibrant, and develops a unique green patina when left untreated.</p>
                  <div className="material-properties">
                    <span>Durability: 8/10</span>
                    <span>Maintenance: High</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Craftsmanship Showcase */}
      <section className="craftsmanship-showcase">
        <div className="showcase-container">
          <div className="showcase-text">
            <h2>The Difference Is in the Details</h2>
            <p>While technology allows for precision, it's the human touch that transforms metal into art. Our craftsmen bring decades of experience to every project, ensuring that each piece meets our exacting standards.</p>
            <ul className="craftsmanship-features">
              <li><i className="fas fa-check"></i> Hand-finished edges for perfect smoothness</li>
              <li><i className="fas fa-check"></i> Custom patinas and finishes available</li>
              <li><i className="fas fa-check"></i> Quality control at every production stage</li>
              <li><i className="fas fa-check"></i> Sustainable production practices</li>
            </ul>
          </div>
          <div className="showcase-visual">
            <div className="visual-element elem-1">
              <img src="https://images.unsplash.com/photo-1596461404969-9d70f3d14cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Craftsmanship detail" />
            </div>
            <div className="visual-element elem-2">
              <img src="https://images.unsplash.com/photo-1598301257982-0cf01499abb2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Craftsmanship detail" />
            </div>
            <div className="visual-element elem-3">
              <img src="https://images.unsplash.com/photo-1580477667995-2b94f01c9516?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80" alt="Craftsmanship detail" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="craft-cta">
        <div className="cta-container">
          <h2>Ready to Bring Your Vision to Life?</h2>
          <p>Whether you have a specific design in mind or need inspiration, our team is here to help create something truly unique for your space.</p>
          <div className="cta-buttons">
            <button className="oc-cta-btn primary">Start a Custom Project</button>
            <button className="oc-cta-btn secondary">View Our Portfolio</button>
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </ >
  );
};

export default OurCraft;