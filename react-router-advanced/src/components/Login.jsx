import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../App';

const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the page they tried to visit before being redirected
  const from = location.state?.from?.pathname || '/profile';

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Simple validation
    if (!credentials.username || !credentials.password) {
      setError('Please fill in all fields');
      return;
    }
    
    // Simple authentication (in real app, this would be an API call)
    if (credentials.password.length >= 3) {
      login({ username: credentials.username });
      navigate(from, { replace: true });
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            placeholder="Enter username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            placeholder="Enter password (min 3 chars)"
          />
        </div>
        <button type="submit" className="login-btn">Login</button>
      </form>
      <p className="login-hint">Hint: Any username with password length >= 3 works</p>
    </div>
  );
};

export default Login;