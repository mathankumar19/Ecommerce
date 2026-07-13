import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearError } from '../actions/userActions';
import '../styles/Signup.css';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const errors = {};
    const { username, email, password, confirmPassword } = formData;

    if (!username.trim()) {
      errors.username = 'Username is required';
    }

    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const { username, email, password } = formData;
    setLoading(true);

    try {
      const response = await fetch('http://localhost:8000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });

      const result = await response.json();

      if (!response.ok) {
        // Use server error message if available
        const message =
          result.detail || result.message || result.error || 'Signup failed. Please try again.';
        setFormErrors({ ...formErrors, form: message });
      } else {
        setSignupSuccess(true);
      }
    } catch (err) {
      setFormErrors({ ...formErrors, form: 'Network error. Please check your connection.' });
    } finally {
      setLoading(false);
    }
  };

  if (signupSuccess) {
    return (
      <div className="signup-container">
        <div className="signup-form-container">
          <h2>Registration Successful!</h2>
          <div className="success-message">
            <p>Thank you for signing up! Your account has been created for <strong>{formData.email}</strong>.</p>
            <p>You can now log in with your credentials.</p>
          </div>
          <Link to="/login" className="signup-button login-link">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="signup-container">
      <div className="signup-form-container">
        <h2>Create an Account</h2>

        {error && <div className="error-message">{error}</div>}
        {formErrors.form && <div className="error-message">{formErrors.form}</div>}

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label htmlFor="username" style={{ fontWeight: '500' }}>Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
            />
            {formErrors.username && <span className="error">{formErrors.username}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email" style={{ fontWeight: '500' }}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
            {formErrors.email && <span className="error">{formErrors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="password" style={{ fontWeight: '500' }}>Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
            />
            {formErrors.password && <span className="error">{formErrors.password}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" style={{ fontWeight: '500' }}>Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
            />
            {formErrors.confirmPassword && <span className="error">{formErrors.confirmPassword}</span>}
          </div>

          <button
            type="submit"
            className="signup-button"
            disabled={loading}
            style={{
              backgroundColor: '#e91e63',
              transition: 'background-color 0.3s'
            }}
          >
            {loading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>

        <div className="signup-footer">
          <p>Already have an account? <Link to="/login" style={{ fontWeight: '500' }}>Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;