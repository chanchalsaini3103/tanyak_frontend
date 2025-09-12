import React, { useState } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import { FaHeart, FaEye, FaShoppingCart, FaArrowRight, FaTimes } from "react-icons/fa";
import "../styles/Collections.css";

export default function HardwareCollections() {
  const [likedItems, setLikedItems] = useState({});
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoveredAction, setHoveredAction] = useState(null);
  const [showQuickView, setShowQuickView] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Sample hardware products data
  const hardwareProducts = [
    {
      id: 1,
      name: "Premium Hammer Drill",
      price: "₹4,599",
      originalPrice: "₹5,999",
      discount: "23% off",
      image: "https://tse2.mm.bing.net/th/id/OIP.A90S4dJrjdjtrQsaIyTXdQHaFq?pid=Api&P=0&h=220",
      hoverImage: "https://i.pinimg.com/736x/b1/88/3f/b1883f683d08c46c25f27cc3ef3013b5.jpg",
      description: "Powerful hammer drill with variable speed control and multiple torque settings.",
      fullDescription: "Our Premium Hammer Drill is designed for professionals and DIY enthusiasts alike. With its powerful motor and variable speed control, you can tackle any drilling task with ease. The ergonomic design ensures comfortable use even during extended projects."
    },
    {
      id: 2,
      name: "Professional Tool Kit",
      price: "₹8,999",
      originalPrice: "₹11,499",
      discount: "22% off",
      image: "https://d2ma7w4w9grdob.cloudfront.net/media/52507Handmade-Nickel-Brushed-Contemporary-Design-Square-Mortise-Door-Lock-Handle-Set-NBR-16-S-(1).JPG",
      hoverImage: "https://d2ma7w4w9grdob.cloudfront.net/media/52521Handmade-Satin-Brown-Brass-Square-Mortise-Door-Lock-Handle-Set-NBR-16-A-(1).JPG",
      description: "135-piece professional tool set with durable case and lifetime warranty.",
      fullDescription: "This comprehensive 135-piece tool kit has everything you need for home repairs, automotive work, and construction projects. The durable case keeps your tools organized and protected. All tools come with a lifetime warranty for your peace of mind."
    },
    {
      id: 3,
      name: "Cordless Power Screwdriver",
      price: "₹2,299",
      originalPrice: "₹2,999",
      discount: "23% off",
      image: "https://tse2.mm.bing.net/th/id/OIP.A90S4dJrjdjtrQsaIyTXdQHaFq?pid=Api&P=0&h=220",
      hoverImage: "https://i.pinimg.com/736x/b1/88/3f/b1883f683d08c46c25f27cc3ef3013b5.jpg",
      description: "Lightweight cordless screwdriver with magnetic bit holder and LED light.",
      fullDescription: "This cordless power screwdriver is perfect for all your assembly and repair needs. Features a magnetic bit holder, built-in LED light for dark spaces, and a comfortable grip for extended use. The rechargeable battery provides hours of continuous operation."
    },
    {
      id: 4,
      name: "Heavy Duty Wrench Set",
      price: "₹3,499",
      originalPrice: "₹4,299",
      discount: "19% off",
      image: "https://d2ma7w4w9grdob.cloudfront.net/media/52507Handmade-Nickel-Brushed-Contemporary-Design-Square-Mortise-Door-Lock-Handle-Set-NBR-16-S-(1).JPG",
      hoverImage: "https://d2ma7w4w9grdob.cloudfront.net/media/52521Handmade-Satin-Brown-Brass-Square-Mortise-Door-Lock-Handle-Set-NBR-16-A-(1).JPG",
      description: "12-piece chrome vanadium wrench set with polished finish and comfortable grip.",
      fullDescription: "This professional-grade wrench set is made from chrome vanadium steel for exceptional durability and corrosion resistance. The polished finish not only looks great but also makes cleaning easier. Each wrench features a comfortable, non-slip grip for maximum torque application."
    },
    {
      id: 5,
      name: "Digital Angle Finder",
      price: "₹1,899",
      originalPrice: "₹2,499",
      discount: "24% off",
      image: "https://tse2.mm.bing.net/th/id/OIP.A90S4dJrjdjtrQsaIyTXdQHaFq?pid=Api&P=0&h=220",
      hoverImage: "https://i.pinimg.com/736x/b1/88/3f/b1883f683d08c46c25f27cc3ef3013b5.jpg",
      description: "Digital angle finder with LCD display and magnetic base for precise measurements.",
      fullDescription: "Achieve perfect angles every time with our digital angle finder. Features a large LCD display for easy reading, magnetic base for hands-free operation, and the ability to measure both inside and outside angles. Perfect for woodworking, metalworking, and construction projects."
    },
    {
      id: 6,
      name: "Professional Socket Set",
      price: "₹5,799",
      originalPrice: "₹7,299",
      discount: "21% off",
      image: "https://d2ma7w4w9grdob.cloudfront.net/media/52507Handmade-Nickel-Brushed-Contemporary-Design-Square-Mortise-Door-Lock-Handle-Set-NBR-16-S-(1).JPG",
      hoverImage: "https://d2ma7w4w9grdob.cloudfront.net/media/52521Handmade-Satin-Brown-Brass-Square-Mortise-Door-Lock-Handle-Set-NBR-16-A-(1).JPG",
      description: "65-piece socket set with ratchet handle and extension bars in a sturdy case.",
      fullDescription: "This comprehensive 65-piece socket set includes everything you need for automotive repairs, equipment maintenance, and DIY projects. The set features a durable ratchet handle, multiple extension bars, and both standard and deep well sockets in the most common sizes. The sturdy case keeps everything organized and portable."
    },
    {
      id: 7,
      name: "Laser Distance Measurer",
      price: "₹3,999",
      originalPrice: "₹4,999",
      discount: "20% off",
      image: "https://tse2.mm.bing.net/th/id/OIP.A90S4dJrjdjtrQsaIyTXdQHaFq?pid=Api&P=0&h=220",
      hoverImage: "https://i.pinimg.com/736x/b1/88/3f/b1883f683d08c46c25f27cc3ef3013b5.jpg",
      description: "Laser distance measurer with 50m range and area calculation功能.",
      fullDescription: "Make precise measurements quickly and easily with our laser distance measurer. With a range of up to 50 meters, this tool can calculate distance, area, and volume with the push of a button. The backlit display ensures visibility in all lighting conditions, and the pocket-sized design makes it easy to carry anywhere."
    },
    {
      id: 8,
      name: "Adjustable Wrench",
      price: "₹899",
      originalPrice: "₹1,199",
      discount: "25% off",
      image: "https://d2ma7w4w9grdob.cloudfront.net/media/52507Handmade-Nickel-Brushed-Contemporary-Design-Square-Mortise-Door-Lock-Handle-Set-NBR-16-S-(1).JPG",
      hoverImage: "https://d2ma7w4w9grdob.cloudfront.net/media/52521Handmade-Satin-Brown-Brass-Square-Mortise-Door-Lock-Handle-Set-NBR-16-A-(1).JPG",
      description: "8-inch adjustable wrench with smooth jaw adjustment and comfortable handle.",
      fullDescription: "This 8-inch adjustable wrench is a must-have for any toolbox. The smooth jaw adjustment allows for quick sizing to fit various nuts and bolts, while the comfortable, non-slip handle provides a secure grip even in oily conditions. Made from drop-forged steel for maximum strength and durability."
    },
    {
      id: 9,
      name: "How Do I Disable The Auto Correct Function On My Wife Fridge Magnet",
      price: "₹35.00",
      originalPrice: "₹45.00",
      discount: "22% off",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZnJpZGdlJTIwbWFnbmV0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      hoverImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8ZnJpZGdlJTIwbWFnbmV0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      description: "A whimsical accessory that shows the 'How Do I Disable The Auto Correct Function On My Wife'.",
      fullDescription: "Introducing: Our FULLKART 'How Do I Disable The Auto Correct Function On My Wife' Fridge Magnet – a whimsical accessory that shows the 'How Do I Disable The Auto Correct Function On My Wife'. Measuring a compact 4.5 by 3 inches, this magnet is not just a functional item; it's a statement for auto-correct function on wife. Crafted for enthusiasts of the animated charm and infectious joy of 'How Do I Disable'."
    }
  ];

  const toggleLike = (id) => {
    setLikedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setShowQuickView(true);
  };

  const handleCloseQuickView = () => {
    setShowQuickView(false);
    setSelectedProduct(null);
  };

  const handleReadMore = (product) => {
    // This would typically navigate to a product detail page
    // For now, we'll just show the quick view modal
    handleQuickView(product);
  };

  return (
    <div className="collections-page">
      <Container>
        {/* Page Header */}
        <div className="collections-header">
          <h1>Hardware Collection</h1>
          <p>Discover our premium hardware tools and equipment</p>
        </div>

        {/* Products Grid */}
        <Row className="products-grid">
          {hardwareProducts.map(product => (
            <Col key={product.id} lg={3} md={6} className="product-col">
              <div 
                className="product-card"
                onMouseEnter={() => setHoveredItem(product.id)}
                onMouseLeave={() => {
                  setHoveredItem(null);
                  setHoveredAction(null);
                }}
              >
                {/* Product Image with Like Button */}
                <div className="product-image">
                  <img 
                    src={hoveredItem === product.id ? product.hoverImage : product.image} 
                    alt={product.name}
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/300x300?text=Image+Not+Found";
                    }}
                  />
                  
                  {/* Like Button */}
                  <button 
                    className={`like-btn ${likedItems[product.id] ? 'liked' : ''}`}
                    onClick={() => toggleLike(product.id)}
                  >
                    <FaHeart />
                  </button>
                  
                  {/* Hover Actions */}
                  <div className="hover-actions">
                    <button 
                      className="action-btn"
                      onMouseEnter={() => setHoveredAction(`view-${product.id}`)}
                      onMouseLeave={() => setHoveredAction(null)}
                      onClick={() => handleQuickView(product)}
                    >
                      <FaEye />
                      {hoveredAction === `view-${product.id}` && <span className="action-tooltip">Quick View</span>}
                    </button>
                    <button 
                      className="action-btn"
                      onMouseEnter={() => setHoveredAction(`cart-${product.id}`)}
                      onMouseLeave={() => setHoveredAction(null)}
                    >
                      <FaShoppingCart />
                      {hoveredAction === `cart-${product.id}` && <span className="action-tooltip">Add to Cart</span>}
                    </button>
                  </div>
                </div>
                
                {/* Product Info - Only Read More Button */}
                <div className="product-info-simple">
                  <button className="read-more-btn" onClick={() => handleReadMore(product)}>
                    Read More <FaArrowRight />
                  </button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Quick View Modal */}
      <Modal show={showQuickView} onHide={handleCloseQuickView} centered size="lg" className="quick-view-modal">
        <Modal.Header closeButton>
          <Modal.Title>{selectedProduct?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <div className="quick-view-content">
              <Row>
                <Col md={6}>
                  <div className="quick-view-image">
                    <img src={selectedProduct.image} alt={selectedProduct.name} />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="quick-view-details">
                    <div className="product-price">
                      <span className="current-price">{selectedProduct.price}</span>
                      <span className="original-price">{selectedProduct.originalPrice}</span>
                      <span className="discount">{selectedProduct.discount}</span>
                    </div>
                    
                    <div className="product-highlights">
                      <h4>Product Highlights</h4>
                      <p>{selectedProduct.fullDescription}</p>
                    </div>
                    
                    <div className="quick-view-actions">
                      <button className="add-to-cart-btn">
                        <FaShoppingCart /> Add to Cart
                      </button>
                      <button className="wishlist-btn">
                        <FaHeart /> Add to Wishlist
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