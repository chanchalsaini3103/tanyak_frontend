import React, { useState, useEffect, useRef } from "react";
import "../styles/NewArrivals.css";
import cabinetHandlesImg from "../images/newarrivals/1.jpg";
import img2 from "../images/newarrivals/2.jpg";
import img3 from "/images/newarrivals2/Hinges.jpeg";
import img4 from "/images/newarrivals2/Knob.jpg";
import img5 from "../images/newarrivals/5.jpg";
import img6 from "/images/newarrivals2/wardrobe accesories.png";
import img7 from "/images/newarrivals2/Wicker baskets.webp";
import img8 from "/images/newarrivals2/Tendoms.png";
import img9 from "/images/newarrivals2/Glass Rolling shutter.webp";
import img10 from "/images/newarrivals2/SS T patti.webp";
import { Link } from "react-router-dom";

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
    { id: 1, name: "Handles", image: cabinetHandlesImg, badge: "New" },
    { id: 2, name: "Handles", image: img2, badge: "Trending" },
    { id: 3, name: "Hinges", image: img3, badge: "Limited" },
    { id: 4, name: "Knobs", image: img4, badge: "Premium" },
    { id: 5, name: "Latches", image: img5, badge: "New" },
    { id: 6, name: "Wardrobe Accesories", image: img6, badge: "New" },
    { id: 7, name: "Wicker Baskets", image: img7, badge: "Trending" },
    { id: 8, name: "Tendoms", image: img8, badge: "Limited" },
    { id: 9, name: "Glass Rolling shutter", image: img9, badge: "Premium" },
    { id: 10, name: "SS T patti", image: img10, badge: "New" },
  ];

  // Refs to measure widths and update CSS variable
  const scrollingItemsRef = useRef(null);
  const measurementTimer = useRef(null);

  // calculate and set --scroll-distance on the scrolling-items element
  const updateScrollDistance = () => {
    const el = scrollingItemsRef.current;
    if (!el) return;

    // total width of the scrolling row (two copies)
    const total = el.scrollWidth;
    if (!total) return;

    // width of one copy (we render two identical sets)
    const firstCopyWidth = total / 2;

    // If first copy narrower than viewport, we still set distance (JS can detect later if more duplicates needed)
    if (!firstCopyWidth || isNaN(firstCopyWidth)) return;

    // set CSS variable to negative px value (the animation translates negatively)
    el.style.setProperty("--scroll-distance", `-${Math.round(firstCopyWidth)}px`);
  };

  useEffect(() => {
    // initial measurement after small delay so images/layout settle
    measurementTimer.current = setTimeout(updateScrollDistance, 200);

    const onResize = () => {
      clearTimeout(measurementTimer.current);
      measurementTimer.current = setTimeout(updateScrollDistance, 120);
    };
    window.addEventListener("resize", onResize);

    // also update when images inside the element load (helps mobile)
    const el = scrollingItemsRef.current;
    if (el) {
      const imgs = el.querySelectorAll("img");
      let loadedCount = 0;
      const onImgLoad = () => {
        loadedCount++;
        // small threshold: after a couple images load, update distance
        if (loadedCount >= Math.min(imgs.length, 2)) {
          clearTimeout(measurementTimer.current);
          measurementTimer.current = setTimeout(updateScrollDistance, 80);
        }
      };
      imgs.forEach((img) => {
        if (img.complete) onImgLoad();
        else {
          img.addEventListener("load", onImgLoad, { once: true });
          img.addEventListener("error", onImgLoad, { once: true });
        }
      });

      return () => {
        imgs.forEach((img) => {
          img.removeEventListener("load", onImgLoad);
          img.removeEventListener("error", onImgLoad);
        });
        window.removeEventListener("resize", onResize);
        clearTimeout(measurementTimer.current);
      };
    } else {
      return () => {
        window.removeEventListener("resize", onResize);
        clearTimeout(measurementTimer.current);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [/* run once; images handled internally */]);

  // pause animation on touchstart/pointerdown and resume on touchend/pointerup
  useEffect(() => {
    const el = scrollingItemsRef.current;
    if (!el) return;

    const onTouchStart = () => el.classList.add("is-paused");
    const onTouchEnd = () => el.classList.remove("is-paused");

    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd);
    el.addEventListener("pointerdown", onTouchStart);
    window.addEventListener("pointerup", onTouchEnd);

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("pointerdown", onTouchStart);
      window.removeEventListener("pointerup", onTouchEnd);
    };
  }, []);

  return (
    <section className={`new-arrivals ${darkMode ? "theme-dark" : "theme-light"}`}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">New Arrivals</h2>
          <p className="section-subtitle">Discover our latest hardware collections</p>
        </div>

        <div className="arrivals-container">
          <div className="scrolling-track" aria-hidden>
            {/* scrolling-items contains two copies of the list to create a seamless loop */}
            <div
              className="scrolling-items"
              role="list"
              aria-label="New arrivals carousel"
              ref={scrollingItemsRef}
            >
              {/* First (semantic) copy */}
              {newArrivals.map((product) => (
                <article key={`A-${product.id}`} className="arrival-card" role="listitem">
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

              {/* Duplicate copy for seamless looping — hidden from assistive tech */}
              {newArrivals.map((product) => (
                <article
                  key={`B-${product.id}`}
                  className="arrival-card"
                  role="presentation"
                  aria-hidden="true"
                >
                  <div className="card-inner" tabIndex={-1}>
                    <div className="card-front">
                      <div className="product-badge">{product.badge}</div>
                      <div className="product-image">
                        <img src={product.image} alt="" />
                      </div>
                      <div className="product-info">
                        <h3 className="product-name">{product.name}</h3>
                      </div>
                    </div>

                    <div className="card-back" aria-hidden>
                      <h3>{product.name}</h3>
                      <div className="card-actions">
                        <button className="view-details-btn" tabIndex={-1}>
                          View Details
                        </button>
                        <button className="add-to-cart-btn" tabIndex={-1}>
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

        {/* <div className="view-all-container">
          <Link to="/shop" className="view-all-btn">
            View All New Arrivals
          </Link>
        </div> */}
      </div>
    </section>
  );
};

export default NewArrivals;
