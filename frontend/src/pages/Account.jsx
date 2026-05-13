import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Account.css';

const Account = ({ user, setUser, orders = [], wishlistItems = [], toggleWishlist, onAddToCart }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders');

  // Mock Payments State
  const [paymentMethods, setPaymentMethods] = useState([
    { type: 'VISA', detail: 'Visa ending in 4242', extra: 'Expires 12/28', color: '#1a1b2e' },
    { type: 'UPI', detail: `${user?.email?.split('@')[0] || 'user'}@okhdfcbank`, extra: 'Primary UPI ID', color: '#1a1b2e' }
  ]);
  const [isAddingPayment, setIsAddingPayment] = useState(false);
  const [newPaymentType, setNewPaymentType] = useState('CARD');
  const [newPaymentDetail, setNewPaymentDetail] = useState('');

  // Settings State
  const [settingsName, setSettingsName] = useState(user?.name || '');
  const [settingsEmail, setSettingsEmail] = useState(user?.email || '');

  // Redirect to login if no user
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setUser({ ...user, name: settingsName, email: settingsEmail });
    alert('Settings saved successfully!');
  };

  const handleAddPayment = (e) => {
    e.preventDefault();
    if (!newPaymentDetail) return;
    
    if (newPaymentType === 'CARD') {
      const last4 = newPaymentDetail.slice(-4) || '1234';
      setPaymentMethods([...paymentMethods, { type: 'CARD', detail: `Card ending in ${last4}`, extra: 'Expires 11/29', color: '#1a1b2e' }]);
    } else {
      setPaymentMethods([...paymentMethods, { type: 'UPI', detail: newPaymentDetail, extra: 'UPI ID', color: '#1a1b2e' }]);
    }
    
    setNewPaymentDetail('');
    setIsAddingPayment(false);
  };

  const handleRemovePayment = (index) => {
    setPaymentMethods(paymentMethods.filter((_, i) => i !== index));
  };

  if (!user) return null;

  return (
    <div className="account-page">
      <div className="section-header">
        <h1 className="section-title">My <span className="text-gradient">Account</span></h1>
      </div>

      <div className="account-layout">
        <div className="account-sidebar glass-panel animate-fade-in">
          <div className="user-profile">
            <div className="avatar">{user.avatar}</div>
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
          <ul className="account-menu">
            <li className={activeTab === 'orders' ? 'active' : ''} onClick={() => setActiveTab('orders')}>Orders</li>
            <li className={activeTab === 'wishlist' ? 'active' : ''} onClick={() => setActiveTab('wishlist')}>Wishlist</li>
            <li className={activeTab === 'addresses' ? 'active' : ''} onClick={() => setActiveTab('addresses')}>Addresses</li>
            <li className={activeTab === 'payment' ? 'active' : ''} onClick={() => setActiveTab('payment')}>Payment Methods</li>
            <li className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>Settings</li>
            <li className="logout" onClick={handleLogout}>Sign Out</li>
          </ul>
        </div>

        <div className="account-content glass-panel animate-fade-in">
          {activeTab === 'orders' && (
            <>
              <h2>Recent Orders</h2>
              <div className="orders-list">
                {orders.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)' }}>You haven't placed any orders recently.</p>
                ) : (
                  orders.map((order, i) => (
                    <div key={i} className="order-card">
                      <div className="order-header">
                        <div>
                          <p className="order-label">Order placed</p>
                          <p className="order-value">{order.date}</p>
                        </div>
                        <div>
                          <p className="order-label">Total</p>
                          <p className="order-value">₹{order.total.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                        </div>
                        <div>
                          <p className="order-label">Order #</p>
                          <p className="order-value">{order.id}</p>
                        </div>
                      </div>
                      <div className="order-body">
                        {order.items.map((item, j) => (
                          <div key={j} className="order-item" style={{ marginBottom: j < order.items.length - 1 ? '1.5rem' : '0' }}>
                            <img src={item.imageUrl} alt={item.name} />
                            <div className="order-item-info">
                              <h4>{item.name}</h4>
                              <p>Quantity: {item.quantity}</p>
                              <p className="order-status text-gradient">{order.status}</p>
                            </div>
                            <div className="order-actions">
                              <button className="btn btn-outline btn-sm">Track Package</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          {activeTab === 'wishlist' && (
            <>
              <h2>Your Wishlist</h2>
              <div className="orders-list">
                {wishlistItems.length === 0 ? (
                  <p style={{ color: 'var(--text-muted)' }}>Your wishlist is currently empty.</p>
                ) : (
                  wishlistItems.map(item => (
                    <div key={item.id} className="order-card">
                      <div className="order-body">
                        <div className="order-item">
                          <img src={item.imageUrl} alt={item.name} />
                          <div className="order-item-info">
                            <h4>{item.name}</h4>
                            <p className="order-status text-gradient">₹{item.price.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</p>
                          </div>
                          <div className="order-actions">
                            <button className="btn btn-primary btn-sm" onClick={() => { onAddToCart(item); toggleWishlist(item); }}>Add to Cart</button>
                            <button className="btn btn-outline btn-sm" onClick={() => toggleWishlist(item)}>Remove</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          {activeTab === 'addresses' && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ marginBottom: 0 }}>Saved Addresses</h2>
                <button className="btn btn-primary btn-sm">+ Add New</button>
              </div>
              <div className="orders-list">
                <div className="order-card" style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                      <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        Home <span style={{ fontSize: '0.7rem', padding: '0.2rem 0.5rem', background: 'rgba(0,242,254,0.1)', color: '#00f2fe', borderRadius: '4px' }}>Default</span>
                      </h4>
                      <p style={{ color: 'var(--text-muted)', lineHeight: '1.5' }}>
                        {user.name}<br/>
                        123 Tech Park, Suite 400<br/>
                        Mumbai, Maharashtra 400001<br/>
                        India<br/>
                        Phone: +91 98765 43210
                      </p>
                    </div>
                    <div className="order-actions">
                      <button className="btn btn-outline btn-sm">Edit</button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'payment' && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h2 style={{ marginBottom: 0 }}>Payment Methods</h2>
                {!isAddingPayment && <button className="btn btn-primary btn-sm" onClick={() => setIsAddingPayment(true)}>+ Add Method</button>}
              </div>

              {isAddingPayment && (
                <div className="order-card" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
                  <h4 style={{ marginBottom: '1rem' }}>Add New Payment Method</h4>
                  <form onSubmit={handleAddPayment} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <select 
                      value={newPaymentType} 
                      onChange={(e) => setNewPaymentType(e.target.value)}
                      style={{ padding: '0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}
                    >
                      <option value="CARD">Credit/Debit Card</option>
                      <option value="UPI">UPI ID</option>
                    </select>
                    
                    {newPaymentType === 'CARD' ? (
                      <input 
                        type="text" 
                        placeholder="Card Number (e.g. 4111 1111 1111 1234)" 
                        value={newPaymentDetail}
                        onChange={(e) => setNewPaymentDetail(e.target.value)}
                        style={{ padding: '0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}
                        required
                      />
                    ) : (
                      <input 
                        type="text" 
                        placeholder="UPI ID (e.g. user@okhdfcbank)" 
                        value={newPaymentDetail}
                        onChange={(e) => setNewPaymentDetail(e.target.value)}
                        style={{ padding: '0.75rem', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}
                        required
                      />
                    )}
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button type="submit" className="btn btn-primary">Save Method</button>
                      <button type="button" className="btn btn-outline" onClick={() => setIsAddingPayment(false)}>Cancel</button>
                    </div>
                  </form>
                </div>
              )}

              <div className="orders-list">
                {paymentMethods.length === 0 && <p style={{ color: 'var(--text-muted)' }}>No payment methods saved.</p>}
                {paymentMethods.map((method, i) => (
                  <div key={i} className="order-card" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ background: method.color, padding: '1rem', borderRadius: '8px', fontSize: '1.2rem', fontWeight: 'bold', color: method.type === 'UPI' ? '#ff9800' : '#fff', minWidth: '60px', textAlign: 'center' }}>
                      {method.type}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h4 style={{ marginBottom: '0.25rem' }}>{method.detail}</h4>
                      <p style={{ color: 'var(--text-muted)' }}>{method.extra}</p>
                    </div>
                    <button className="btn btn-outline btn-sm" onClick={() => handleRemovePayment(i)}>Remove</button>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === 'settings' && (
            <>
              <h2>Account Settings</h2>
              <form className="login-form" style={{ maxWidth: '500px' }} onSubmit={handleSaveSettings}>
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" value={settingsName} onChange={(e) => setSettingsName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" value={settingsEmail} onChange={(e) => setSettingsEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" placeholder="+91 XXXX XXXXX" />
                </div>
                <div className="form-group" style={{ marginTop: '1rem' }}>
                  <label>Change Password</label>
                  <input type="password" placeholder="New Password" />
                </div>
                <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem', width: 'fit-content' }}>Save Changes</button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
