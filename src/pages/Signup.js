import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { clearError } from '../actions/userActions';
import supabase from '../utils/supabaseClient';
import '../styles/Signup.css';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [signupSuccess, setSignupSuccess] = useState(false);
  
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const validateForm = () => {
    const errors = {};
    const { name, email, password, confirmPassword } = formData;
    
    if (!name.trim()) {
      errors.name = 'Name is required';
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
    
    if (validateForm()) {
      const { name, email, password } = formData;
      
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { name }
          }
        });
        
        if (error) {
          setFormErrors({ ...formErrors, form: error.message });
        } else if (data) {
          // Check if email confirmation is required
          if (data.user && data.user.identities && data.user.identities.length === 0) {
            // This means the user already exists but hasn't confirmed their email
            setFormErrors({ ...formErrors, email: 'An account with this email already exists' });
          } else {
            // Create a profile record
            if (data.user) {
              const { error: profileError } = await supabase
                .from('profiles')
                .insert([
                  {
                    id: data.user.id,
                    name,
                    email,
                  }
                ]);
                
              if (profileError) {
                console.error('Error creating profile:', profileError);
              }
            }
            
            setSignupSuccess(true);
          }
        }
      } catch (error) {
        setFormErrors({ ...formErrors, form: error.message });
      }
    }
  };

  if (signupSuccess) {
    return (
      <div className="signup-container">
        <div className="signup-form-container">
          <h2>Registration Successful!</h2>
          <div className="success-message">
            <p>Thank you for signing up! A confirmation email has been sent to <strong>{formData.email}</strong>.</p>
            <p>Please check your email and follow the instructions to verify your account.</p>
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
            <label htmlFor="name" style={{  fontWeight: '500' }}>Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
            {formErrors.name && <span className="error">{formErrors.name}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="email" style={{  fontWeight: '500' }}>Email</label>
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
            <label htmlFor="password" style={{  fontWeight: '500' }}>Password</label>
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
            <label htmlFor="confirmPassword" style={{  fontWeight: '500' }}>Confirm Password</label>
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
            disabled={fetching}
            style={{
              backgroundColor: '#e91e63',
              transition: 'background-color 0.3s'
            }}
          >
            {fetching ? 'Creating Account...' : 'Sign Up'}
          </button>
        </form>
        
        <div className="signup-footer">
          <p>Already have an account? <Link to="/login" style={{  fontWeight: '500' }}>Login</Link></p>
        </div>
      </div>
    </div>
  );
}

export default Signup;