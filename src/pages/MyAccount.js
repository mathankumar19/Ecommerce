import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import '../styles/MyAccount.css';

function MyAccount() {
  const { currentUser, isAuthenticated } = useSelector(state => state.user);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: ''
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Populate form with user data when available
  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.name || currentUser?.profile?.name || '',
        email: currentUser.email || currentUser?.profile?.email || '',
        phone: currentUser?.profile?.phone || '',
        address: currentUser?.profile?.address || '',
        city: currentUser?.profile?.city || '',
        state: currentUser?.profile?.state || '',
        zipCode: currentUser?.profile?.zipCode || '',
        country: currentUser?.profile?.country || ''
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would dispatch an action to update the user profile
    // For now, we'll just show an alert
    alert('Profile updated successfully!');
  };

  if (!isAuthenticated || !currentUser) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="my-account-container">
      <h1>My Account</h1>
      
      <div className="account-info-container">
        <div className="account-section">
          <h2>Account Information</h2>
          <div className="account-details">
            <p><strong>Email:</strong> {currentUser.email}</p>
            <p><strong>Member Since:</strong> {new Date(currentUser.created_at).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="account-section">
          <h2>Personal Information</h2>
          <form onSubmit={handleSubmit} className="account-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                disabled
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter your city"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="state">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Enter your state"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="zipCode">ZIP Code</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleChange}
                  placeholder="Enter your ZIP code"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Enter your country"
                />
              </div>
            </div>
            
            <button type="submit" className="update-button">Update Profile</button>
          </form>
        </div>

        <div className="account-section">
          <h2>Order History</h2>
          <div className="order-history">
            <p>You haven't placed any orders yet.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyAccount;