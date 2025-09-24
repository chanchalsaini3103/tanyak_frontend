// src/components/TanyakNavbar.jsx
import React, { useState, useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaHeart,
  FaBars,
  FaPhone,
  FaEnvelope,
  FaTimes,
  FaHome,
  FaStore,
  FaTags,
  FaBlog,
  FaQuestionCircle,
  FaRegUserCircle,
  FaSun,
  FaMoon,
  FaSignInAlt,
  FaUserPlus,
} from "react-icons/fa";
import "../styles/Navbar.css";
import logo from "../assets/logo.avif";
import logoDark from "../assets/logo-ddark.png";

export default function TanyakNavbar() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);

  // NEW: only show secondary + announcement when at very top of page (desktop)
  const [showSecondary, setShowSecondary] = useState(true);
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  const TOP_SHOW = 40; // px from top where secondary nav & announcement remain visible

  const categoriesWrapperRef = useRef(null);
  const categoriesDropdownRef = useRef(null);
  const hideTimer = useRef(null);

  // Initialize dark mode from localStorage or system preference
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (savedMode !== null) {
      setDarkMode(savedMode === "true");
    } else {
      setDarkMode(systemPrefersDark);
    }
  }, []);

  // Apply dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  // Scroll handler for header shadow
  useEffect(() => {
    const handleScrollForShadow = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScrollForShadow, { passive: true });
    return () => window.removeEventListener("scroll", handleScrollForShadow);
  }, []);

  // ---------- Show/hide secondary nav + announcement ONLY when near top (desktop) ----------
  useEffect(() => {
    const isDesktopWidth = () =>
      typeof window !== "undefined" && window.innerWidth >= 992;

    const onScrollOrResize = () => {
      const currentY = window.scrollY;

      // On non-desktop, keep both visible
      if (!isDesktopWidth()) {
        setShowSecondary(true);
        setShowAnnouncement(true);
        return;
      }

      // For desktop: visible only when near the top (<= TOP_SHOW)
      const nearTop = currentY <= TOP_SHOW;
      setShowSecondary(nearTop);
      setShowAnnouncement(nearTop);
    };

    // add both listeners to handle viewport changes and scroll
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    // initialize properly
    onScrollOrResize();

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, []);

  // categories dropdown outside click handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        showCategories &&
        categoriesWrapperRef.current &&
        categoriesDropdownRef.current &&
        !categoriesWrapperRef.current.contains(event.target) &&
        !categoriesDropdownRef.current.contains(event.target)
      ) {
        clearTimeout(hideTimer.current);
        setShowCategories(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showCategories]);

  const isDesktop = () =>
    typeof window !== "undefined" && window.innerWidth >= 992;

  const subcategories = [
    "Structural Hardware",
    "Functional Hardware",
    "Decorative Hardware",
    "Handles",
    "Hinges",
  ];

  const categories = [
    "Electronics",
    "Fashion",
    "Home & Kitchen",
    "Beauty & Health",
    "Sports & Fitness",
    "Books",
    "Toys & Games",
    "Lighting",
    "Hardware",
    "Decor",
  ];

  const handleSearch = (e) => {
    e?.preventDefault();
    console.log("Search:", query);
    setIsMobileSearchOpen(false);
  };

  // Unified nav handler: close mobile UI then navigate via react-router
  const handleNavClick = (href) => {
    // close menus immediately for better UX
    setIsMobileMenuOpen(false);
    setShowCategories(false);

    // if href is an internal path, navigate client-side
    if (typeof href === "string" && href.startsWith("/")) {
      navigate(href);
      return;
    }

    // fallback: go to url (external etc.)
    if (typeof href === "string") {
      window.location.href = href;
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // hover helpers for desktop categories (unchanged)
  const clearHideTimer = () => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  };
  const scheduleHide = (delay = 80) => {
    clearHideTimer();
    hideTimer.current = setTimeout(() => {
      setShowCategories(false);
      hideTimer.current = null;
    }, delay);
  };

  const onButtonEnter = () => {
    if (isDesktop()) {
      clearHideTimer();
      setShowCategories(true);
    }
  };
  const onButtonLeave = () => {
    if (isDesktop()) scheduleHide();
  };
  const onDropdownEnter = () => {
    if (isDesktop()) {
      clearHideTimer();
      setShowCategories(true);
    }
  };
  const onDropdownLeave = () => {
    if (isDesktop()) scheduleHide();
  };

  // ------------------ Wishlist counter logic ------------------
  const updateCountFromStorage = () => {
    try {
      const raw = localStorage.getItem("tanyak_wishlist");
      const obj = raw ? JSON.parse(raw) : {};
      const count =
        obj && typeof obj === "object" ? Object.keys(obj).length : 0;
      setWishlistCount(count);
    } catch (err) {
      console.warn("Failed to read wishlist from storage", err);
      setWishlistCount(0);
    }
  };

  useEffect(() => {
    updateCountFromStorage();
    const onCustom = () => updateCountFromStorage();
    window.addEventListener("tanyak_wishlist_updated", onCustom);

    const onStorage = (e) => {
      if (e.key === "tanyak_wishlist") updateCountFromStorage();
    };
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("tanyak_wishlist_updated", onCustom);
      window.removeEventListener("storage", onStorage);
    };
  }, []);
  // ------------------------------------------------------------

  return (
    <>
      <header
        className={`tanyak-header ${isScrolled ? "scrolled" : ""} ${
          darkMode ? "dark-mode" : ""
        }`}
      >
        {/* TOP ANNOUNCEMENT (now hideable like secondary nav) */}
        <div
          className={`top-announcement ${
            showAnnouncement ? "visible" : "hidden"
          }`}
          aria-hidden={!showAnnouncement}
        >
          Order value must be 4,000 Rs. The Delivery Charges will be
          communicated to you after packing your parcel.
        </div>

        {/* MAIN HEADER */}
        <div className="main-header">
          <Container fluid className="d-flex align-items-center flex-wrap">
            {/* LOGO */}
            <a
              href="/"
              className="brand"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("/");
              }}
            >
              <img
                src={darkMode ? logoDark : logo}
                alt="TANYAK"
                className="brand-img"
              />
            </a>

            {/* Desktop search */}
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
                <button
                  type="submit"
                  className="search-icon-btn"
                  aria-label="Search"
                >
                  <FaSearch />
                </button>
              </div>
            </form>

            {/* mobile right controls */}
            <div className="mobile-controls d-md-none ms-auto d-flex align-items-center">
              <button
                className="search-icon-mobile"
                aria-label="open search"
                onClick={() => {
                  setIsMobileSearchOpen((s) => !s);
                  setIsMobileMenuOpen(false);
                }}
                title="Search"
                type="button"
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
                title="Menu"
                type="button"
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

        {/* SECONDARY NAV (desktop) */}
        <div
          className={`secondary-nav d-none d-md-block ${
            showSecondary ? "visible" : "hidden"
          }`}
          style={{ position: "relative" }}
        >
          <Container fluid className="d-flex align-items-center">
            <nav className="nav-left d-flex align-items-center">
              <a
                href="/"
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("/");
                }}
              >
                Home
              </a>
              <a
                href="/shop"
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("/shop");
                }}
              >
                Shop
              </a>
              <a
                href="/blog"
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("/blog");
                }}
              >
                Gallery
              </a>
              <a
                href="/offers"
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("/offers");
                }}
              >
                Offers
              </a>
              <a
                href="/outlet"
                className="nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("/outlet");
                }}
              >
                Outlet
              </a>
            </nav>

            <div className="flex-fill" />

            <div className="nav-actions d-flex align-items-center">
              {/* Dark/Light Mode Toggle Button */}
              <button
                className="theme-toggle-btn"
                onClick={toggleDarkMode}
                aria-label={
                  darkMode ? "Switch to light mode" : "Switch to dark mode"
                }
                title={
                  darkMode ? "Switch to light mode" : "Switch to dark mode"
                }
                type="button"
              >
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>

              <a
                href="/wishlist"
                className="icon-btn me-2"
                title="Wishlist"
                aria-label={`Wishlist: ${wishlistCount} items`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick("/wishlist");
                }}
              >
                <FaHeart />
                <span className="badge" aria-hidden>
                  {wishlistCount}
                </span>
              </a>
            </div>
          </Container>

          {/* FULL-WIDTH CATEGORIES DROPDOWN */}
          {showCategories && (
            <div
              className="categories-fullwidth-dropdown"
              ref={categoriesDropdownRef}
              onMouseEnter={onDropdownEnter}
              onMouseLeave={onDropdownLeave}
            >
              <Container fluid>
                <div className="categories-grid-full">
                  {subcategories.map((sub, i) => (
                    <a
                      key={i}
                      href={`/category/${sub
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                      className="category-full-item"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowCategories(false);
                        handleNavClick(
                          `/category/${sub.toLowerCase().replace(/\s+/g, "-")}`
                        );
                      }}
                    >
                      {sub}
                    </a>
                  ))}
                </div>
              </Container>
            </div>
          )}
        </div>

        {/* MOBILE SEARCH OVERLAY */}
        {isMobileSearchOpen && (
          <div
            className="mobile-search-overlay"
            role="dialog"
            aria-modal="true"
          >
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
                <button type="submit" className="mobile-search-submit">
                  <FaSearch />
                </button>
                <button
                  type="button"
                  className="mobile-search-close"
                  onClick={() => setIsMobileSearchOpen(false)}
                  aria-label="Close search"
                >
                  <FaTimes />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* MOBILE RIGHT-SIDE DRAWER */}

       {isMobileMenuOpen && (
  <div className="mobile-drawer-overlay" role="dialog" aria-modal="true">
    <div className="mobile-drawer" role="dialog" aria-label="Mobile menu">
      {/* Header: Logo + Cancel */}
      <div className="mobile-drawer-header">
        <div
          className="mobile-drawer-logo-wrap"
          onClick={() => {
            setIsMobileMenuOpen(false);
            handleNavClick("/");
          }}
          role="button"
          tabIndex={0}
          aria-label="Go to home"
        >
          <img src={darkMode ? logoDark : logo} alt="TANYAK" className="mobile-drawer-logo" />
        </div>

        <button
          className="mobile-drawer-cancel"
          onClick={() => setIsMobileMenuOpen(false)}
          type="button"
          aria-label="Close menu"
          title="Close"
        >
          <FaTimes />
        </button>
      </div>

      {/* Body: Nav links */}
      <div className="mobile-drawer-body">
        <nav className="mobile-nav-list" aria-label="Mobile navigation">
          <button type="button" className="mobile-nav-item" onClick={() => handleNavClick("/")}>
            <FaHome className="mobile-nav-icon" /> Home
          </button>

          <button type="button" className="mobile-nav-item" onClick={() => handleNavClick("/shop")}>
            <FaStore className="mobile-nav-icon" /> Shop
          </button>

          <button type="button" className="mobile-nav-item" onClick={() => handleNavClick("/offers")}>
            <FaTags className="mobile-nav-icon" /> Offers
          </button>

          <button type="button" className="mobile-nav-item" onClick={() => handleNavClick("/blog")}>
            <FaBlog className="mobile-nav-icon" /> Gallery
          </button>

          <button type="button" className="mobile-nav-item" onClick={() => handleNavClick("/outlet")}>
            <FaQuestionCircle className="mobile-nav-icon" /> Outlet
          </button>
        </nav>
      </div>

      {/* Dark mode button above footer */}
      <div className="mobile-footer-theme">
        <button
          className="mobile-theme-toggle-btn"
          onClick={toggleDarkMode}
          type="button"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <FaSun className="mobile-theme-icon" /> : <FaMoon className="mobile-theme-icon" />}
          <span className="mobile-theme-text">{darkMode ? " Light Mode" : " Dark Mode"}</span>
        </button>
      </div>

      {/* Footer (always stuck at bottom) */}
      <div className="mobile-footer">
        <small>A2025 tanyak all right reserved</small>
      </div>
    </div>
  </div>
)}

      </header>
    </>
  );
}
