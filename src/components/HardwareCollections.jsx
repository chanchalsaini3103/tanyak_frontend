import React, { useState, useEffect, useMemo } from "react";
import { Container, Row, Col, Modal, Form, Badge } from "react-bootstrap";
import { FaHeart, FaEye, FaArrowRight, FaWhatsapp } from "react-icons/fa";
import products from "../data/products";
import "../styles/Collections.css";
import Footer from "./Footer";

export default function HardwareCollections() {
  const [likedItems, setLikedItems] = useState({});
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoveredAction, setHoveredAction] = useState(null);
  const [showQuickView, setShowQuickView] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Theme detection (follows NewArrivals pattern)
  const [darkMode, setDarkMode] = useState(() => {
    try {
      if (typeof document === "undefined") return false;
      if (document.body.classList.contains("dark-mode")) return true;
      if (localStorage.getItem("darkMode") === "true") return true;
      const rt = document.documentElement.getAttribute("data-theme");
      return rt && rt.toLowerCase() === "dark";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (typeof document === "undefined") return;
    const body = document.body;
    const root = document.documentElement;

    const update = () => {
      const isDark =
        body.classList.contains("dark-mode") ||
        localStorage.getItem("darkMode") === "true" ||
        (root.getAttribute("data-theme") || "").toLowerCase() === "dark";
      setDarkMode(isDark);
    };

    // Observe body class & html data-theme changes
    const mo = new MutationObserver(update);
    mo.observe(body, { attributes: true, attributeFilter: ["class"] });
    mo.observe(root, { attributes: true, attributeFilter: ["data-theme", "class"] });

    // storage event (cross-tab)
    const onStorage = (e) => {
      if (e.key === "darkMode" || e.key === "tanyak_theme") update();
    };
    window.addEventListener("storage", onStorage);

    // custom events if your app emits them
    const handler = () => update();
    window.addEventListener("darkmode_changed", handler);
    window.addEventListener("tanyak_theme_changed", handler);

    update(); // initial sync

    return () => {
      mo.disconnect();
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("darkmode_changed", handler);
      window.removeEventListener("tanyak_theme_changed", handler);
    };
  }, []);

  // Products
  const hardwareProducts = products || [];

  // Derived filters
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(hardwareProducts.map((p) => p.category || "Uncategorized")))],
    [hardwareProducts]
  );
  const allColors = useMemo(() => [...new Set(hardwareProducts.flatMap((p) => p.colors || []))], [hardwareProducts]);
  const allSizes = useMemo(() => [...new Set(hardwareProducts.flatMap((p) => p.sizes || []))], [hardwareProducts]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filterColor, setFilterColor] = useState("");
  const [filterSize, setFilterSize] = useState("");
  const [filterAvailability, setFilterAvailability] = useState("");

  const [filteredProducts, setFilteredProducts] = useState(hardwareProducts);

  useEffect(() => {
    let res = [...hardwareProducts];
    if (selectedCategory !== "All") res = res.filter((p) => p.category === selectedCategory);
    if (filterColor)
      res = res.filter((p) =>
        (p.colors || []).map((c) => String(c).toLowerCase()).includes(String(filterColor).toLowerCase())
      );
    if (filterSize) res = res.filter((p) => (p.sizes || []).includes(filterSize));
    if (filterAvailability === "inStock") res = res.filter((p) => p.inStock);
    if (filterAvailability === "outOfStock") res = res.filter((p) => !p.inStock);
    setFilteredProducts(res);
  }, [selectedCategory, filterColor, filterSize, filterAvailability, hardwareProducts]);

  // wishlist persistence
  useEffect(() => {
    try {
      const raw = localStorage.getItem("tanyak_wishlist");
      if (raw) setLikedItems(JSON.parse(raw));
    } catch (err) {
      console.warn("wishlist load failed", err);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("tanyak_wishlist", JSON.stringify(likedItems));
      window.dispatchEvent(new CustomEvent("tanyak_wishlist_updated"));
    } catch (err) {
      console.warn("wishlist save failed", err);
    }
  }, [likedItems]);

  const toggleLike = (id) => {
    setLikedItems((prev) => {
      const next = { ...prev };
      if (next[id]) delete next[id];
      else next[id] = true;
      return next;
    });
  };

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setSelectedColor((product && product.colors && product.colors[0]) || "");
    setSelectedSize((product && product.sizes && product.sizes[0]) || "");
    setShowQuickView(true);
  };

  const handleCloseQuickView = () => {
    setShowQuickView(false);
    setSelectedProduct(null);
  };

  const handleWhatsAppInquiry = () => {
    if (!selectedProduct) return;
    const number = "919552633490";
    const message = `Hello, I'm interested in ${selectedProduct.name} (${selectedProduct.model || ""}) — Color: ${selectedColor || "N/A"}, Size: ${selectedSize || "N/A"}. Please share availability & pricing.`;
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setFilterColor("");
    setFilterSize("");
    setFilterAvailability("");
  };

  return (
    <>
    <div className={`collections-page ${darkMode ? "theme-dark" : "theme-light"}`}>
      <Container>
        <div className="collections-header">
          <h1>Hardware Collection</h1>
          <p>Discover premium hardware — pricing on request</p>
        </div>

        {/* Filters */}
        <div className="categories-filter">
          <div className="filter-header">
            <h3>Filters</h3>
            <div className="filter-controls">
              <button className="filter-toggle" onClick={handleResetFilters} title="Reset filters" style={{ marginLeft: 8 }}>
                Reset
              </button>

              <button
                className="filter-toggle"
                onClick={() => setShowFilters((s) => !s)}
                aria-pressed={showFilters}
                style={{ marginLeft: 8 }}
              >
                {showFilters ? "Hide Filters" : "Show Filters"}
              </button>
            </div>
          </div>

          <div className="category-buttons" role="tablist" aria-label="Product categories">
            {categories.map((c) => (
              <button key={c} className={`category-btn ${selectedCategory === c ? "active" : ""}`} onClick={() => setSelectedCategory(c)}>
                {c}
              </button>
            ))}
          </div>

          <div className={`advanced-filters ${showFilters ? "open" : ""}`}>
            <div className="advanced-row">
              <div className="advanced-col">
                <label>Color</label>
                <Form.Control as="select" value={filterColor} onChange={(e) => setFilterColor(e.target.value)}>
                  <option value="">All Colors</option>
                  {allColors.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Form.Control>
              </div>

              <div className="advanced-col">
                <label>Size</label>
                <Form.Control as="select" value={filterSize} onChange={(e) => setFilterSize(e.target.value)}>
                  <option value="">All Sizes</option>
                  {allSizes.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Form.Control>
              </div>

              <div className="advanced-col">
                <label>Availability</label>
                <Form.Control as="select" value={filterAvailability} onChange={(e) => setFilterAvailability(e.target.value)}>
                  <option value="">All</option>
                  <option value="inStock">In Stock</option>
                  <option value="outOfStock">Out of Stock</option>
                </Form.Control>
              </div>

              <div className="advanced-col actions-col">
                <button className="filter-toggle" onClick={() => setShowFilters((s) => !s)}>
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Product grid */}
        <Row className="products-grid">
          {filteredProducts.map((product) => (
            <Col key={product.id} lg={4} md={6} className="product-col">
              <div
                className="product-card"
                onMouseEnter={() => setHoveredItem(product.id)}
                onMouseLeave={() => {
                  setHoveredItem(null);
                  setHoveredAction(null);
                }}
                tabIndex={0}
                aria-label={`${product.name} ${product.model || ""}`}
              >
                <div className="product-image">
                  <img
                    src={hoveredItem === product.id ? product.hoverImage || product.image : product.image}
                    alt={`${product.name} ${product.model || ""}`}
                    loading="lazy"
                    onError={(e) => (e.target.src = "https://via.placeholder.com/400x300?text=No+Image")}
                  />

                  {!product.inStock && <div className="out-of-stock-badge">Out of Stock</div>}

                  <button
                    className={`like-btn ${likedItems[product.id] ? "liked" : ""}`}
                    onClick={() => toggleLike(product.id)}
                    aria-pressed={!!likedItems[product.id]}
                    title={likedItems[product.id] ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <FaHeart />
                  </button>

                  <div className="hover-actions">
                    <button
                      className="action-btn"
                      onMouseEnter={() => setHoveredAction(`view-${product.id}`)}
                      onMouseLeave={() => setHoveredAction(null)}
                      onClick={() => handleQuickView(product)}
                      aria-label="Quick view"
                    >
                      <FaEye />
                      {hoveredAction === `view-${product.id}` && (
                        <span className="action-tooltip">Quick View</span>
                      )}
                    </button>
                  </div>
                </div>

                <div className="product-info">
                  <h3 className="product-name">
                    {product.name} <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>({product.model || ""})</span>
                  </h3>
                  <p className="product-description">{product.description}</p>

                  <button className="read-more-btn" onClick={() => handleQuickView(product)}>
                    View Details <FaArrowRight />
                  </button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Quick View modal */}
      <Modal show={showQuickView} onHide={handleCloseQuickView} centered size="lg" dialogClassName="quick-view-dialog" className="quick-view-modal">
        <Modal.Header closeButton>
          <Modal.Title>{selectedProduct ? `${selectedProduct.name} (${selectedProduct.model || ""})` : ""}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="quick-view-body">
          {selectedProduct && (
            <div className="quick-view-content">
              <Row>
                <Col md={6}>
                  <div className="quick-view-image">
                    <img
                      src={selectedProduct.image}
                      alt={`${selectedProduct.name} ${selectedProduct.model || ""}`}
                      loading="lazy"
                      onError={(e) => (e.target.src = "https://via.placeholder.com/800x600?text=No+Image")}
                    />
                    {!selectedProduct.inStock && (
                      <div className="out-of-stock-overlay">
                        <span>Out of Stock</span>
                      </div>
                    )}
                  </div>
                </Col>

                <Col md={6}>
                  <div className="quick-view-details">
                    <div className="product-status" style={{ marginTop: 4 }}>
                      <Badge bg={selectedProduct.inStock ? "success" : "danger"}>{selectedProduct.inStock ? "In Stock" : "Out of Stock"}</Badge>
                    </div>

                    <div className="product-options" style={{ marginTop: 12 }}>
                      <Form.Group className="mb-3">
                        <Form.Label>Color</Form.Label>
                        <Form.Control as="select" value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
                          {(selectedProduct.colors || []).map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Size</Form.Label>
                        <Form.Control as="select" value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
                          {(selectedProduct.sizes || []).map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>
                    </div>

                    <div className="product-highlights">
                      <h4>Product Description</h4>
                      <p>{selectedProduct.fullDescription}</p>
                    </div>

                    <div className="quick-view-actions">
                      <button className="whatsapp-btn" onClick={handleWhatsAppInquiry}>
                        <FaWhatsapp /> Inquire on WhatsApp
                      </button>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
    <Footer />
    </>
  );
}
