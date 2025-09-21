import React, { useEffect, useState } from "react";
import { Container, Row, Col, Badge, Modal, Button } from "react-bootstrap";
import { FaHeart, FaTrash, FaEye } from "react-icons/fa";
import products from "../data/products";
import "../styles/Collections.css"; // reuse styles from collections (or create wishlist styles)
import Footer from "./Footer";

export default function Wishlist() {
  const [wishlistObj, setWishlistObj] = useState({});
  const [wishlistProducts, setWishlistProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showQuickView, setShowQuickView] = useState(false);

  // load wishlist from localStorage
  const loadWishlist = () => {
    try {
      const raw = localStorage.getItem("tanyak_wishlist");
      const obj = raw ? JSON.parse(raw) : {};
      setWishlistObj(obj);
      const ids = Object.keys(obj).map((k) => Number(k));
      const picks = products.filter((p) => ids.includes(p.id));
      setWishlistProducts(picks);
    } catch (err) {
      console.warn("Failed to load wishlist", err);
      setWishlistObj({});
      setWishlistProducts([]);
    }
  };

  useEffect(() => {
    loadWishlist();

    // Listen for external updates (so Navbar and other components can update)
    const onCustom = () => loadWishlist();
    const onStorage = (e) => {
      if (e.key === "tanyak_wishlist") loadWishlist();
    };

    window.addEventListener("tanyak_wishlist_updated", onCustom);
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("tanyak_wishlist_updated", onCustom);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const removeFromWishlist = (id) => {
    try {
      const raw = localStorage.getItem("tanyak_wishlist");
      const obj = raw ? JSON.parse(raw) : {};
      if (obj[id]) {
        delete obj[id];
        localStorage.setItem("tanyak_wishlist", JSON.stringify(obj));
        // notify other parts of the app
        window.dispatchEvent(new CustomEvent("tanyak_wishlist_updated"));
        // also update this component's state
        loadWishlist();
      }
    } catch (err) {
      console.warn("Failed to remove from wishlist", err);
    }
  };

  const openQuickView = (product) => {
    setSelectedProduct(product);
    setShowQuickView(true);
  };

  const closeQuickView = () => {
    setSelectedProduct(null);
    setShowQuickView(false);
  };

  return (
    <>
      <div className="wishlist-page">
        <Container>
          <div className="collections-header">
            <h1>My Wishlist</h1>
            <p>Products you've saved — enquire or remove any time.</p>
          </div>

          {wishlistProducts.length === 0 ? (
            <div className="empty-wishlist" style={{ padding: "4rem 0", textAlign: "center" }}>
              <h4>Your wishlist is empty</h4>
              <p>Browse products and tap the heart to save items here.</p>
            </div>
          ) : (
            <Row className="products-grid gx-3 gy-4">
              {wishlistProducts.map((product) => (
                <Col key={product.id} xs={6} sm={6} md={6} lg={4} className="product-col">
                  <div className="product-card" tabIndex={0} aria-label={`${product.name} ${product.model || ""}`}>
                    <div className="product-image">
                      <img
                        src={product.image}
                        alt={`${product.name} ${product.model || ""}`}
                        loading="lazy"
                        onError={(e) => (e.target.src = "https://via.placeholder.com/400x300?text=No+Image")}
                      />
                      {!product.inStock && <div className="out-of-stock-badge">Out of Stock</div>}

                      <button
                        className={`like-btn liked`}
                        onClick={() => removeFromWishlist(product.id)}
                        aria-pressed={false}
                        title="Remove from wishlist"
                        type="button"
                      >
                        <FaTrash />
                      </button>

                      <div className="hover-actions">
                        <button
                          className="action-btn"
                          onClick={() => openQuickView(product)}
                          aria-label="Quick view"
                          type="button"
                        >
                          <FaEye />
                        </button>
                      </div>
                    </div>

                    <div className="product-info">
                      <h3 className="product-name">
                        {product.name} <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>({product.model || ""})</span>
                      </h3>

                      <p className="product-description">{product.description}</p>

                      <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 8 }}>
                        <Badge bg={product.inStock ? "success" : "danger"}>{product.inStock ? "In Stock" : "Out of Stock"}</Badge>
                        <Button variant="outline-secondary" size="sm" onClick={() => removeFromWishlist(product.id)}>
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          )}
        </Container>

        {/* Quick View modal (reuse same pattern as Collections) */}
        <Modal show={showQuickView} onHide={closeQuickView} centered size="lg" dialogClassName="quick-view-dialog">
          <Modal.Header closeButton>
            <Modal.Title>{selectedProduct ? `${selectedProduct.name} (${selectedProduct.model || ""})` : ""}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedProduct && (
              <div className="quick-view-content">
                <Row>
                  <Col md={6}>
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      style={{ width: "100%", height: "auto" }}
                      onError={(e) => (e.target.src = "https://via.placeholder.com/800x600?text=No+Image")}
                    />
                  </Col>
                  <Col md={6}>
                    <h5>{selectedProduct.name}</h5>
                    <p>{selectedProduct.fullDescription || selectedProduct.description}</p>
                    <div style={{ marginTop: 12 }}>
                      <Badge bg={selectedProduct.inStock ? "success" : "danger"}>
                        {selectedProduct.inStock ? "In Stock" : "Out of Stock"}
                      </Badge>
                    </div>
                  </Col>
                </Row>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeQuickView}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>

      <Footer />
    </>
  );
}
