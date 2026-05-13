import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Account from './pages/Account';
import Login from './pages/Login';
import Signup from './pages/Signup';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]); // Dynamic orders state
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    // Fetch products from Spring Boot Backend
    fetch('http://localhost:8080/api/products')
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          setProducts(data);
          setLoading(false);
        } else {
          throw new Error("Empty data from backend, using fallback");
        }
      })
      .catch(error => {
        console.error("Error fetching products, falling back to mock data.", error);
        // Fallback data in case backend isn't running
        setProducts([
          {
            id: 1,
            name: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
            category: 'Audio',
            price: 32999.00,
            imageUrl: '/hero_headphone.png'
          },
          {
            id: 2,
            name: 'Apple Watch Series 9 GPS + Cellular',
            category: 'Wearables',
            price: 41999.00,
            imageUrl: '/product_watch.png'
          },
          {
            id: 3,
            name: 'Sony Alpha a7 IV Mirrorless Camera',
            category: 'Cameras',
            price: 209999.00,
            imageUrl: '/product_camera.png'
          },
          {
            id: 4,
            name: 'Apple MacBook Pro 16-inch (M3 Max)',
            category: 'Laptops',
            price: 289999.00,
            imageUrl: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1000'
          },
          {
            id: 5,
            name: 'Samsung Galaxy S24 Ultra 5G',
            category: 'Smartphones',
            price: 129999.00,
            imageUrl: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&q=80&w=1000'
          },
          {
            id: 6,
            name: 'Sony PlayStation 5 Console',
            category: 'Gaming',
            price: 49990.00,
            imageUrl: 'https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&q=80&w=1000'
          },
          {
            id: 7,
            name: 'Logitech MX Master 3S Wireless Mouse',
            category: 'Accessories',
            price: 8999.00,
            imageUrl: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=1000'
          },
          {
            id: 8,
            name: 'Apple iPad Air (M2) 11-inch',
            category: 'Tablets',
            price: 59900.00,
            imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=1000'
          },
          {
            id: 9,
            name: 'LG UltraGear 34" Curved OLED Gaming Monitor',
            category: 'Monitors',
            price: 89999.00,
            imageUrl: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=1000'
          },
          {
            id: 10,
            name: 'Nintendo Switch OLED Model',
            category: 'Gaming',
            price: 34990.00,
            imageUrl: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?auto=format&fit=crop&q=80&w=1000'
          },
          {
            id: 11,
            name: 'Bose QuietComfort Ultra Earbuds',
            category: 'Audio',
            price: 24990.00,
            imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=1000'
          },
          {
            id: 12,
            name: 'DJI Mini 4 Pro Drone',
            category: 'Drones',
            price: 79990.00,
            imageUrl: 'https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&q=80&w=1000'
          },
          {
            id: 13,
            name: 'GoPro HERO12 Black Action Camera',
            category: 'Cameras',
            price: 37990.00,
            imageUrl: 'https://images.unsplash.com/photo-1565992441121-4367c2967103?auto=format&fit=crop&q=80&w=1000'
          },
          {
            id: 14,
            name: 'ASUS ROG Zephyrus G14 Gaming Laptop',
            category: 'Laptops',
            price: 169990.00,
            imageUrl: 'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=1000'
          },
          {
            id: 15,
            name: 'Microsoft Xbox Series X',
            category: 'Gaming',
            price: 49990.00,
            imageUrl: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?auto=format&fit=crop&q=80&w=1000'
          }
        ]);
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(item => item.id === product.id);
      if (existingItemIndex >= 0) {
        const newCart = [...prev];
        newCart[existingItemIndex] = { ...newCart[existingItemIndex], quantity: newCart[existingItemIndex].quantity + 1 };
        return newCart;
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const addOrder = (order) => {
    setOrders(prev => [order, ...prev]);
  };

  const toggleWishlist = (product) => {
    setWishlistItems(prev => {
      const isCurrentlyInWishlist = prev.some(item => item.id === product.id);
      if (isCurrentlyInWishlist) {
        return prev.filter(item => item.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Router>
      <Navbar cartCount={cartCount} searchQuery={searchQuery} setSearchQuery={setSearchQuery} user={user} />
      <div className="container">
        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px', fontSize: '1.5rem' }}>Loading Store...</div>
        ) : (
          <Routes>
            <Route path="/" element={<Home products={filteredProducts} onAddToCart={handleAddToCart} wishlistItems={wishlistItems} toggleWishlist={toggleWishlist} />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} onRemoveFromCart={handleRemoveFromCart} clearCart={clearCart} addOrder={addOrder} />} />
            <Route path="/account" element={<Account user={user} setUser={setUser} orders={orders} wishlistItems={wishlistItems} toggleWishlist={toggleWishlist} onAddToCart={handleAddToCart} />} />
            <Route path="/login" element={<Login onLogin={setUser} />} />
            <Route path="/signup" element={<Signup onLogin={setUser} />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
