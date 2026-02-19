import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Advanced Routing Demo</h1>
      <p>This application demonstrates various routing concepts in React Router:</p>
      
      <div className="features-grid">
        <div className="feature-card">
          <h3>Nested Routes</h3>
          <p>Check the Profile section to see nested routes in action with sub-sections for Details and Settings</p>
          <Link to="/profile" className="feature-link">Go to Profile →</Link>
        </div>
        
        <div className="feature-card">
          <h3>Dynamic Routes</h3>
          <p>Blog posts use dynamic routing with parameters. Try navigating between different post IDs</p>
          <Link to="/blog/1" className="feature-link">View Blog Post →</Link>
        </div>
        
        <div className="feature-card">
          <h3>Protected Routes</h3>
          <p>Profile pages are protected and require login. Try accessing Profile without logging in</p>
          <Link to="/profile" className="feature-link">Try Accessing Profile →</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;