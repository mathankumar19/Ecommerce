import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateQuantity, removeFromCart, clearCart } from '../actions/cartActions';
import {
  Typography,
  Container,
  Box,
  Button,
  Grid,
  Paper,
  Divider,
  IconButton,
  Card,
  CardMedia,
  CardContent
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import '../styles/Cart.css';

function Cart() {
  const dispatch = useDispatch();

  // Get cart state from Redux
  const { data, fetching, error } = useSelector(state => state.cart);
  const cartItems = data.items || [];

  // Note: We don't fetch cart from API since we're managing it locally
  // The cart is populated when items are added via ADD_TO_CART action

  // Handle quantity update
  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity(productId, newQuantity));
    }
  };

  // Handle remove item
  const handleRemoveItem = (productId) => {
    dispatch(removeFromCart(productId));
  };

  // Calculate total
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (fetching) {
    return <div className="loading">Loading cart...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
        Your Cart
      </Typography>

      {cartItems.length === 0 ? (
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          py: 6
        }}>
          <ShoppingCartIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" sx={{ mb: 2 }}>Your cart is empty.</Typography>
          <Button
            component={Link}
            to="/products"
            variant="contained"
            color="primary"
            className="cart-continue-btn"
            startIcon={<ShoppingBagIcon />}
          >
            Continue Shopping
          </Button>
        </Box>
      ) : (
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2, mb: { xs: 3, md: 0 } }}>
              {cartItems.map(item => (
                <Card key={item.id} sx={{
                  display: 'flex',
                  mb: 2,
                  '&:last-child': { mb: 0 }
                }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 100, height: 100, objectFit: 'cover' }}
                    image={item.thumbnail || item.image || 'https://via.placeholder.com/100'}
                    alt={item.title || item.name}
                  />
                  <CardContent sx={{
                    flex: '1 1 auto',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    p: 2
                  }}>
                    <Box>
                      <Typography component="h3" variant="h6">
                        {item.title || item.name}
                      </Typography>
                      <Typography variant="body1" color="text.secondary">
                        ${item.price}
                      </Typography>
                      <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        mt: 1
                      }}>
                        <IconButton
                          size="small"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>
                        <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                        <IconButton
                          size="small"
                          onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </Box>
                    <Box sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'flex-end'
                    }}>
                      <Typography variant="h6" sx={{ mb: 1 }}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </Typography>
                      <IconButton
                        color="error"
                        aria-label="remove item"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 1
              }}>
                <Typography>Subtotal:</Typography>
                <Typography>${total.toFixed(2)}</Typography>
              </Box>
              <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                mb: 1
              }}>
                <Typography>Shipping:</Typography>
                <Typography>Free</Typography>
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
                to="/checkout"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
                className="cart-checkout-btn"
              >
                Proceed to Checkout
              </Button>
              <Button
                component={Link}
                to="/products"
                variant="outlined"
                color="primary"
                fullWidth
                className="cart-continue-btn"
              >
                Continue Shopping
              </Button>
              <Button
                variant="outlined"
                color="error"
                fullWidth
                onClick={() => dispatch(clearCart())}
              >
                Clear Cart
              </Button>
            </Paper>
          </Grid>
        </Grid>
      )}
    </Container>
  );
}

export default Cart;