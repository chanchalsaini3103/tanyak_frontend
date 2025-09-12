import React from "react";
import "../styles/NewArrivals.css";

const NewArrivals = () => {
  // Sample new arrival products
  const newArrivals = [
    {
      id: 1,
      name: "Laser-Cut Cabinet Handles",
    //   price: "₹1,299",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8aGFyZHdhcmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      badge: "New"
    },
    {
      id: 2,
      name: "Modern Drawer Pulls",
    //   price: "₹899",
      image: "https://images.unsplash.com/photo-1560448204-603b3fc33ddc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8aGFyZHdhcmV8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60",
      badge: "Trending"
    },
    {
      id: 3,
      name: "Black & Gold Hinges",
    //   price: "₹1,599",
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGhhcmR3YXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      badge: "Limited"
    },
    {
      id: 4,
      name: "Designer Door Knobs",
    //   price: "₹2,199",
      image: "https://images.unsplash.com/photo-1595425970377-2f8ded7c7b19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGhhcmR3YXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      badge: "Premium"
    },
    {
      id: 5,
      name: "Matte Black Latches",
    //   price: "₹1,099",
      image: "https://images.unsplash.com/photo-1600353068446-9b5ae7712c9f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fGhhcmR3YXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      badge: "New"
    },
    {
      id: 6,
      name: "Vintage Style Locks",
    //   price: "₹3,499",
      image: "https://images.unsplash.com/photo-1611238112651-2c13ef1f4c0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTl8fGhhcmR3YXJlfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
      badge: "Exclusive"
    }
  ];

  return (
    <section className="new-arrivals">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">New Arrivals</h2>
          <p className="section-subtitle">Discover our latest hardware collections</p>
        </div>
        
        <div className="arrivals-container">
          <div className="scrolling-track">
            <div className="scrolling-items">
              {newArrivals.map((product) => (
                <div key={product.id} className="arrival-card">
                  <div className="card-inner">
                    <div className="card-front">
                      <div className="product-badge">{product.badge}</div>
                      <div className="product-image">
                        <img src={product.image} alt={product.name} />
                      </div>
                      <div className="product-info">
                        <h3 className="product-name">{product.name}</h3>
                        {/* <p className="product-price">{product.price}</p> */}
                      </div>
                    </div>
                    <div className="card-back">
                      <h3>{product.name}</h3>
                      {/* <p className="product-price">{product.price}</p> */}
                      <button className="view-details-btn">View Details</button>
                      <button className="add-to-cart-btn">Add to Cart</button>
                    </div>
                  </div>
                </div>
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