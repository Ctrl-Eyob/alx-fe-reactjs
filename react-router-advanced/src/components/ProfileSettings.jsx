import React, { useState } from 'react';

const ProfileSettings = () => {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    darkMode: false,
    language: 'en',
    twoFactorAuth: false
  });

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Settings saved successfully!');
  };

  return (
    <div className="profile-settings">
      <h3>Profile Settings</h3>
      <form onSubmit={handleSubmit} className="settings-form">
        <div className="settings-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="emailNotifications"
              checked={settings.emailNotifications}
              onChange={handleChange}
            />
            Email Notifications
          </label>
        </div>
        
        <div className="settings-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="darkMode"
              checked={settings.darkMode}
              onChange={handleChange}
            />
            Dark Mode
          </label>
        </div>
        
        <div className="settings-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="twoFactorAuth"
              checked={settings.twoFactorAuth}
              onChange={handleChange}
            />
            Two-Factor Authentication
          </label>
        </div>
        
        <div className="settings-group">
          <label htmlFor="language">Language:</label>
          <select
            id="language"
            name="language"
            value={settings.language}
            onChange={handleChange}
          >
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            <option value="de">German</option>
            <option value="it">Italian</option>
          </select>
        </div>
        
        <button type="submit" className="save-btn">Save Settings</button>
      </form>
    </div>
  );
};

export default ProfileSettings;