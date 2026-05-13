import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ cartCount, searchQuery, setSearchQuery, user }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearchClick = () => {
    if (location.pathname !== '/') {
      navigate('/');
    }
    setTimeout(() => {
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <Link to="/" className="logo">
          <span className="text-gradient">NexGen</span> Store
        </Link>
        
        <div className="search-bar">
          <input 
            type="text" 
            placeholder="Search products, categories..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearchClick()}
          />
          <button className="search-btn" onClick={handleSearchClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>

        <ul className="nav-links">
          <li><Link to="/" className="nav-link">Home</Link></li>
          {user ? (
            <li><Link to="/account" className="nav-link">Account ({user.name})</Link></li>
          ) : (
            <li><Link to="/login" className="nav-link">Sign In</Link></li>
          )}
        </ul>

        <div className="nav-actions">
          <Link to="/cart" className="cart-icon-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
