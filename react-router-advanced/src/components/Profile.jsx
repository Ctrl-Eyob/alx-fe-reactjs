import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

const Profile = () => {
  const location = useLocation();
  
  return (
    <div className="profile-container">
      <h2>User Profile</h2>
      <div className="profile-nav">
        <Link 
          to="/profile/details" 
          className={`nav-link ${location.pathname === '/profile/details' || location.pathname === '/profile' ? 'active' : ''}`}
        >
          Details
        </Link>
        <Link 
          to="/profile/settings" 
          className={`nav-link ${location.pathname === '/profile/settings' ? 'active' : ''}`}
        >
          Settings
        </Link>
      </div>
      <div className="profile-content">
        {/* Outlet renders the nested route components (ProfileDetails or ProfileSettings) */}
        <Outlet />
      </div>
    </div>
  );
};

export default Profile;