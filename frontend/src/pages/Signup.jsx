import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css'; // Reusing the same styles as Login

const Signup = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (name && email && password) {
      // Mock signup: log them in immediately
      const capitalizedName = name.charAt(0).toUpperCase() + name.slice(1);
      
      onLogin({
        name: capitalizedName || 'User',
        email: email,
        avatar: capitalizedName ? capitalizedName.substring(0, 2).toUpperCase() : 'JD'
      });
      navigate('/account');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container glass-panel animate-fade-in">
        <div className="login-header">
          <h2>Create Account</h2>
          <p>Join NexGen to unlock premium features</p>
        </div>
        
        <form onSubmit={handleSignup} className="login-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              placeholder="John Doe" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              placeholder="you@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength="6"
            />
          </div>
          
          <button type="submit" className="btn btn-primary login-btn">
            Sign Up
          </button>
        </form>
        
        <div className="login-footer">
          <p>Already have an account? <Link to="/login" className="text-gradient">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
