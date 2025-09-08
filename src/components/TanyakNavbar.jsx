import React, { useState, useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaBars,
  FaPhone,
  FaEnvelope,
  FaTimes,
  FaChevronDown,
} from "react-icons/fa";
import "../styles/Navbar.css";

export default function TanyakNavbar() {
  const [query, setQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCategories, setShowCategories] = useState(false); // desktop dropdown
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false); // inside mobile menu
  const categoriesRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close desktop categories when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showCategories &&
        categoriesRef.current &&
        !categoriesRef.current.contains(event.target)
      ) {
        setShowCategories(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showCategories]);

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Kitchen",
    "Beauty & Health",
    "Sports & Fitness",
    "Books",
    "Toys & Games",
  ];

  const handleSearch = (e) => {
    e?.preventDefault();
    console.log("Search:", query);
    // navigate to search results if needed
    setIsMobileSearchOpen(false);
  };

  const handleNavClick = (href) => {
    // generic nav handler (if you later wire routing)
    setIsMobileMenuOpen(false);
    setMobileCategoriesOpen(false);
    setShowCategories(false);
    // window.location.href = href; // if needed
  };

  return (
    <>
      <header className={`tanyak-header ${isScrolled ? "scrolled" : ""}`}>
        <div className="top-announcement text-center">
          Order value must be 4,000 Rs. The Delivery Charges will be communicated
          to you after packing your parcel.
        </div>

        {/* MAIN HEADER */}
        <div className="main-header">
          <Container fluid className="d-flex align-items-center flex-wrap">
            {/* LOGO - left */}
            <a href="/" className="brand" onClick={() => handleNavClick("/")}>
              <div className="brand-placeholder">TANYAK</div>
            </a>

            {/* Desktop search (hidden on small screens) */}
            <form
              className="search-form d-none d-md-flex"
              onSubmit={handleSearch}
              role="search"
            >
              <div className="search-wrapper">
                <input
                  type="text"
                  className="search-input"
                  placeholder="Search for products, brands and categories..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  aria-label="Search products"
                />
                <button type="submit" className="search-icon-btn" aria-label="Search">
                  <FaSearch />
                </button>
              </div>
            </form>

            {/* mobile right controls: search icon + hamburger (visible on md and below) */}
            <div className="mobile-controls d-md-none ms-auto d-flex align-items-center">
              <button
                className="search-icon-mobile"
                aria-label="open search"
                onClick={() => {
                  setIsMobileSearchOpen((s) => !s);
                  setIsMobileMenuOpen(false);
                }}
              >
                <FaSearch />
              </button>

              <button
                className="hamburger"
                aria-label="menu"
                onClick={() => {
                  setIsMobileMenuOpen((s) => !s);
                  setIsMobileSearchOpen(false);
                }}
              >
                {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
              </button>
            </div>

            {/* Contacts (visible on md and up) */}
            <div className="contacts d-none d-md-flex">
              <div className="contact-block">
                <div className="contact-left">
                  <div className="contact-icon-wrap">
                    <FaPhone />
                  </div>
                </div>
                <div className="contact-right">
                  <div className="contact-label">Got Any Question</div>
                  <a className="contact-sub" href="tel:+918700827231">
                    +91 87008 27231
                  </a>
                </div>
              </div>

              <div className="contact-block">
                <div className="contact-left">
                  <div className="contact-icon-wrap">
                    <FaEnvelope />
                  </div>
                </div>
                <div className="contact-right">
                  <div className="contact-label">Email</div>
                  <a className="contact-sub" href="mailto:support@tanyak.in">
                    support@tanyak.in
                  </a>
                </div>
              </div>
            </div>
          </Container>
        </div>

        {/* SECONDARY NAV (desktop) — hidden on small screens */}
        <div className="secondary-nav d-none d-md-block">
          <Container fluid className="d-flex align-items-center">
            <nav className="nav-left d-flex align-items-center">
              <a href="/" className="nav-link" onClick={() => handleNavClick("/")}>Home</a>
              <a href="/shop" className="nav-link" onClick={() => handleNavClick("/shop")}>Shop</a>
              <a href="/collections" className="nav-link" onClick={() => handleNavClick("/collections")}>Collections</a>
              <a href="/offers" className="nav-link" onClick={() => handleNavClick("/offers")}>Offers</a>

              {/* Categories (no background) */}
              <div className="categories-wrapper" ref={categoriesRef}>
                <button
                  className="nav-link categories-toggle"
                  onClick={() => setShowCategories((s) => !s)}
                  aria-expanded={showCategories}
                >
                  Categories <FaChevronDown className={`arrow ${showCategories ? "rotated" : ""}`} />
                </button>

                {showCategories && (
                  <div className="categories-menu-dropdown">
                    <Container fluid>
                      <div className="categories-grid">
                        {categories.map((category, i) => (
                          <a
                            key={i}
                            href={`/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
                            className="category-item"
                            onClick={() => {
                              setShowCategories(false);
                              // optionally navigate
                            }}
                          >
                            {category}
                          </a>
                        ))}
                      </div>
                    </Container>
                  </div>
                )}
              </div>

          
            </nav>

            <div className="flex-fill" />

            <div className="nav-actions d-flex align-items-center">
              <a href="/login" className="login-link me-3">Login / Register</a>

              <a href="/wishlist" className="icon-btn me-2" title="Wishlist">
                <FaHeart /><span className="badge">0</span>
              </a>

              <a href="/cart" className="icon-btn me-2" title="Cart">
                <FaShoppingCart /><span className="badge">0</span>
              </a>

              <div className="cart-total d-none d-md-block">₹0.00</div>
            </div>
          </Container>
        </div>

        {/* DESKTOP categories full-width panel (when opened) */}
        {showCategories && (
          <div className="categories-menu" onMouseLeave={() => setShowCategories(false)}>
            <Container fluid>
              <div className="categories-grid">
                {categories.map((category, i) => (
                  <a
                    key={i}
                    href={`/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
                    className="category-item"
                    onClick={() => setShowCategories(false)}
                  >
                    {category}
                  </a>
                ))}
              </div>
            </Container>
          </div>
        )}

        {/* MOBILE SEARCH OVERLAY */}
        {isMobileSearchOpen && (
          <div className="mobile-search-overlay" role="dialog" aria-modal="true">
            <div className="mobile-search-box">
              <form onSubmit={handleSearch} className="w-100 d-flex">
                <input
                  type="text"
                  className="mobile-search-input"
                  placeholder="Search products..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                />
                <button type="submit" className="mobile-search-submit"><FaSearch /></button>
                <button type="button" className="mobile-search-close" onClick={() => setIsMobileSearchOpen(false)} aria-label="Close search"><FaTimes /></button>
              </form>
            </div>
          </div>
        )}

        {/* MOBILE MENU */}
        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <div className="mobile-menu-content">
              <a href="/" className="mobile-nav-link" onClick={() => handleNavClick("/")}>Home</a>
              <a href="/shop" className="mobile-nav-link" onClick={() => handleNavClick("/shop")}>Shop</a>
              <a href="/collections" className="mobile-nav-link" onClick={() => handleNavClick("/collections")}>Collections</a>
              <a href="/offers" className="mobile-nav-link" onClick={() => handleNavClick("/offers")}>Offers</a>

              {/* Mobile categories toggler */}
              <button
                className="mobile-nav-link mobile-categories-toggle"
                onClick={() => setMobileCategoriesOpen((s) => !s)}
                aria-expanded={mobileCategoriesOpen}
              >
                Categories {mobileCategoriesOpen ? "▲" : "▼"}
              </button>

              {mobileCategoriesOpen && (
                <div className="mobile-categories-list">
                  {categories.map((category, i) => (
                    <a
                      key={i}
                      href={`/category/${category.toLowerCase().replace(/\s+/g, "-")}`}
                      className="mobile-category-item"
                      onClick={() => handleNavClick(`/category/${category.toLowerCase().replace(/\s+/g, "-")}`)}
                    >
                      {category}
                    </a>
                  ))}
                </div>
              )}

          

              <div style={{ height: 8 }} />

              <a href="/login" className="mobile-nav-link" onClick={() => handleNavClick("/login")}>Login / Register</a>

              <div className="mobile-actions" style={{ marginTop: 20 }}>
                <a href="/wishlist" className="mobile-action-btn">Wishlist</a>
                <a href="/cart" className="mobile-action-btn">Cart</a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
