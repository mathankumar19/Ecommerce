import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    Typography,
    Container,
    Box,
    Paper,
    Chip,
    Button,
    Grid,
    Divider
} from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ReceiptIcon from '@mui/icons-material/Receipt';
import '../styles/OrderHistory.css';

function OrderHistory() {
    const { orders } = useSelector(state => state.orders);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Delivered':
                return 'success';
            case 'Processing':
                return 'warning';
            case 'Shipped':
                return 'info';
            case 'Cancelled':
                return 'error';
            default:
                return 'default';
        }
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ReceiptIcon fontSize="large" sx={{ color: '#e91e63' }} />
                    My Orders
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    View and track all your orders
                </Typography>
            </Box>

            {orders.length === 0 ? (
                <Paper sx={{ p: 6, textAlign: 'center' }}>
                    <ShoppingBagIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                        No orders yet
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                        You haven't placed any orders yet. Start shopping now!
                    </Typography>
                    <Button
                        component={Link}
                        to="/products"
                        variant="contained"
                        size="large"
                        startIcon={<ShoppingBagIcon />}
                    >
                        Start Shopping
                    </Button>
                </Paper>
            ) : (
                <Box>
                    {orders.map((order) => (
                        <Paper
                            key={order.orderNumber}
                            sx={{
                                p: 3,
                                mb: 3,
                                transition: 'all 0.3s',
                                '&:hover': {
                                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                                    transform: 'translateY(-2px)'
                                }
                            }}
                        >
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={8}>
                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="h6" sx={{ color: '#e91e63', fontFamily: 'monospace', mb: 1 }}>
                                            Order #{order.orderNumber}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            Placed on {formatDate(order.createdAt)}
                                        </Typography>
                                    </Box>

                                    <Divider sx={{ my: 2 }} />

                                    <Box sx={{ mb: 2 }}>
                                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                                            Items ({order.items.length})
                                        </Typography>
                                        {order.items.slice(0, 3).map((item, index) => (
                                            <Typography key={index} variant="body2" sx={{ ml: 1 }}>
                                                • {item.quantity}x {item.title || item.name}
                                            </Typography>
                                        ))}
                                        {order.items.length > 3 && (
                                            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                                                + {order.items.length - 3} more item(s)
                                            </Typography>
                                        )}
                                    </Box>

                                    <Box>
                                        <Chip
                                            label={order.status || 'Processing'}
                                            color={getStatusColor(order.status || 'Processing')}
                                            size="small"
                                        />
                                    </Box>
                                </Grid>

                                <Grid item xs={12} md={4}>
                                    <Box sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                                        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#e91e63', mb: 2 }}>
                                            ${order.total.toFixed(2)}
                                        </Typography>

                                        <Button
                                            component={Link}
                                            to={`/orders/${order.orderNumber}`}
                                            variant="outlined"
                                            endIcon={<ChevronRightIcon />}
                                            fullWidth
                                            sx={{ mb: 1 }}
                                        >
                                            View Details
                                        </Button>

                                        <Button
                                            component={Link}
                                            to={`/orders/${order.orderNumber}`}
                                            variant="text"
                                            size="small"
                                            fullWidth
                                        >
                                            Track Order
                                        </Button>
                                    </Box>
                                </Grid>
                            </Grid>
                        </Paper>
                    ))}
                </Box>
            )}
        </Container>
    );
}

export default OrderHistory;
