import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login, clearError } from '../actions/userActions';
import supabase from '../utils/supabaseClient';
import '../styles/Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [resetPassword, setResetPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, error, fetching } = useSelector(state => state.user);

  useEffect(() => {
    // Clear any previous errors when component mounts
    dispatch(clearError());
    
    // Check if user is already logged in
    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    // Redirect if user is authenticated
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  const checkUser = async () => {
    const { data } = await supabase.auth.getSession();
    if (data?.session) {
      navigate('/');
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!resetPassword && !password) {
      errors.password = 'Password is required';
    } else if (!resetPassword && password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      if (resetPassword) {
        handlePasswordReset();
      } else {
        dispatch(login({ email, password }));
      }
    }
  };
  
  const handlePasswordReset = async () => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        setFormErrors({ ...formErrors, email: error.message });
      } else {
        setResetSent(true);
      }
    } catch (error) {
      setFormErrors({ ...formErrors, email: error.message });
    }
  };
  
  const toggleResetPassword = () => {
    setResetPassword(!resetPassword);
    setFormErrors({});
  };

  if (resetSent) {
    return (
      <div className="login-container">
        <div className="login-form-container">
          <h2>Password Reset Email Sent</h2>
          <p className="reset-message">
            We've sent a password reset link to <strong>{email}</strong>.
            Please check your email and follow the instructions to reset your password.
          </p>
          <button
            className="login-button"
            onClick={() => {
              setResetSent(false);
              setResetPassword(false);
            }}
          >
            Back to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-container">
      <div className="login-form-container">
        <h2>{resetPassword ? 'Reset Your Password' : 'Login to Your Account'}</h2>
        
        {error && <div className="error-message">{typeof error === 'string' ? error : 'An error occurred. Please try again.'}</div>}
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
            {formErrors.email && <span className="error">{typeof formErrors.email === 'string' ? formErrors.email : 'Invalid email format'}</span>}
          </div>
          
          {!resetPassword && (
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              {formErrors.password && <span className="error">{formErrors.password}</span>}
            </div>
          )}
          
          <button type="submit" className="login-button" disabled={fetching}>
            {fetching
              ? (resetPassword ? 'Sending...' : 'Logging in...')
              : (resetPassword ? 'Send Reset Link' : 'Login')}
          </button>
        </form>
        
        <div className="login-footer">
          <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
          <p>
            {resetPassword ? (
              <button className="text-button" onClick={toggleResetPassword}>
                Back to Login
              </button>
            ) : (
              <button className="text-button" onClick={toggleResetPassword}>
                Forgot password?
              </button>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;