import React, { useContext } from 'react';
import { AuthContext } from '../App';

const ProfileDetails = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="profile-details">
      <h3>Profile Details</h3>
      <div className="details-card">
        <div className="detail-item">
          <strong>Username:</strong> {user?.username}
        </div>
        <div className="detail-item">
          <strong>Email:</strong> {user?.username}@example.com
        </div>
        <div className="detail-item">
          <strong>Member since:</strong> January 2024
        </div>
        <div className="detail-item">
          <strong>Total posts:</strong> 5
        </div>
        <div className="detail-item">
          <strong>Account status:</strong> <span className="badge">Active</span>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetails;