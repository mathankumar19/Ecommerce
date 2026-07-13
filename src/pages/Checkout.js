import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder } from '../actions/orderActions';
import {
  Typography,
  Container,
  Box,
  Button,
  Grid,
  Paper,
  Divider,
  TextField,
  Alert
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

function Checkout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector(state => state.cart);
  const cartItems = data.items || [];

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const [errors, setErrors] = useState({});
  const [showError, setShowError] = useState(false);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    setShowError(false);
  };

  // Validation functions
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validateCardNumber = (cardNumber) => {
    const cleaned = cardNumber.replace(/\s/g, '');
    return cleaned.length === 16 && /^\d+$/.test(cleaned);
  };

  const validateExpiry = (expiry) => {
    const re = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!re.test(expiry)) return false;

    const [month, year] = expiry.split('/');
    const expDate = new Date(2000 + parseInt(year), parseInt(month) - 1);
    return expDate > new Date();
  };

  const validateCVV = (cvv) => {
    return cvv.length === 3 && /^\d+$/.test(cvv);
  };

  const validateZip = (zip) => {
    return /^\d{5,6}$/.test(zip);
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Full name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }

    if (!formData.zip.trim()) {
      newErrors.zip = 'ZIP code is required';
    } else if (!validateZip(formData.zip)) {
      newErrors.zip = 'Please enter a valid ZIP code (5-6 digits)';
    }

    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!validateCardNumber(formData.cardNumber)) {
      newErrors.cardNumber = 'Please enter a valid 16-digit card number';
    }

    if (!formData.expiry.trim()) {
      newErrors.expiry = 'Expiry date is required';
    } else if (!validateExpiry(formData.expiry)) {
      newErrors.expiry = 'Please enter a valid expiry date (MM/YY)';
    }

    if (!formData.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (!validateCVV(formData.cvv)) {
      newErrors.cvv = 'Please enter a valid 3-digit CVV';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submit
  const handlePlaceOrder = (e) => {
    e.preventDefault();

    // Check if cart is empty
    if (cartItems.length === 0) {
      setShowError(true);
      return;
    }

    // Validate form
    if (validateForm()) {
      // Prepare order data
      const orderData = {
        items: cartItems,
        shippingInfo: {
          name: formData.name,
          email: formData.email,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip: formData.zip
        },
        subtotal,
        shipping,
        total
      };

      // Generate a random order number
      const orderNumber = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();

      // Dispatch order to Redux store
      dispatch(addOrder({
        orderNumber,
        ...orderData,
        status: 'Processing',
        createdAt: new Date().toISOString()
      }));

      // Navigate to thank you page with order number
      navigate('/thank-you', { state: { orderNumber } });
    } else {
      // Scroll to top to show errors
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Calculate total
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {showError && cartItems.length === 0 && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Your cart is empty. Please add items to your cart before checking out.
        </Alert>
      )}

      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Checkout
      </Typography>

      <form onSubmit={handlePlaceOrder}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, mb: { xs: 3, md: 0 } }}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h6" gutterBottom sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 3
                }}>
                  <LocalShippingIcon sx={{ mr: 1 }} />
                  Shipping Information
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="name"
                      name="name"
                      label="Full Name"
                      fullWidth
                      variant="outlined"
                      value={formData.name}
                      onChange={handleChange}
                      error={!!errors.name}
                      helperText={errors.name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="email"
                      name="email"
                      label="Email"
                      fullWidth
                      variant="outlined"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={!!errors.email}
                      helperText={errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="address"
                      name="address"
                      label="Address"
                      fullWidth
                      variant="outlined"
                      value={formData.address}
                      onChange={handleChange}
                      error={!!errors.address}
                      helperText={errors.address}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="city"
                      name="city"
                      label="City"
                      fullWidth
                      variant="outlined"
                      value={formData.city}
                      onChange={handleChange}
                      error={!!errors.city}
                      helperText={errors.city}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      required
                      id="state"
                      name="state"
                      label="State"
                      fullWidth
                      variant="outlined"
                      value={formData.state}
                      onChange={handleChange}
                      error={!!errors.state}
                      helperText={errors.state}
                    />
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <TextField
                      required
                      id="zip"
                      name="zip"
                      label="ZIP Code"
                      fullWidth
                      variant="outlined"
                      value={formData.zip}
                      onChange={handleChange}
                      error={!!errors.zip}
                      helperText={errors.zip}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Divider sx={{ my: 4 }} />

              <Box>
                <Typography variant="h6" gutterBottom sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 3
                }}>
                  <CreditCardIcon sx={{ mr: 1 }} />
                  Payment Information
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <TextField
                      required
                      id="cardNumber"
                      name="cardNumber"
                      label="Card Number"
                      placeholder="1234 5678 9012 3456"
                      fullWidth
                      variant="outlined"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      error={!!errors.cardNumber}
                      helperText={errors.cardNumber}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="expiry"
                      name="expiry"
                      label="Expiry Date"
                      placeholder="MM/YY"
                      fullWidth
                      variant="outlined"
                      value={formData.expiry}
                      onChange={handleChange}
                      error={!!errors.expiry}
                      helperText={errors.expiry}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      id="cvv"
                      name="cvv"
                      label="CVV"
                      placeholder="123"
                      fullWidth
                      variant="outlined"
                      value={formData.cvv}
                      onChange={handleChange}
                      error={!!errors.cvv}
                      helperText={errors.cvv}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  type="submit"
                >
                  Place Order
                </Button>
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>

              <Box sx={{ mb: 3 }}>
                {cartItems.map(item => (
                  <Box key={item.id} sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    mb: 1,
                    py: 1,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    '&:last-child': {
                      borderBottom: 'none'
                    }
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body2" sx={{ fontWeight: 'bold', mr: 1 }}>
                        {item.quantity}x
                      </Typography>
                      <Typography variant="body1">
                        {item.title || item.name}
                      </Typography>
                    </Box>
                    <Typography variant="body1">
                      ${(item.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 1
              }}>
                <Typography>Subtotal:</Typography>
                <Typography>${subtotal.toFixed(2)}</Typography>
              </Box>
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 1
              }}>
                <Typography>Shipping:</Typography>
                <Typography>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 3
              }}>
                <Typography variant="h6">Total:</Typography>
                <Typography variant="h6">${total.toFixed(2)}</Typography>
              </Box>

              <Button
                component={Link}
                to="/cart"
                variant="outlined"
                fullWidth
                startIcon={<ArrowBackIcon />}
              >
                Back to Cart
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}

export default Checkout;