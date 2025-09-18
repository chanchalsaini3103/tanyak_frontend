import React, { useState, useEffect, useMemo } from "react";
import { Container, Row, Col, Modal, Form, Badge } from "react-bootstrap";
import {
  FaHeart,
  FaEye,
  FaArrowRight,
  FaWhatsapp,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import products from "../data/products"; // <-- import the products data module
import "../styles/Collections.css";

export default function HardwareCollections() {
  const [likedItems, setLikedItems] = useState({});
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoveredAction, setHoveredAction] = useState(null);
  const [showQuickView, setShowQuickView] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // theme state: "light" | "dark"
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem("tanyak_theme") || "light";
    } catch {
      return "light";
    }
  });

  // Use products imported from data module
  const hardwareProducts = products;

  // derived lists for filters (memoized)
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(hardwareProducts.map((p) => p.category)))],
    [hardwareProducts]
  );
  const allColors = useMemo(
    () => [...new Set(hardwareProducts.flatMap((p) => p.colors || []))],
    [hardwareProducts]
  );
  const allSizes = useMemo(
    () => [...new Set(hardwareProducts.flatMap((p) => p.sizes || []))],
    [hardwareProducts]
  );

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [filterColor, setFilterColor] = useState("");
  const [filterSize, setFilterSize] = useState("");
  const [filterAvailability, setFilterAvailability] = useState("");

  const [filteredProducts, setFilteredProducts] = useState(hardwareProducts);

  useEffect(() => {
    // apply filters
    let res = [...hardwareProducts];
    if (selectedCategory !== "All") res = res.filter((p) => p.category === selectedCategory);
    if (filterColor)
      res = res.filter((p) =>
        (p.colors || []).map((c) => c.toLowerCase()).includes(filterColor.toLowerCase())
      );
    if (filterSize) res = res.filter((p) => (p.sizes || []).includes(filterSize));
    if (filterAvailability === "inStock") res = res.filter((p) => p.inStock);
    if (filterAvailability === "outOfStock") res = res.filter((p) => !p.inStock);
    setFilteredProducts(res);
  }, [selectedCategory, filterColor, filterSize, filterAvailability, hardwareProducts]);

  // wishlist persisted in localStorage
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

  // apply theme to root + body class and persist
  useEffect(() => {
    try {
      document.documentElement.setAttribute("data-theme", theme);
      if (theme === "dark") {
        document.body.classList.add("theme-dark");
      } else {
        document.body.classList.remove("theme-dark");
      }
      localStorage.setItem("tanyak_theme", theme);
    } catch (err) {
      console.warn("theme apply failed", err);
    }
  }, [theme]);

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
    setSelectedColor(product?.colors?.[0] || "");
    setSelectedSize(product?.sizes?.[0] || "");
    setShowQuickView(true);
  };

  const handleCloseQuickView = () => {
    setShowQuickView(false);
    setSelectedProduct(null);
  };

  const handleWhatsAppInquiry = () => {
    if (!selectedProduct) return;
    const number = "919552633490";
    const message = `Hello, I'm interested in ${selectedProduct.name}, ${selectedProduct.model} (Color: ${selectedColor || "N/A"}, Size: ${selectedSize || "N/A"}). Please share availability & pricing.`;
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handleResetFilters = () => {
    setSelectedCategory("All");
    setFilterColor("");
    setFilterSize("");
    setFilterAvailability("");
  };

  return (
    <div className="collections-page">
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
              {/* Theme toggle */}
              <button
                className="filter-toggle theme-toggle"
                onClick={() => setTheme((t) => (t === "light" ? "dark" : "light"))}
                aria-pressed={theme === "dark"}
                title="Toggle theme"
              >
                {theme === "dark" ? <FaSun /> : <FaMoon />}
                <span className="sr-only">Toggle theme</span>
              </button>

              <button
                className="filter-toggle"
                onClick={handleResetFilters}
                title="Reset filters"
                style={{ marginLeft: 8 }}
              >
                Reset
              </button>

              {/* main show/hide filter toggle (always visible) */}
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
              <button
                key={c}
                className={`category-btn ${selectedCategory === c ? "active" : ""}`}
                onClick={() => setSelectedCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>

          {/* advanced filters (collapsible) */}
          <div className={`advanced-filters ${showFilters ? "open" : ""}`}>
            <div className="advanced-row">
              <div className="advanced-col">
                <label>Color</label>
                <Form.Control
                  as="select"
                  value={filterColor}
                  onChange={(e) => setFilterColor(e.target.value)}
                >
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
                <Form.Control
                  as="select"
                  value={filterSize}
                  onChange={(e) => setFilterSize(e.target.value)}
                >
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
                <Form.Control
                  as="select"
                  value={filterAvailability}
                  onChange={(e) => setFilterAvailability(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="inStock">In Stock</option>
                  <option value="outOfStock">Out of Stock</option>
                </Form.Control>
              </div>

              <div className="advanced-col actions-col">
                {/* in-panel toggle (optional) */}
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
                aria-label={`${product.name} ${product.model}`}
              >
                <div className="product-image">
                  <img
                    src={hoveredItem === product.id ? product.hoverImage || product.image : product.image}
                    alt={`${product.name} ${product.model}`}
                    loading="lazy"
                    onError={(e) => (e.target.src = "https://via.placeholder.com/400x300?text=No+Image")}
                  />

                  {!product.inStock && <div className="out-of-stock-badge">Out of Stock</div>}

                  {/* Heart like button */}
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
                    {product.name} <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>({product.model})</span>
                  </h3>
                  <p className="product-description">{product.description}</p>

                  <div style={{ height: 8 }} />

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
      <Modal
        show={showQuickView}
        onHide={handleCloseQuickView}
        centered
        size="lg"
        dialogClassName="quick-view-dialog"
        className="quick-view-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedProduct ? `${selectedProduct.name} (${selectedProduct.model})` : ""}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body className="quick-view-body">
          {selectedProduct && (
            <div className="quick-view-content">
              <Row>
                <Col md={6}>
                  <div className="quick-view-image">
                    <img
                      src={selectedProduct.image}
                      alt={`${selectedProduct.name} ${selectedProduct.model}`}
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
                      <Badge bg={selectedProduct.inStock ? "success" : "danger"}>
                        {selectedProduct.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </div>

                    <div className="product-options" style={{ marginTop: 12 }}>
                      <Form.Group className="mb-3">
                        <Form.Label>Color</Form.Label>
                        <Form.Control
                          as="select"
                          value={selectedColor}
                          onChange={(e) => setSelectedColor(e.target.value)}
                        >
                          {(selectedProduct.colors || []).map((c) => (
                            <option key={c} value={c}>
                              {c}
                            </option>
                          ))}
                        </Form.Control>
                      </Form.Group>

                      <Form.Group className="mb-3">
                        <Form.Label>Size</Form.Label>
                        <Form.Control
                          as="select"
                          value={selectedSize}
                          onChange={(e) => setSelectedSize(e.target.value)}
                        >
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
  );
}
