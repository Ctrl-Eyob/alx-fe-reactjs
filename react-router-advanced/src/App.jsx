import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Profile from './components/Profile';
import ProfileDetails from './components/ProfileDetails';
import ProfileSettings from './components/ProfileSettings';
import BlogPost from './components/BlogPost';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

// Create Auth Context
export const AuthContext = createContext();

function App() {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      <Router>
        <div className="App">
          <nav className="navbar">
            <div className="nav-brand">React Router Advanced</div>
            <ul className="nav-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/blog/1">Blog Post 1</Link></li>
              <li><Link to="/blog/2">Blog Post 2</Link></li>
              {!user ? (
                <li><Link to="/login">Login</Link></li>
              ) : (
                <li>
                  <span className="user-greeting">Welcome, {user.username}!</span>
                  <button onClick={logout} className="logout-btn">Logout</button>
                </li>
              )}
            </ul>
          </nav>

          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              
              {/* Protected Routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/profile" element={<Profile />}>
                  {/* Nested Routes */}
                  <Route index element={<ProfileDetails />} />
                  <Route path="details" element={<ProfileDetails />} />
                  <Route path="settings" element={<ProfileSettings />} />
                </Route>
              </Route>
              
              {/* Dynamic Route */}
              <Route path="/blog/:postId" element={<BlogPost />} />
              
              {/* 404 Route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

// 404 Component
const NotFound = () => (
  <div className="not-found">
    <h2>404 - Page Not Found</h2>
    <p>The page you're looking for doesn't exist.</p>
    <Link to="/" className="home-link">Go to Home</Link>
  </div>
);

export default App;