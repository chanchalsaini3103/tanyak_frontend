import React, { useState, useEffect } from 'react';
import '../styles/Gallery.css';
import Footer from './Footer';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [activeShop, setActiveShop] = useState(0);

  useEffect(() => {
    // Set loaded to true after component mounts to trigger animations
    setLoaded(true);
    
    // Auto-rotate shop gallery
    const shopInterval = setInterval(() => {
      setActiveShop(prev => (prev + 1) % shopGalleries.length);
    }, 5000);
    
    return () => clearInterval(shopInterval);
  }, []);

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: 'decor', name: 'Home Decor' },
    { id: 'furniture', name: 'Furniture' },
    { id: 'lighting', name: 'Lighting' },
    { id: 'textiles', name: 'Textiles' }
  ];

  const products = [
    {
      id: 1,
      title: 'Elegant Wall Art',
      category: 'decor',
      description: 'Handcrafted metal wall art with intricate patterns',
      price: '$129.99',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      title: 'Modern Coffee Table',
      category: 'furniture',
      description: 'Sleek design with natural wood and metal accents',
      price: '$349.99',
      image: 'https://images.unsplash.com/photo-1533090368676-1fd25485db88?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      title: 'Artisan Pendant Light',
      category: 'lighting',
      description: 'Hand-blown glass pendant light with brass fittings',
      price: '$199.99',
      image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 4,
      title: 'Luxury Throw Pillows',
      category: 'textiles',
      description: 'Premium velvet pillows with decorative patterns',
      price: '$49.99',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 5,
      title: 'Decorative Vase Set',
      category: 'decor',
      description: 'Ceramic vases with modern geometric design',
      price: '$89.99',
      image: 'https://images.unsplash.com/photo-1574359173084-bfcee66c2c2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 6,
      title: 'Accent Chair',
      category: 'furniture',
      description: 'Comfortable reading chair with wooden frame',
      price: '$279.99',
      image: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 7,
      title: 'Table Lamp',
      category: 'lighting',
      description: 'Minimalist table lamp with marble base',
      price: '$119.99',
      image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 8,
      title: 'Embroidered Curtains',
      category: 'textiles',
      description: 'Sheer curtains with delicate embroidery',
      price: '$159.99',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 9,
      title: 'Sculptural Centerpiece',
      category: 'decor',
      description: 'Abstract sculpture for tabletop display',
      price: '$79.99',
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

  const shopGalleries = [
    {
      id: 1,
      name: "Downtown Showroom",
      location: "123 Design District, New York",
      image: "https://images.unsplash.com/photo-1493663284031-b7e3aaa4c4b8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Our flagship store featuring the complete Tanyat collection"
    },
    {
      id: 2,
      name: "Lifestyle Boutique",
      location: "456 Fashion Ave, Los Angeles",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "A curated selection of our most popular home accessories"
    },
    {
      id: 3,
      name: "Concept Space",
      location: "789 Innovation Road, Chicago",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      description: "Experience our products in fully designed room settings"
    }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const openModal = (index) => {
    setCurrentImage(index);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  const navigateImage = (direction) => {
    let newIndex;
    if (direction === 'next') {
      newIndex = (currentImage + 1) % filteredProducts.length;
    } else {
      newIndex = (currentImage - 1 + filteredProducts.length) % filteredProducts.length;
    }
    setCurrentImage(newIndex);
  };

  return (
    <>
    <section className={`gallery-section ${loaded ? 'loaded' : ''}`}>
      {/* Decorative elements */}
      <div className="decorative-circle circle-1"></div>
      <div className="decorative-circle circle-2"></div>
      <div className="decorative-circle circle-3"></div>
      
      <div className="gallery-container">
        <div className="section-header">
          <h2 className="gallery-title">Our Collection</h2>
          <div className="title-underline"></div>
          <p className="gallery-subtitle">Discover beautifully crafted home decor pieces that transform your space</p>
        </div>
        
        {/* Category Filters */}
        <div className="category-filters">
          {categories.map(category => (
            <button
              key={category.id}
              className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="btn-icon">+</span>
              {category.name}
            </button>
          ))}
        </div>
        
        {/* Gallery Grid */}
        <div className="gallery-grid">
          {filteredProducts.map((product, index) => (
            <div 
              key={product.id} 
              className="gallery-item"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => openModal(index)}
            >
              <div className="image-container">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="product-image"
                />
                <div className="product-badge">New</div>
                <div className="image-overlay">
                  <div className="overlay-content">
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                    <div className="product-price">{product.price}</div>
                    <button className="view-details-btn">View Details</button>
                  </div>
                </div>
              </div>
              <div className="product-info">
                <h4>{product.title}</h4>
                <span className="product-category">{product.category}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Shop Gallery Section */}
        <div className="shop-gallery-section">
          <div className="section-header">
            <h2 className="gallery-title">Our Stores</h2>
            <div className="title-underline"></div>
            <p className="gallery-subtitle">Visit our beautifully designed showrooms</p>
          </div>
          
          <div className="shop-gallery">
            {shopGalleries.map((shop, index) => (
              <div 
                key={shop.id} 
                className={`shop-item ${index === activeShop ? 'active' : ''}`}
                onMouseEnter={() => setActiveShop(index)}
              >
                <div className="shop-image-container">
                  <img src={shop.image} alt={shop.name} />
                  <div className="shop-overlay">
                    <h3>{shop.name}</h3>
                    <p>{shop.location}</p>
                    <button className="shop-visit-btn">Visit Store</button>
                  </div>
                </div>
                <div className="shop-info">
                  <h4>{shop.name}</h4>
                  <p>{shop.description}</p>
                </div>
              </div>
            ))}
            
            <div className="shop-nav-dots">
              {shopGalleries.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === activeShop ? 'active' : ''}`}
                  onClick={() => setActiveShop(index)}
                ></button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="gallery-cta">
          <h3>Can't Find What You're Looking For?</h3>
          <p>We offer custom design services to create unique pieces for your home</p>
          <button className="cta-button">Request Custom Design</button>
        </div>
        
        {/* Modal for enlarged view */}
        {isModalOpen && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-modal" onClick={closeModal}>×</button>
              <div className="modal-image-container">
                <img 
                  src={filteredProducts[currentImage].image} 
                  alt={filteredProducts[currentImage].title}
                  className="modal-image"
                />
                <button className="nav-btn prev" onClick={() => navigateImage('prev')}>‹</button>
                <button className="nav-btn next" onClick={() => navigateImage('next')}>›</button>
              </div>
              <div className="modal-details">
                <h2>{filteredProducts[currentImage].title}</h2>
                <p className="modal-category">{filteredProducts[currentImage].category}</p>
                <p className="modal-description">{filteredProducts[currentImage].description}</p>
                <div className="modal-price">{filteredProducts[currentImage].price}</div>
                <div className="modal-actions">
                  <button className="cta-button">Add to Cart</button>
                  <button className="secondary-button">Save to Wishlist</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
    <Footer />
    </>
  );
};

export default Gallery;