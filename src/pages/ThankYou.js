import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart } from '../actions/cartActions';
import { addOrder } from '../actions/orderActions';
import {
    Typography,
    Container,
    Box,
    Button,
    Paper,
    Divider
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import HomeIcon from '@mui/icons-material/Home';
import ReceiptIcon from '@mui/icons-material/Receipt';
import '../styles/ThankYou.css';

function ThankYou() {
    const dispatch = useDispatch();
    const location = useLocation();
    const [orderNumber, setOrderNumber] = useState('');
    useEffect(() => {
        const orderNumberFromState = location.state?.orderNumber;
        if (orderNumberFromState) {
            setOrderNumber(orderNumberFromState);
        }

        // Clear the cart when the thank you page loads
        dispatch(clearCart());
    }, [dispatch, location.state]);

    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <Paper
                elevation={3}
                className="thank-you-container"
                sx={{
                    p: 6,
                    textAlign: 'center',
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)'
                }}
            >
                <Box className="success-icon-container">
                    <CheckCircleOutlineIcon
                        className="success-icon"
                        sx={{
                            fontSize: 120,
                            color: '#4caf50',
                            animation: 'scaleIn 0.5s ease-in-out'
                        }}
                    />
                </Box>

                <Typography
                    variant="h3"
                    component="h1"
                    gutterBottom
                    sx={{
                        fontWeight: 'bold',
                        color: '#2e7d32',
                        mb: 2
                    }}
                >
                    Order Placed Successfully!
                </Typography>

                <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ mb: 4 }}
                >
                    Thank you for your purchase. Your order has been received and is being processed.
                </Typography>

                <Divider sx={{ my: 4 }} />

                <Box sx={{
                    backgroundColor: '#f5f5f5',
                    p: 3,
                    borderRadius: 2,
                    mb: 4
                }}>
                    <Typography variant="body1" color="text.secondary" gutterBottom>
                        Order Number
                    </Typography>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 'bold',
                            color: '#e91e63',
                            fontFamily: 'monospace'
                        }}
                    >
                        {orderNumber}
                    </Typography>
                </Box>

                <Box sx={{
                    textAlign: 'left',
                    backgroundColor: 'white',
                    p: 3,
                    borderRadius: 2,
                    mb: 4,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                }}>
                    <Typography variant="h6" gutterBottom sx={{ color: '#e91e63' }}>
                        What's Next?
                    </Typography>
                    <ul style={{ paddingLeft: '20px', lineHeight: '2' }}>
                        <li>
                            <Typography variant="body1">
                                You will receive an order confirmation email shortly
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body1">
                                We'll notify you when your order ships
                            </Typography>
                        </li>
                        <li>
                            <Typography variant="body1">
                                Track your order status in your account
                            </Typography>
                        </li>
                    </ul>
                </Box>

                <Box sx={{
                    display: 'flex',
                    gap: 2,
                    justifyContent: 'center',
                    flexWrap: 'wrap'
                }}>
                    <Button
                        component={Link}
                        to={`/orders/${orderNumber}`}
                        variant="contained"
                        size="large"
                        startIcon={<ReceiptIcon />}
                        sx={{
                            px: 4,
                            py: 1.5,
                            borderRadius: 2,
                            bgcolor: '#e91e63',
                            '&:hover': {
                                bgcolor: '#e91e63',
                                color: 'white'
                            }
                        }}
                    >
                        View Order Details
                    </Button>
                    <Button
                        component={Link}
                        to="/"
                        variant="outlined"
                        color="primary"
                        size="large"
                        startIcon={<HomeIcon />}
                        sx={{
                            px: 4,
                            py: 1.5,
                            borderRadius: 2,
                            '&:hover': {
                                backgroundColor: '#e91e63',
                                color: 'white'
                            }
                        }}
                    >
                        Back to Home
                    </Button>
                    <Button
                        component={Link}
                        to="/products"
                        variant="outlined"
                        color="primary"
                        size="large"
                        startIcon={<ShoppingBagIcon />}
                        sx={{
                            px: 4,
                            py: 1.5,
                            borderRadius: 2,
                            '&:hover': {
                                backgroundColor: '#e91e63',
                                color: 'white'
                            }
                        }}
                    >
                        Continue Shopping
                    </Button>
                </Box>

                <Box sx={{ mt: 4, pt: 3, borderTop: '1px solid #e0e0e0' }}>
                    <Typography variant="body2" color="text.secondary">
                        Need help? Contact our customer support at{' '}
                        <a href="mailto:support@example.com" style={{ color: '#e91e63', textDecoration: 'none' }}>
                            support@example.com
                        </a>
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
}

export default ThankYou;
