import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/orderService';
import {
    Container,
    Typography,
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    Alert,
    CircularProgress,
    Divider,
    Grid,
} from '@mui/material';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { toast } from 'react-toastify';

const Checkout = () => {
    const navigate = useNavigate();
    const { cart, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [shippingAddress, setShippingAddress] = useState({
        address: '',
        city: '',
        postalCode: '',
        country: '',
    });

    const handleChange = (e) => {
        setShippingAddress({ ...shippingAddress, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await createOrder(shippingAddress);
            toast.success('Order placed successfully!');
            navigate('/orders');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to place order');
        } finally {
            setLoading(false);
        }
    };

    if (!cart || cart.items.length === 0) {
        return (
            <Container sx={{ mt: 4 }}>
                <Alert severity="warning">Your cart is empty. Add items before checkout.</Alert>
                <Button onClick={() => navigate('/')} sx={{ mt: 2 }}>
                    Continue Shopping
                </Button>
            </Container>
        );
    }

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                py: 6,
            }}
        >
            <Container maxWidth="md">
                <Typography
                    variant="h3"
                    component="h1"
                    gutterBottom
                    sx={{
                        fontWeight: 800,
                        background: 'linear-gradient(135deg, #fff 0%, #e2e8f0 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        mb: 4,
                    }}
                >
                    Checkout
                </Typography>

                <Grid container spacing={3}>
                    <Grid item xs={12} md={7}>
                        <Card
                            sx={{
                                background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                            }}
                        >
                            <CardContent>
                                <Typography variant="h5" gutterBottom fontWeight={700}>
                                    Shipping Address
                                </Typography>

                                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                                    <TextField
                                        fullWidth
                                        label="Address"
                                        name="address"
                                        value={shippingAddress.address}
                                        onChange={handleChange}
                                        margin="normal"
                                        required
                                    />

                                    <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="City"
                                                name="city"
                                                value={shippingAddress.city}
                                                onChange={handleChange}
                                                margin="normal"
                                                required
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                fullWidth
                                                label="Postal Code"
                                                name="postalCode"
                                                value={shippingAddress.postalCode}
                                                onChange={handleChange}
                                                margin="normal"
                                                required
                                            />
                                        </Grid>
                                    </Grid>

                                    <TextField
                                        fullWidth
                                        label="Country"
                                        name="country"
                                        value={shippingAddress.country}
                                        onChange={handleChange}
                                        margin="normal"
                                        required
                                    />

                                    <Button
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        size="large"
                                        disabled={loading}
                                        startIcon={loading ? <CircularProgress size={20} /> : <ShoppingBagIcon />}
                                        sx={{
                                            mt: 3,
                                            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                            '&:hover': {
                                                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                                            },
                                        }}
                                    >
                                        {loading ? 'Placing Order...' : 'Place Order'}
                                    </Button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={5}>
                        <Card
                            sx={{
                                background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                            }}
                        >
                            <CardContent>
                                <Typography variant="h5" gutterBottom fontWeight={700}>
                                    Order Summary
                                </Typography>

                                <Box sx={{ mt: 3 }}>
                                    {cart.items.map((item) => (
                                        <Box key={item.product._id} sx={{ mb: 2 }}>
                                            <Box display="flex" justifyContent="space-between">
                                                <Typography variant="body2">
                                                    {item.product.name} x {item.quantity}
                                                </Typography>
                                                <Typography variant="body2" fontWeight={600}>
                                                    Rs. {(item.price * item.quantity).toFixed(2)}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    ))}

                                    <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Typography variant="h6" fontWeight={700}>
                                            Total:
                                        </Typography>
                                        <Typography
                                            variant="h5"
                                            sx={{
                                                fontWeight: 800,
                                                background: 'linear-gradient(135deg, #6366f1 0%, #ec4899 100%)',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                                backgroundClip: 'text',
                                            }}
                                        >
                                            Rs. {cart.totalPrice.toFixed(2)}
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Checkout;
