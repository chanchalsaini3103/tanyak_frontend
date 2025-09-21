import React, { useState, useEffect } from 'react';
import '../styles/Gallery.css';
import Footer from './Footer';

const Gallery = () => {
  const [loaded, setLoaded] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Set loaded to true after component mounts to trigger animations
    setLoaded(true);

    // initialize dark mode from body class or localStorage
    const init = () => {
      try {
        const bodyHas = typeof document !== 'undefined' && document.body.classList.contains('dark-mode');
        const saved = typeof window !== 'undefined' && localStorage.getItem('darkMode') === 'true';
        setDarkMode(bodyHas || saved);
      } catch {
        setDarkMode(false);
      }
    };
    init();

    // Listen for storage change (other tabs) and custom events
    const onStorage = (e) => {
      if (e.key === 'darkMode') init();
    };
    const onCustom = () => init();

    window.addEventListener('storage', onStorage);
    window.addEventListener('darkmode_changed', onCustom);
    window.addEventListener('tanyak_theme_changed', onCustom); // in case your app uses this

    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('darkmode_changed', onCustom);
      window.removeEventListener('tanyak_theme_changed', onCustom);
    };
  }, []);

  const indoorImages = [
    { id: 1, title: 'Living Room', image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 2, title: 'Bedroom', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 3, title: 'Office', image: 'https://images.unsplash.com/photo-1449247709967-d4461a6a6103?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' },
    { id: 4, title: 'Dining', image: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80' }
  ];

  const downloadBrochure = () => {
    // Simulate brochure download
    const link = document.createElement('a');
    link.href = '/brochure.pdf'; // Replace with actual brochure path
    link.download = 'Tanyat-Brochure.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <section className={`gallery-section ${loaded ? 'loaded' : ''} ${darkMode ? 'dark-mode' : ''}`}>
        {/* Decorative elements */}
        <div className="decorative-circle circle-1" aria-hidden="true"></div>
        <div className="decorative-circle circle-2" aria-hidden="true"></div>
        <div className="decorative-circle circle-3" aria-hidden="true"></div>

        <div className="gallery-container">
          <div className="section-header">
            <h2 className="gallery-title">Indoor Inspirations</h2>
            <div className="title-underline"></div>
            <p className="gallery-subtitle">See how our products transform living spaces</p>
          </div>

          {/* Diagonal Image Grid */}
          <div className="diagonal-grid" role="list">
            {indoorImages.map((item, index) => (
              <div
                key={item.id}
                className={`diagonal-item diagonal-${index + 1}`}
                style={{ animationDelay: `${index * 0.2}s` }}
                role="listitem"
                tabIndex={0}
                aria-label={item.title}
              >
                <div className="diagonal-image-container">
                  <img src={item.image} alt={item.title} />
                  <div className="diagonal-overlay">
                    <h3>{item.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Brochure Section */}
          <div className="brochure-section" aria-labelledby="brochure-heading">
            <div className="brochure-content">
              <h3 id="brochure-heading">Download Our Brochure</h3>
              <p>Get inspired with our complete collection of home decor products</p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 18 }}>
                <button
                  className="download-brochure-btn"
                  onClick={downloadBrochure}
                  aria-label="Download brochure PDF"
                >
                  Download Brochure
                </button>
                <a
                  className="download-brochure-btn outline"
                  href="/brochure.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open brochure in new tab"
                >
                  Open Brochure
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Gallery;
