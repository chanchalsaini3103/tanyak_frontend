import React, { useState, useEffect } from "react";
import "../styles/NewArrivals.css";
import cabinetHandlesImg from "../images/newarrivals/1.jpg";
import img2 from "../images/newarrivals/2.jpg";
import img3 from "../images/newarrivals/3.jpg";
import img4 from "../images/newarrivals/4.jpg";
import img5 from "../images/newarrivals/5.jpg";


const NewArrivals = () => {
  const [darkMode, setDarkMode] = useState(
    () =>
      document.body.classList.contains("dark-mode") ||
      localStorage.getItem("darkMode") === "true"
  );

  // observe body class changes (so theme toggle from Navbar updates this component)
  useEffect(() => {
    const body = document.body;
    const mo = new MutationObserver(() => {
      setDarkMode(body.classList.contains("dark-mode"));
    });
    mo.observe(body, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  // also listen for storage events (theme changes from another tab)
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "darkMode") setDarkMode(e.newValue === "true");
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Sample new arrival products
  const newArrivals = [
    {
      id: 1,
      name: " Cabinet Handles",
      image:
       cabinetHandlesImg,
         badge: "New",
    },
    {
      id: 2,
      name: "Modern Drawer Pulls",
      image:img2,
      badge: "Trending",
    },
    {
      id: 3,
      name: "Black & Gold Hinges",
      image:
        img3,   badge: "Limited",
    },
    {
      id: 4,
      name: "Designer Door Knobs",
      image:
       img4,      badge: "Premium",
    },
    {
      id: 5,
      name: "Matte Black Latches",
      image:
      img5,    badge: "New",
    },
    // {
    //   id: 6,
    //   name: "Vintage Style Locks",
    //   image:
    //     "https://images.unsplash.com/photo-1611238112651-2c13ef1f4c0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
    //   badge: "Exclusive",
    // },
  ];

  return (
    <section
      className={`new-arrivals ${darkMode ? "theme-dark" : "theme-light"}`}
    >
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">New Arrivals</h2>
          <p className="section-subtitle">
            Discover our latest hardware collections
          </p>
        </div>

        <div className="arrivals-container">
          <div className="scrolling-track" aria-hidden>
            <div className="scrolling-items" role="list">
              {newArrivals.map((product) => (
                <article
                  key={product.id}
                  className="arrival-card"
                  role="listitem"
                >
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
                        <button className="view-details-btn">
                          View Details
                        </button>
                        <button className="add-to-cart-btn">
                          Add to Cart
                        </button>
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

export default NewArrivals;