// AllComponents.jsx
import React, { useState, useEffect, useRef } from "react";
import "../styles/AllStyles.css";

/**
 * Components included:
 * - NewArrivals
 * - AboutUsHero
 * - RequestQuoteHero
 * - Testimonials
 * - Footer
 *
 * Default export: Showcase (renders all components sequentially)
 */

/* ------------------------- NewArrivals ------------------------- */
export const NewArrivals = () => {
  const [darkMode, setDarkMode] = useState(
    () =>
      document.body.classList.contains("dark-mode") ||
      localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    const body = document.body;
    const mo = new MutationObserver(() => {
      setDarkMode(body.classList.contains("dark-mode"));
    });
    mo.observe(body, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "darkMode") setDarkMode(e.newValue === "true");
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const newArrivals = [
    {
      id: 1,
      name: "Laser-Cut Cabinet Handles",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      badge: "New",
    },
    {
      id: 2,
      name: "Modern Drawer Pulls",
      image:
        "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      badge: "Trending",
    },
    {
      id: 3,
      name: "Black & Gold Hinges",
      image:
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      badge: "Limited",
    },
    {
      id: 4,
      name: "Designer Door Knobs",
      image:
        "https://images.unsplash.com/photo-1595425970377-2f8ded7c7b19?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      badge: "Premium",
    },
    {
      id: 5,
      name: "Matte Black Latches",
      image:
        "https://images.unsplash.com/photo-1600353068446-9b5ae7712c9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      badge: "New",
    },
    {
      id: 6,
      name: "Vintage Style Locks",
      image:
        "https://images.unsplash.com/photo-1611238112651-2c13ef1f4c0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      badge: "Exclusive",
    },
  ];

  return (
    <section className={`new-arrivals ${darkMode ? "theme-dark" : "theme-light"}`}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">New Arrivals</h2>
          <p className="section-subtitle">Discover our latest hardware collections</p>
        </div>

        <div className="arrivals-container">
          <div className="scrolling-track" aria-hidden>
            <div className="scrolling-items" role="list">
              {newArrivals.concat(newArrivals).map((product, i) => (
                // concat doubles items to create smooth looping visual (animation translates -50%)
                <article key={`${product.id}-${i}`} className="arrival-card" role="listitem">
                  <div className="card-inner" tabIndex={0}>
                    <div className="card-front">
                      <div className="product-badge">{product.badge}</div>
                      <div className="product-image">
                        <img src={product.image} alt={product.name} />
                      </div>
                      <div className="product-info">
                        <h3 className="product-name">{product.name}</h3>
                      </div>
                    </div>

                    <div className="card-back" aria-hidden>
                      <h3>{product.name}</h3>
                      <div className="card-actions">
                        <button className="view-details-btn">View Details</button>
                        <button className="add-to-cart-btn">Add to Cart</button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>

        <div className="view-all-container">
          <button className="view-all-btn">View All New Arrivals</button>
        </div>
      </div>
    </section>
  );
};

/* ------------------------- AboutUsHero ------------------------- */
export const AboutUsHero = () => {
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
        <div ref={contentRef} className={`about-content ${visible ? "is-visible" : ""}`}>
          <div className="about-left">
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

            <div className="landscape-container">
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

          <div className="about-right">
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

            <div className="portrait-container">
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

/* ------------------------- RequestQuoteHero ------------------------- */
export const RequestQuoteHero = ({
  heroImage = "/images/hero-product-1920x1280.jpg",
  onSubmit = async (payload) => {
    return new Promise((res) => setTimeout(() => res({ ok: true, id: "Q-12345" }), 900));
  },
}) => {
  const [showModal, setShowModal] = useState(false);
  const [inline, setInline] = useState({ email: "", company: "", product: "" });
  const [modalData, setModalData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    product: "",
    qty: "",
    notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

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

  const rootRef = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = rootRef.current;
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
      { threshold: 0.18 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const handleInlineSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    try {
      const resp = await onSubmit({ type: "quick", ...inline });
      setSuccessMsg(`Thanks! We will contact you soon. Ref: ${resp.id || "N/A"}`);
      setInline({ email: "", company: "", product: "" });
      setTimeout(() => setSuccessMsg(""), 6000);
    } catch {
      setErrorMsg("Something went wrong — try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    try {
      const resp = await onSubmit({ type: "full", ...modalData });
      setSuccessMsg(`Request submitted. Quote ID: ${resp.id || "N/A"}`);
      setModalData({ name: "", email: "", phone: "", company: "", product: "", qty: "", notes: "" });
      setShowModal(false);
      setTimeout(() => setSuccessMsg(""), 8000);
    } catch {
      setErrorMsg("Failed to submit — please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      ref={rootRef}
      className={`rq-hero ${visible ? "is-visible" : ""} ${darkMode ? "theme-dark" : "theme-light"}`}
      style={{ backgroundImage: `url(${heroImage})` }}
      aria-label="Hero - Request Quote"
    >
      <div className="rq-topstrip">Made in India • ISO 9001 • ISO 14001</div>

      <header className="rq-navbar">
        <div className="rq-brand">DecorHome</div>
        <div className="rq-actions">
          <a className="rq-link" href="/products">Products</a>
          <button className="rq-btn rq-primary" onClick={() => setShowModal(true)}>Request Quote</button>
        </div>
      </header>

      <div className="rq-hero-inner">
        <div className="rq-left-image" aria-hidden>
          <div className="rq-left-card">
            <img src="/images/home-decor-left.jpg" alt="Home decor showing the product in use" />
          </div>
        </div>

        <div className="rq-content">
          <h1 className="rq-h1">Handcrafted. Laser-Cut. Uniquely Made.</h1>
          <p className="rq-sub">Beautifully designed hardware that makes every home unique.</p>

          <div className="rq-ctas">
            <button className="rq-btn rq-primary" onClick={() => setShowModal(true)}>Request Quote</button>
            <a href="/brochure" className="rq-btn rq-secondary">Download Brochure</a>
            <a href="/products" className="rq-link small">Explore Products →</a>
          </div>

          <form className="rq-inline-form" onSubmit={handleInlineSubmit}>
            <input
              type="email"
              placeholder="Enter your work email"
              value={inline.email}
              onChange={(e) => setInline((s) => ({ ...s, email: e.target.value }))}
              required
            />
            <input
              type="text"
              placeholder="Company name"
              value={inline.company}
              onChange={(e) => setInline((s) => ({ ...s, company: e.target.value }))}
              required
            />
            <select
              value={inline.product}
              onChange={(e) => setInline((s) => ({ ...s, product: e.target.value }))}
              aria-label="Product of interest"
            >
              <option value="">Product of interest</option>
              <option value="enclosure">Enclosures</option>
              <option value="connector">Connectors</option>
              <option value="assembly">Assemblies</option>
            </select>
            <button className="rq-btn rq-inline" type="submit" disabled={loading}>
              {loading ? "Sending..." : "Quick Quote"}
            </button>
          </form>

          {successMsg && <div className="rq-success" role="status">{successMsg}</div>}
          {errorMsg && <div className="rq-error" role="alert">{errorMsg}</div>}
        </div>
      </div>

      {showModal && (
        <div className="rq-modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="rq-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
            <h3>Request a Quote</h3>
            <p className="muted">Please provide details and we will get back within 2 business days.</p>
            <form onSubmit={handleModalSubmit} className="rq-modal-form">
              <div className="row">
                <label>
                  Name
                  <input value={modalData.name} onChange={(e) => setModalData(s => ({ ...s, name: e.target.value }))} required />
                </label>
                <label>
                  Company
                  <input value={modalData.company} onChange={(e) => setModalData(s => ({ ...s, company: e.target.value }))} required />
                </label>
              </div>
              <div className="row">
                <label>
                  Email
                  <input type="email" value={modalData.email} onChange={(e) => setModalData(s => ({ ...s, email: e.target.value }))} required />
                </label>
                <label>
                  Phone
                  <input value={modalData.phone} onChange={(e) => setModalData(s => ({ ...s, phone: e.target.value }))} />
                </label>
              </div>
              <label>
                Product / SKU
                <input value={modalData.product} onChange={(e) => setModalData(s => ({ ...s, product: e.target.value }))} />
              </label>
              <div className="row">
                <label>
                  Quantity (est.)
                  <input value={modalData.qty} onChange={(e) => setModalData(s => ({ ...s, qty: e.target.value }))} />
                </label>
                <label>
                  Upload RFQ
                  <input type="file" accept=".pdf,.zip,.dwg" />
                </label>
              </div>
              <label>
                Notes
                <textarea value={modalData.notes} onChange={(e) => setModalData(s => ({ ...s, notes: e.target.value }))} rows={3} />
              </label>
              <div className="modal-actions">
                <button type="button" className="rq-btn rq-outline" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="rq-btn rq-primary" disabled={loading}>
                  {loading ? "Submitting..." : "Submit Request"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

/* ------------------------- Testimonials ------------------------- */
export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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
    {
      id: 1,
      name: "Sarah Johnson",
      location: "New York, NY",
      text: "The team at DecorHome transformed our living space completely. Their attention to detail and quality products exceeded our expectations. We couldn't be happier!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 2,
      name: "Michael Thompson",
      location: "Chicago, IL",
      text: "I've purchased furniture from many places, but nothing compares to the quality and style I found here. The pieces are conversation starters!",
      rating: 4,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 3,
      name: "Emma Rodriguez",
      location: "Los Angeles, CA",
      text: "From consultation to delivery, the experience was flawless. The interior design suggestions were spot on and reflected my personal style perfectly.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
    {
      id: 4,
      name: "James Wilson",
      location: "Miami, FL",
      text: "The custom pieces we ordered were worth every penny. Excellent craftsmanship and they arrived right on schedule. Will definitely shop here again!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToSlide = (index) => setCurrentIndex(index);
  const goToPrev = () => setCurrentIndex((p) => (p - 1 + testimonials.length) % testimonials.length);
  const goToNext = () => setCurrentIndex((p) => (p + 1) % testimonials.length);

  return (
    <section className={`testimonials-section ${darkMode ? "theme-dark" : "theme-light"}`}>
      <div className="container">
        <h2 className="section-title">What Our Clients Say</h2>
        <p className="section-subtitle">Discover why our customers love transforming their homes with us</p>

        <div className="testimonials-carousel">
          <div className="carousel-container">
            {testimonials.map((t, i) => (
              <div key={t.id} className={`testimonial-card ${i === currentIndex ? "active" : ""}`} aria-hidden={i !== currentIndex}>
                <div className="testimonial-content">
                  <div className="quote-icon">“</div>
                  <div className="rating">
                    {[...Array(5)].map((_, idx) => (
                      <span key={idx} className={`star ${idx < t.rating ? "filled" : ""}`}>★</span>
                    ))}
                  </div>
                  <p className="testimonial-text">"{t.text}"</p>
                  <div className="testimonial-author">
                    <div className="author-image-container">
                      <img src={t.image} alt={t.name} className="author-image" />
                      <div className="image-border" />
                    </div>
                    <div className="author-details">
                      <h4 className="author-name">{t.name}</h4>
                      <p className="author-location">{t.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="carousel-controls">
            <button className="control-btn prev" onClick={goToPrev} aria-label="Previous testimonial">‹</button>

            <div className="indicators">
              {testimonials.map((_, idx) => (
                <button key={idx} className={`indicator ${idx === currentIndex ? "active" : ""}`} onClick={() => goToSlide(idx)} aria-label={`Go to testimonial ${idx + 1}`} />
              ))}
            </div>

            <button className="control-btn next" onClick={goToNext} aria-label="Next testimonial">›</button>
          </div>
        </div>
      </div>
    </section>
  );
};

/* ------------------------- Footer ------------------------- */
export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-logo">DecorHome</h3>
            <p className="footer-description">
              Transforming houses into homes with exquisite decor and furniture since 2010.
              We believe in quality, style, and creating spaces that tell your story.
            </p>
            <div className="social-links">
              <a href="#" className="social-link" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social-link" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="#" className="social-link" aria-label="Pinterest"><i className="fab fa-pinterest-p"></i></a>
              <a href="#" className="social-link" aria-label="Twitter"><i className="fab fa-twitter"></i></a>
              <a href="#" className="social-link" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#">Home</a></li>
              <li><a href="#">Shop</a></li>
              <li><a href="#">Collections</a></li>
              <li><a href="#">Gallery</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Testimonials</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Categories</h4>
            <ul className="footer-links">
              <li><a href="#">Living Room</a></li>
              <li><a href="#">Bedroom</a></li>
              <li><a href="#">Dining Room</a></li>
              <li><a href="#">Office</a></li>
              <li><a href="#">Outdoor</a></li>
              <li><a href="#">Decor Accessories</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Contact Info</h4>
            <div className="contact-info">
              <div className="contact-item"><i className="fas fa-map-marker-alt"></i><span>123 Design Street, Interior City, IC 10001</span></div>
              <div className="contact-item"><i className="fas fa-phone"></i><span>+1 (555) 123-4567</span></div>
              <div className="contact-item"><i className="fas fa-envelope"></i><span>info@decorhome.com</span></div>
              <div className="contact-item"><i className="fas fa-clock"></i><span>Mon-Fri: 9AM - 6PM, Sat: 10AM - 4PM</span></div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p>&copy; 2023 DecorHome. All rights reserved.</p>
            <div className="footer-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* ------------------------- Showcase Default Export ------------------------- */
/**
 * Default export renders components in a single page flow.
 * Use named exports to import individual components if you prefer.
 */
export default function Showcase() {
  return (
    <>
      <RequestQuoteHero />
      <NewArrivals />
      <AboutUsHero />
      <Testimonials />
      <Footer />
    </>
  );
}
