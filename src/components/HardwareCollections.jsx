import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaHeart, FaEye, FaShoppingCart, FaArrowRight } from "react-icons/fa";
import "../styles/Collections.css";

export default function HardwareCollections() {
  const [likedItems, setLikedItems] = useState({});
  const [hoveredItem, setHoveredItem] = useState(null);
  const [hoveredAction, setHoveredAction] = useState(null);

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
      description: "Powerful hammer drill with variable speed control and multiple torque settings."
    },
    {
      id: 2,
      name: "Professional Tool Kit",
      price: "₹8,999",
      originalPrice: "₹11,499",
      discount: "22% off",
      image: "https://d2ma7w4w9grdob.cloudfront.net/media/52507Handmade-Nickel-Brushed-Contemporary-Design-Square-Mortise-Door-Lock-Handle-Set-NBR-16-S-(1).JPG",
      hoverImage: "https://d2ma7w4w9grdob.cloudfront.net/media/52521Handmade-Satin-Brown-Brass-Square-Mortise-Door-Lock-Handle-Set-NBR-16-A-(1).JPG",
      description: "135-piece professional tool set with durable case and lifetime warranty."
    },
    {
      id: 3,
      name: "Cordless Power Screwdriver",
      price: "₹2,299",
      originalPrice: "₹2,999",
      discount: "23% off",
      image: "https://tse2.mm.bing.net/th/id/OIP.A90S4dJrjdjtrQsaIyTXdQHaFq?pid=Api&P=0&h=220",
      hoverImage: "https://i.pinimg.com/736x/b1/88/3f/b1883f683d08c46c25f27cc3ef3013b5.jpg",
        description: "Lightweight cordless screwdriver with magnetic bit holder and LED light."
    },
    {
      id: 4,
      name: "Heavy Duty Wrench Set",
      price: "₹3,499",
      originalPrice: "₹4,299",
      discount: "19% off",
      image: "https://d2ma7w4w9grdob.cloudfront.net/media/52507Handmade-Nickel-Brushed-Contemporary-Design-Square-Mortise-Door-Lock-Handle-Set-NBR-16-S-(1).JPG",
      hoverImage: "https://d2ma7w4w9grdob.cloudfront.net/media/52521Handmade-Satin-Brown-Brass-Square-Mortise-Door-Lock-Handle-Set-NBR-16-A-(1).JPG",
       description: "12-piece chrome vanadium wrench set with polished finish and comfortable grip."
    },
    {
      id: 5,
      name: "Digital Angle Finder",
      price: "₹1,899",
      originalPrice: "₹2,499",
      discount: "24% off",
      image: "https://tse2.mm.bing.net/th/id/OIP.A90S4dJrjdjtrQsaIyTXdQHaFq?pid=Api&P=0&h=220",
      hoverImage: "https://i.pinimg.com/736x/b1/88/3f/b1883f683d08c46c25f27cc3ef3013b5.jpg",
       description: "Digital angle finder with LCD display and magnetic base for precise measurements."
    },
    {
      id: 6,
      name: "Professional Socket Set",
      price: "₹5,799",
      originalPrice: "₹7,299",
      discount: "21% off",
      image: "https://d2ma7w4w9grdob.cloudfront.net/media/52507Handmade-Nickel-Brushed-Contemporary-Design-Square-Mortise-Door-Lock-Handle-Set-NBR-16-S-(1).JPG",
      hoverImage: "https://d2ma7w4w9grdob.cloudfront.net/media/52521Handmade-Satin-Brown-Brass-Square-Mortise-Door-Lock-Handle-Set-NBR-16-A-(1).JPG",
       description: "65-piece socket set with ratchet handle and extension bars in a sturdy case."
    },
    {
      id: 7,
      name: "Laser Distance Measurer",
      price: "₹3,999",
      originalPrice: "₹4,999",
      discount: "20% off",
      image: "https://tse2.mm.bing.net/th/id/OIP.A90S4dJrjdjtrQsaIyTXdQHaFq?pid=Api&P=0&h=220",
      hoverImage: "https://i.pinimg.com/736x/b1/88/3f/b1883f683d08c46c25f27cc3ef3013b5.jpg",
      description: "Laser distance measurer with 50m range and area calculation功能."
    },
    {
      id: 8,
      name: "Adjustable Wrench",
      price: "₹899",
      originalPrice: "₹1,199",
      discount: "25% off",
       image: "https://d2ma7w4w9grdob.cloudfront.net/media/52507Handmade-Nickel-Brushed-Contemporary-Design-Square-Mortise-Door-Lock-Handle-Set-NBR-16-S-(1).JPG",
      hoverImage: "https://d2ma7w4w9grdob.cloudfront.net/media/52521Handmade-Satin-Brown-Brass-Square-Mortise-Door-Lock-Handle-Set-NBR-16-A-(1).JPG",
       description: "8-inch adjustable wrench with smooth jaw adjustment and comfortable handle."
    }
  ];

  const toggleLike = (id) => {
    setLikedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
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
                
                {/* Product Info */}
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  
                  <div className="product-price">
                    <span className="current-price">{product.price}</span>
                    <span className="original-price">{product.originalPrice}</span>
                    <span className="discount">{product.discount}</span>
                  </div>
                  
                  <p className="product-desc">{product.description}</p>
                  
                  <button className="read-more-btn">
                    Read More <FaArrowRight />
                  </button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}