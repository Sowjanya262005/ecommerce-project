import './Home.css';

const Home = ({ products, onAddToCart, wishlistItems = [], toggleWishlist }) => {
  return (
    <>
      <section className="hero">
        <div className="hero-content animate-fade-in">
          <h1 className="hero-title">
            Experience Sound <br/>
            Like Never Before.
          </h1>
          <p className="hero-subtitle">
            Immerse yourself in high-fidelity audio with the latest generation of premium noise-canceling headphones. Available now.
          </p>
          <div className="hero-actions">
            <button 
              className="btn btn-primary" 
              onClick={() => document.getElementById('products').scrollIntoView({ behavior: 'smooth' })}
            >
              Shop Now
            </button>
            <button 
              className="btn btn-outline"
              onClick={() => alert('Experience high-fidelity audio and premium tech. Our curated collection offers the best gadgets on the market.')}
            >
              Learn More
            </button>
          </div>
        </div>
        <div className="hero-image-wrapper animate-fade-in">
          <img src="/hero_headphone.png" alt="Premium Headphone" />
        </div>
      </section>

      <section id="products" className="products-section">
        <div className="section-header">
          <h2 className="section-title">Trending <span className="text-gradient">Products</span></h2>
        </div>
        
        <div className="products-grid">
          {products.map(product => {
            const isWishlisted = wishlistItems.some(item => item.id === product.id);
            return (
              <div key={product.id} className="product-card glass-panel">
                <button 
                  className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product);
                  }}
                  aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={isWishlisted ? "#ff4757" : "none"} stroke={isWishlisted ? "#ff4757" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
                <div className="product-image-container">
                  <img src={product.imageUrl} alt={product.name} />
                </div>
                <div className="product-category">{product.category}</div>
                <h3 className="product-title">{product.name}</h3>
                <div className="product-price-row">
                  <span className="product-price">₹{product.price.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                  <button className="add-to-cart-btn" onClick={() => onAddToCart(product)} aria-label="Add to cart">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Home;
