import React, { useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetail } from '../actions/orderActions';
import {
    Typography,
    Container,
    Box,
    Paper,
    Button,
    Grid,
    Divider,
    Chip,
    Stepper,
    Step,
    StepLabel,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import '../styles/OrderDetail.css';

function OrderDetail() {
    const { orderId } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { selectedOrder } = useSelector(state => state.orders);

    useEffect(() => {
        dispatch(getOrderDetail(orderId));
    }, [dispatch, orderId]);

    if (!selectedOrder) {
        return (
            <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
                <Typography variant="h5" gutterBottom>
                    Order not found
                </Typography>
                <Button
                    component={Link}
                    to="/orders"
                    variant="contained"
                    sx={{ mt: 2 }}
                >
                    Back to Orders
                </Button>
            </Container>
        );
    }

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

    const orderSteps = [
        { label: 'Order Placed', completed: true },
        { label: 'Processing', completed: selectedOrder.status !== 'Processing' },
        { label: 'Shipped', completed: selectedOrder.status === 'Delivered' || selectedOrder.status === 'Shipped' },
        { label: 'Delivered', completed: selectedOrder.status === 'Delivered' }
    ];

    const activeStep = selectedOrder.status === 'Delivered' ? 3 :
        selectedOrder.status === 'Shipped' ? 2 :
            selectedOrder.status === 'Processing' ? 1 : 0;

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/orders')}
                sx={{ mb: 3 }}
            >
                Back to Orders
            </Button>

            <Paper sx={{ p: 4, mb: 3 }}>
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} md={8}>
                        <Typography variant="h4" gutterBottom>
                            Order Details
                        </Typography>
                        <Typography variant="h6" sx={{ color: '#e91e63', fontFamily: 'monospace', mb: 2 }}>
                            #{selectedOrder.orderNumber}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Placed on {formatDate(selectedOrder.createdAt)}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                        <Chip
                            label={selectedOrder.status || 'Processing'}
                            color={getStatusColor(selectedOrder.status || 'Processing')}
                            icon={selectedOrder.status === 'Delivered' ? <CheckCircleIcon /> : <LocalShippingIcon />}
                            sx={{ fontSize: '1rem', py: 2.5, px: 1 }}
                        />
                        <Typography variant="h4" sx={{ mt: 2, fontWeight: 'bold', color: '#e91e63' }}>
                            ${selectedOrder.total.toFixed(2)}
                        </Typography>
                    </Grid>
                </Grid>

                <Divider sx={{ my: 3 }} />

                {/* Order Status Tracker */}
                <Box sx={{ my: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Order Status
                    </Typography>
                    <Stepper activeStep={activeStep} alternativeLabel sx={{ mt: 3 }}>
                        {orderSteps.map((step) => (
                            <Step key={step.label} completed={step.completed}>
                                <StepLabel>{step.label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Order Items */}
                <Box sx={{ my: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Order Items
                    </Typography>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Product</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                    <TableCell align="center">Quantity</TableCell>
                                    <TableCell align="right">Subtotal</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {selectedOrder.items.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                                {item.thumbnail && (
                                                    <img
                                                        src={item.thumbnail}
                                                        alt={item.title || item.name}
                                                        style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 4 }}
                                                    />
                                                )}
                                                <Typography>{item.title || item.name}</Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                                        <TableCell align="center">{item.quantity}</TableCell>
                                        <TableCell align="right">${(item.price * item.quantity).toFixed(2)}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Shipping and Payment Info */}
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>
                            Shipping Address
                        </Typography>
                        <Paper variant="outlined" sx={{ p: 2 }}>
                            <Typography variant="body1" gutterBottom>
                                <strong>  {selectedOrder.shippingInfo.name}</strong>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {selectedOrder.shippingInfo.address}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {selectedOrder.shippingInfo.city}, {selectedOrder.shippingInfo.state} {selectedOrder.shippingInfo.zip}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                {selectedOrder.shippingInfo.email}
                            </Typography>
                        </Paper>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom>
                            Order Summary
                        </Typography>
                        <Paper variant="outlined" sx={{ p: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography>Subtotal:</Typography>
                                <Typography>${selectedOrder.subtotal.toFixed(2)}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                                <Typography>Shipping:</Typography>
                                <Typography>{selectedOrder.shipping === 0 ? 'Free' : `$${selectedOrder.shipping.toFixed(2)}`}</Typography>
                            </Box>
                            <Divider sx={{ my: 1 }} />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Typography variant="h6">Total:</Typography>
                                <Typography variant="h6" sx={{ color: '#e91e63' }}>${selectedOrder.total.toFixed(2)}</Typography>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>

            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                <Button
                    component={Link}
                    to="/products"
                    variant="contained"
                    size="large"
                >
                    Continue Shopping
                </Button>
                <Button
                    onClick={() => window.print()}
                    variant="outlined"
                    size="large"
                >
                    Print Order
                </Button>
            </Box>
        </Container>
    );
}

export default OrderDetail;
