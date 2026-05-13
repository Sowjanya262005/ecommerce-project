import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (email) {
      // Mock login: use the part of the email before @ as the name
      const name = email.split('@')[0];
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
          <h2>Welcome Back</h2>
          <p>Sign in to your NexGen account</p>
        </div>
        
        <form onSubmit={handleLogin} className="login-form">
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
            />
          </div>
          
          <div className="form-options">
            <label className="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" className="forgot-password text-gradient">Forgot password?</a>
          </div>
          
          <button type="submit" className="btn btn-primary login-btn">
            Sign In
          </button>
        </form>
        
        <div className="login-footer">
          <p>Don't have an account? <Link to="/signup" className="text-gradient">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
